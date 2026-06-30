// Test A
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));

// Test B
import { readFile } from "fs";

readFile(__filename, () => {
    setTimeout(() => console.log("timeout"), 0);
    setImmediate(() => console.log("immediate"));
});