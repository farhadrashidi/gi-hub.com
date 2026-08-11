import { cp } from "node:fs/promises";

await cp("src", "out", { recursive: true, force: true });
