# Process Utility Functions

This module contains a set of functions for working with system processes. Specifically, it allows you to retrieve details about Node.js processes, get process working directories, and fetch application names from `package.json` files.

## Functions

## 1. processDirectory(pid: number): Promise<string>

Retrieves the working directory of a process given its PID.

### Parameters:

-   pid (number): The process ID of the process.

### Returns:

-   Promise<string>: The directory path of the process.

### Example Usage:

```typescript
import { processDirectory } from "./index";

async function example() {
	const pid = 1234; // Example PID
	try {
		const directory = await processDirectory(pid);
		console.log("Process directory:", directory);
	} catch (error) {
		console.error("Error fetching process directory:", error);
	}
}
```

### Supported OS:

-   Linux
-   macOS

Note: This function throws an error if the OS is unsupported.

---

## 2. fetchAppName(directory: string): string

Fetches the application name from the `package.json` file located in the specified directory.

### Parameters:

-   directory (string): The directory path where the `package.json` is located.

### Returns:

-   string: The application name.

### Example Usage:

```typescript
import { fetchAppName } from "./index";

const appDirectory = "/path/to/app"; // Example directory containing package.json
const appName = fetchAppName(appDirectory);
console.log("Application name:", appName);
```

---

## 3. getNodeProcesses(): Promise<Process[]>

Fetches all Node.js processes running on the system and retrieves their details (e.g., PID, command, CPU, memory, working directory, and application name).

### Returns:

-   Promise<Process[]>: A list of processes with details about each Node.js process.

### Example Usage:

```typescript
import { getNodeProcesses } from "./index";

async function example() {
	try {
		const nodeProcesses = await getNodeProcesses();
		console.log("Node.js Processes:", nodeProcesses);
	} catch (error) {
		console.error("Error fetching Node.js processes:", error);
	}
}
```

### Example Output

```bash
[
	{
		"pid": 1234,
		"name": "my-app",
		"cmd": "node /path/to/app/index.js",
		"ppid": 5678,
		"uid": undefined,
		"cpu": 0.5,
		"memory": 1024,
		"cwd": "/path/to/app"
	},
	{
		"pid": 5678,
		"name": "another-app",
		"cmd": "node /path/to/another/app/index.js",
		"ppid": 1234,
		"uid": undefined,
		"cpu": 1.2,
		"memory": 2048,
		"cwd": "/path/to/another/app"
	}
]
```

---

### Error Handling

Each function includes basic error handling:

-   processDirectory: Throws an error if the OS is unsupported or if the directory cannot be accessed.
-   getNodeProcesses: Logs an error if the Node.js processes cannot be fetched.
-   fetchAppName: Relies on the `package.json` file being present in the directory.

Make sure to handle any errors accordingly to ensure smooth execution.

---

### Dependencies

-   systeminformation: Used to fetch system process information.
-   fs: Used to read the file system.
-   os: Used to detect the operating system.
-   child_process: Used to execute system commands (e.g., `lsof` for macOS).
