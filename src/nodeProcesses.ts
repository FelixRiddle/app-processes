import psList, { ProcessDescriptor } from "ps-list";
import { fetchAppName, processDirectory } from "./forcedAwait";
import Process from "./types/Process";

/**
 * Get node processes
 * 
 * Warning: Doesn't gives process cwd
 */
export async function nodeProcesses(callback: (processes: Array<ProcessDescriptor>) => void) {
    const pl = await psList();
    const nodeProcessesName = ["node", "nodemon", "ts-node"]
    
    const nodeProcs = pl.filter((process) => nodeProcessesName.includes(process.name));
    
    callback(nodeProcs);
}

/**
 * Get node processes with cwd
 * 
 * The problem with this one is that it gets processes randomly one by one.
 */
export async function randomAccessNodeProcesses(callback: (process: Process | ProcessDescriptor) => void) {
    const pl = await psList();
    const nodeProcessesName = ["node", "nodemon", "ts-node"]
    
    const nodeProcs = pl.filter((process) => nodeProcessesName.includes(process.name));
    
    nodeProcs.map((proc) => {
        processDirectory(proc.pid, (err: any, directory: string) => {
            if(err) {
                console.log(err);
                
                return callback(proc);
            } else {
                // Also fetch app name, this will be very useful for terminating apps in general-frontend
                const appName = fetchAppName(directory);
                
                const appProcess: Process = {
                    pid: proc.pid,
                    name: appName,
                    cmd: proc.cmd,
                    ppid: proc.ppid,
                    uid: proc.uid,
                    cpu: proc.cpu,
                    memory: proc.memory,
                    cwd: directory,
                };
                
                return callback(appProcess);
            }
        });
    });
}

/**
 * Shell processses
 */
export async function shellProcesses() {
    const pl = await psList();
    const nodeProcs = pl.filter((process) => process.name === "sh");
    console.log(`Shell processes: `, nodeProcs);
}
