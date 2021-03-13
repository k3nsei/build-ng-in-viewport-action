#!/usr/bin/env node

import { existsSync, lstatSync } from 'fs';
import { resolve } from 'path';

import { create as artifactCreate } from '@actions/artifact';
import { getInput, info, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import { create as globCreate } from '@actions/glob';
import { cp } from '@actions/io';

import { Abort } from './abort';
import { job } from './job';

async function run(): Promise<void> {
  const abortController = new Abort();

  try {
    const version: string = getInput('version');
    const builderVersion: string = `v${version}`;

    const cwd: string = process.cwd();
    const sourceDir: string = resolve(cwd, getInput('sourceDir'));
    const builderDir: string = resolve(__dirname, `../builders/ng-${builderVersion}`);
    const builderProjectsDir: string = resolve(builderDir, 'projects');
    const artifactsDir: string = resolve(builderDir, 'dist/ng-in-viewport');

    if (!existsSync(sourceDir) || !lstatSync(sourceDir).isDirectory()) {
      abortController.abort();
      setFailed('Invalid `sourceDir` path');
    }

    await job<void>(
      'Clone library',
      { signal: abortController.signal, signalAbort: () => abortController.abort() },
      async () => {
        await cp(sourceDir, builderProjectsDir, {
          recursive: true,
          force: true,
        });

        info('The library has been successfully cloned');
      }
    );

    await job<number>(
      'Install dependencies',
      { signal: abortController.signal, signalAbort: () => abortController.abort() },
      async () => {
        return await exec('bash', ['-c', 'npm ci'], {
          cwd: builderDir,
          failOnStdErr: true,
        });
      }
    );

    const buildExitCode = await job<number>(
      'Build library',
      { signal: abortController.signal, signalAbort: () => abortController.abort() },
      async () => {
        return await exec('npm run build:lib', [], {
          cwd: builderDir,
          failOnStdErr: false,
          ignoreReturnCode: false,
        });
      }
    );

    if (buildExitCode !== 0) {
      abortController.abort();
      setFailed('Build failed');
    }

    await job<void>(
      'Upload build artifacts',
      { signal: abortController.signal, signalAbort: () => abortController.abort() },
      async () => {
        const patterns: string[] = [`${artifactsDir}/**`];
        const globber = await globCreate(patterns.join('\n'));
        const files: string[] = await globber.glob();

        return void (await artifactCreate().uploadArtifact(`ng-in-viewport-${builderVersion}`, files, artifactsDir, {
          continueOnError: false,
        }));
      }
    );
  } catch (error) {
    setFailed(error.message);
  } finally {
    abortController.abort();
  }
}

run();
