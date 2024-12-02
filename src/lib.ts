import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import si from "systeminformation";

import Process from "./types/Process";
import { NODE_PROCESSES_NAME } from ".";

/**
 * Get process working directory
 *
 * @param pid Process ID
 * @returns The directory path of the process
 */
export async function processDirectory(pid: number): Promise<string> {
	try {
		switch (os.type()) {
			case "Linux":
				// Synchronously read the process working directory
				return fs.readlinkSync(`/proc/${pid}/cwd`);
			case "Darwin":
				// Synchronously execute lsof to get the process directory on macOS
				const cwd = execSync(
					`lsof -a -d cwd -p ${pid} | tail -1 | awk '{print $9}'`
				)
					.toString()
					.trim();
				return cwd;
			default:
				throw new Error("Unsupported OS");
		}
	} catch (error: any) {
		throw new Error(
			`Error retrieving directory for process ${pid}: ${error.message}`
		);
	}
}

/**
 * Get app name from the directory's package.json file
 */
export function fetchAppName(directory: string): string {
	const packageFile = `${directory}/package.json`;

	let packageJson: any = fs.readFileSync(packageFile);
	let packageJsonData = JSON.parse(packageJson);

	const appName: string = packageJsonData.name;

	return appName;
}

/**
 * Get only Node.js processes
 */
export async function getNodeProcesses() {
	let foundProcesses: si.Systeminformation.ProcessesProcessData[] = [];
	try {
		const processes = await si.processes();
        
		// Filter out processes where the command includes 'node' or the name is 'node'
		foundProcesses = processes.list.filter(
			(process) =>
				(process.name && NODE_PROCESSES_NAME.includes(process.name)) ||
				(process.command &&
					NODE_PROCESSES_NAME.includes(process.command))
		);
	} catch (error) {
		console.error("Error fetching Node.js processes:", error);
	}

	// Get process directory and app name for each process
	// And convert them to Process type
	const nodeProcesses = await Promise.all(
		foundProcesses.map(async (proc) => {
			const pid = proc.pid;
			const directory = await processDirectory(pid);

			// App name
			const appName = fetchAppName(directory);

			const appProcess: Process = {
				pid,
				name: appName,
				cmd: proc.command,
				ppid: proc.parentPid,
				uid: undefined,
				cpu: proc.cpu,
				memory: proc.memVsz,
				cwd: directory,
			};

			return appProcess;
		})
	);

	return nodeProcesses;
}
