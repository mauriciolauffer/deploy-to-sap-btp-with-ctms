import config from "eslint-config-mlauffer-nodejs";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/", "src/generated", "**/coverage/", "**/test/"],
  },
  ...config,
  ...tseslint.configs.strict,
  {
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
    },
  },
);
