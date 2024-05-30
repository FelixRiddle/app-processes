import { nodeProcessesForcedAwait } from "../forcedAwait";
import { shellProcesses } from "../nodeProcesses";

(async () => {
    console.log(`Shell processes`);
    
    // Shell processses
    await shellProcesses();
    
    console.log(`\nNode processses`);
    
    await nodeProcessesForcedAwait((procs) => {
        console.log(`Node processes: `, procs);
    })
})();
