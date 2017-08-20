module.exports = function (wallaby) {

  return {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '__data__/**',
      '__mocks__/**',
      'tsconfig.json',
      '!src/**/*.spec.ts'
    ],
    tests: [
      'src/**/*.spec.ts'
    ],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        typescript: require('typescript'),
        module: 'commonjs',
        jsx: 'React'
      })
    },
    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: '--harmony',
      },
    },
    testFramework: 'jest',
  };
};