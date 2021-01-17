module.exports = {
  extends: 'airbnb',
  rules: {
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-alert': [0],
    'no-console': [0],
    'max-len': [2, {
      code: 120,
    }],
    'new-cap': [2, {
      capIsNewExceptions: [
        'Sequelize.ENUM',
      ],
    }],
    'no-param-reassign': [2, {
      props: false,
    }],
    'comma-dangle': [2, 'only-multiline'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', '.'],
        ],
      },
    },
  },
};
