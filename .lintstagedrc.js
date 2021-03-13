module.exports = {
  '*.{js,jsx,ts,tsx,cjs,mjs,json,html,css,scss,sass,less,md,mdx,markdown,yml,yaml}': () => {
    return 'npx --no-install prettier --write .';
  },
  '.husky/*': 'npx --no-install prettier --write',
};
