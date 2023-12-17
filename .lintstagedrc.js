module.exports = {
  '**/*.(ts|tsx|js|jsx)': filenames => [`npm run lint`, `npm run prettier --write .`],
}
