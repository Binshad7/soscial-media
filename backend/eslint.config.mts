// Import ESLint’s built-in JavaScript rules (like no-unused-vars, no-undef, etc.)
import js from "@eslint/js";

// Provides standard global variables (like process, module, console, etc.)
import globals from "globals";

// Adds TypeScript support — parser + rule sets for ESLint
import tseslint from "typescript-eslint";

// Helper function from ESLint to define flat config arrays
import { defineConfig } from "eslint/config";

// Plugin to enforce architectural boundaries between layers (Clean Architecture)
import boundaries from "eslint-plugin-boundaries";

// Plugin to manage and validate import order and correctness
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  // --- Include ESLint’s recommended core JavaScript rules ---
  js.configs.recommended,

  // --- Include recommended TypeScript-specific linting rules ---
  ...tseslint.configs.recommended,

  {
    // Apply these rules to all JS and TS files in the project
    files: ["**/*.{js,ts,mjs,cjs}"],

    // Register custom plugins used below
    plugins: {
      boundaries,       // for architecture/layer import rules
      import: importPlugin, // for import sorting and checks
    },

    // Configure language environment and parser
    languageOptions: {
      parser: tseslint.parser, // use TS parser to understand TS syntax
      globals: globals.node,   // allow Node.js global objects
    },

    // Define actual linting rules to enforce
    rules: {
      // --- General TypeScript / JS rules ---
      "@typescript-eslint/no-unused-vars": ["warn"], // warn on unused vars
      "@typescript-eslint/explicit-function-return-type": "on", // don't force return types
      "no-console": "warn", // warn when using console.log in code

      // --- Clean Architecture Layer Rules ---
      "boundaries/element-types": ["error", {
        default: "disallow", // disallow all cross-layer imports by default
        rules: [
          { from: "presentation", allow: ["application"] }, // controllers/routes can call app layer
          { from: "application", allow: ["domain"] }, // services can call domain layer
          { from: "infrastructure", allow: ["domain", "application"] }, // db/adapters can call domain/app
        ],
      }],

      // --- Import organization and clarity ---
      "import/order": ["warn", { "newlines-between": "always" }], // add empty lines between import groups
    },

    // Tell the “boundaries” plugin how your folder structure maps to layers
    settings: {
      boundaries: {
        types: [
          { type: "domain", pattern: "src/domain/**" }, // core business logic
          { type: "application", pattern: "src/application/**" }, // use cases/services
          { type: "infrastructure", pattern: "src/infrastructure/**" }, // external systems (db, APIs)
          { type: "presentation", pattern: "src/presentation/**" }, // controllers/routes/views
        ],
      },
    },
  },
]);
