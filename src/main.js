import App from "./app.js";
import process from "node:process";

let app = new App("");
await app.start();
process.on("SIGINT", () => app.exit());
