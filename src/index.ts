import Process from "./types/Process";
import { fetchAppName, getNodeProcesses, processDirectory } from "./lib";

export const NODE_PROCESSES_NAME = ["node", "nodemon", "ts-node", "next-server", "concurrently"];

export {
    fetchAppName,
    processDirectory,
    getNodeProcesses,
}

export type {
    Process,
}
