import { group, info, setFailed } from '@actions/core';

import { AbortSignal } from './abort';
import { Runnable } from './types';

export interface JobOptions {
  signal: AbortSignal;
  signalAbort: Runnable;
  failOnError?: boolean;
  failMessage?: string;
  skippable?: boolean;
}

export const job = async <T>(name: string, options: JobOptions, task: () => Promise<T>): Promise<T | undefined> => {
  const { signal, signalAbort, failOnError = true, failMessage, skippable = true } = options;

  return await group<T>(
    name,
    async (): Promise<T> => {
      if (skippable && signal) {
        return void info('SKIPPED!');
      }

      const result: Promise<T> = task();

      result.catch((err) => {
        signalAbort();

        failOnError && setFailed(failMessage || err);
      });

      return await result;
    }
  );
};
