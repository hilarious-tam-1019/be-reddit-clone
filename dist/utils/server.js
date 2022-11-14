"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
async function createServer() {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    return server;
}
exports.createServer = createServer;
