import { fetchAppName, getNodeProcesses } from "./index";
import fs from "fs";

describe("Process Utility Functions", () => {
	it("should return this app name", () => {
		const appName = fetchAppName(process.cwd());

		// Parse package.json
		const packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));
        expect(appName).toBe(packageJson.name);
	});

	it("should return at least this process", async () => {
		const processes = await getNodeProcesses();
        expect(processes.length).toBeGreaterThanOrEqual(1);
	});
});
