import Process from "./types/Process";
import { nodeProcessesForcedAwait } from "./forcedAwait";
import { randomAccessNodeProcesses, nodeProcesses } from "./nodeProcesses";

export const NODE_PROCESSES_NAME = ["node", "nodemon", "ts-node", "next-server", "concurrently"];

export {
    randomAccessNodeProcesses,
    nodeProcesses,
    
    // This is the best way to get processes and cwds
    nodeProcessesForcedAwait,
}

export type {
    Process,
}
