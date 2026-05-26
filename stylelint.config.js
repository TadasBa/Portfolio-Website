export default {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "at-rule-empty-line-before": null,
    "import-notation": "string",
    "media-feature-range-notation": null,
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "scss/dollar-variable-empty-line-before": null,
  },
};
