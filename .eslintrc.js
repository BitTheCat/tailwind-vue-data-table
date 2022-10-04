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
        "vue/html-indent": 0,
        "vue/max-attributes-per-line": 0,
        "vue/html-self-closing": 0,
    }
} 