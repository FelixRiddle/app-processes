import Process from "./types/Process";
import { nodeProcessesForcedAwait } from "./forcedAwait";
import { randomAccessNodeProcesses, nodeProcesses } from "./nodeProcesses";

export {
    randomAccessNodeProcesses,
    nodeProcesses,
    
    // This is the best way to get processes and cwds
    nodeProcessesForcedAwait,
}

export type {
    Process,
}
