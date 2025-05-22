// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import neostandard, { resolveIgnoresFromGitignore } from "neostandard";

export default tseslint.config(
	{
		ignores: ["eslint.config.mjs"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	...neostandard({
		ignores: resolveIgnoresFromGitignore(),
	}),
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			"@stylistic/max-len": [
				"warn",
				{
					code: 80,
					tabWidth: 2,
					ignoreUrls: true,
					ignoreComments: false,
				},
			],
			"@stylistic/space-before-function-paren": [
				"error",
				{
					anonymous: "always",
					asyncArrow: "always",
					named: "never",
				},
			],
			"@stylistic/jsx-quotes": ["error", "prefer-double"],
		},
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
		},
	},
);
