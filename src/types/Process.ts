// Common process definition
export default interface Process {
    pid: number;
    name: string;
    cmd?: string;
    ppid: number;
    uid?: number;
    cpu?: number;
    memory?: number;
    cwd: string;
}
