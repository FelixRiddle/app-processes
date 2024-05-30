import psList, { ProcessDescriptor } from "ps-list";
import fs from "fs";
import os from "os";
import { exec } from "child_process";
import Process from "./types/Process";

/**
 * Get app name
 */
export function fetchAppName(directory: string) {
    const packageFile = `${directory}/package.json`;
    
    let packageJson: any = fs.readFileSync(packageFile);
    let packageJsonData = JSON.parse(packageJson);
    
    const appName: string = packageJsonData.name;
    
    return appName;
}

/**
 * Get process working directory
 * 
 * @param {*} pid 
 * @param {*} callback 
 */
export function processDirectory(pid: number, callback: any) {
    switch (os.type()) {
        case 'Linux':
            fs.readlink('/proc/' + pid + '/cwd', callback);
            break;
        case 'Darwin':
            exec('lsof -a -d cwd -p ' + pid + ' | tail -1 | awk \'{print $9}\'', callback);
            break;
        default:
            callback('unsupported OS');
            break;
    }
}

/**
 * Abstraction of forced await
 * 
 * @param {Array} processes Array of processes retrieved with ps-list packages(or if they have 'pid' property, then it'll work too) 
 * @param {function} callback The callback to send all processes when retrieved
 */
export function forcedAwaitCwdRetrieval(processes: Array<ProcessDescriptor>, callback: (appProcesses: Array<Process | ProcessDescriptor>) => void) {
    // We will wait until we retrieve all processes and then call the user given callback
    let updatedProcesses: Array<Process | ProcessDescriptor> = [];
    const awaitCallback = (proc: Process | ProcessDescriptor) => {
        updatedProcesses.push(proc);
        
        // Check if we've got em' all
        // Gotta catch em' all!
        if(updatedProcesses.length === processes.length) {
            // Alright send em' back!
            return callback(updatedProcesses);
        }
    }
    
    processes.map((proc: ProcessDescriptor) => {
        processDirectory(proc.pid, (err: any, directory: string) => {
            if(err) {
                console.log(err);
                
                return awaitCallback(proc);
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
                
                return awaitCallback(appProcess);
            }
        });
    });
}

/**
 * Get node processes with cwd forced await
 * 
 */
export async function nodeProcessesForcedAwait(callback: (appProcesses: Array<Process | ProcessDescriptor>) => void) {
    const pl = await psList();
    const nodeProcessesName = ["node", "nodemon", "ts-node"]
    
    const nodeProcs = pl.filter((process) => nodeProcessesName.includes(process.name));
    
    // Force the await of all processes retrieval
    forcedAwaitCwdRetrieval(nodeProcs, callback);
}

