import { getNodeProcesses } from "@/lib";

/**
 * Cmd main
 */
export default async function cmdMain() {
	// Node processses
	console.log(`\nNode processses`);
	const nodeProcesses = await getNodeProcesses();
	console.log(nodeProcesses);
}
