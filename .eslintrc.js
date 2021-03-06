module.exports = {
    extends: 'eslint-config-egg',
    parser: 'babel-eslint',
    rules: {
        'linebreak-style': [0, 'error', 'windows'],
        indent: ['error', 2],
        'comma-dangle': ['error', 'only-multiline'],
        'array-bracket-spacing': [2, 'never'],
    },
};
