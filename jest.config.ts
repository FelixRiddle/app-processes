export default {
	preset: "ts-jest",
	// collectCoverage: true,
	coverageReporters: ["json", "text", "lcov", "clover"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest", // Use ts-jest for TypeScript
			{ useESM: true }, // Ensure ESM support in ts-jest
		],
	},
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/$1",
		// This tells Jest to map any imports starting with @/ to the src directory.
		"^@/(.*)$": "<rootDir>/src/$1",
		// Map ESM modules to their CommonJS versions if needed
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ESM
	transformIgnorePatterns: [
		"node_modules/(?!felixriddle\\.app-processes)", // Allow transpiling ESM in node_modules
	],
	testMatch: [
		"**/__tests__/**/*.+(ts|js|(x)",
		"**/?(*.)+(spec|test).+(ts|js|(x)",
	],
	testEnvironment: "node",
};
