module.exports = {
    extends: [
        "eslint:recommended",
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        "indent": [
            "error",
            4,
        ],
        "vue/html-indent": 'off',
        "vue/max-attributes-per-line": 'off',
        "vue/html-self-closing": 'off',
        "no-unused-vars": 'off',
    }
} 