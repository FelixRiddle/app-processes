import { ProcessDescriptor } from "ps-list";
import { NODE_PROCESSES_NAME } from ".";

/**
 * Filter node processes
 */
export function filterNodeProcesses(processes: Array<ProcessDescriptor>) {
    return processes.filter((process) => NODE_PROCESSES_NAME.includes(process.name));
}
