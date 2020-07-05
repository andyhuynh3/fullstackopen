  
module.exports = {
	parser: 'babel-eslint',
	extends: ['prettier', 'prettier/react'],
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parserOptions: { ecmaVersion: 2018 },
	plugins: ['prettier'],
	rules: {
		'no-alert': 0,
		'jsx-a11y/label-has-for': [0],
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				useTabs: true,
				printWidth: 80,
				tabWidth: 2,
				arrowParens: 'always',
				formatOnSave: true,
				trailingComma: 'none',
				jsxSingleQuote: true
			}
		]
	}
};