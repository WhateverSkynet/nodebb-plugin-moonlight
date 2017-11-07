module.exports = function (wallaby) {
  return {
    files: [
      'lib/**/*.js',
      '!lib/**/*.spec.js'
    ],
    tests: [
      'lib/**/*.spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'tape'
  }
}
