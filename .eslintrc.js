module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "object-curly-newline": 0,
    "no-loop-func": 0,
    "no-param-reassign": 0,
    "padded-blocks": 0,
    "import/prefer-default-export": 0
  },
  "env": {
    "node": true
  },
  "globals": {
    "CONFIG": true,
    "describe": true,
    "done": true,
    "beforeEach": true,
    "it": true
  }
};