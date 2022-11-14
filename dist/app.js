"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("utils/server");
async function createServer() {
    const app = new server_1.Server();
    app.createServer();
}
createServer();
