"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    server;
    constructor() {
        this.server = (0, express_1.default)();
    }
    config() {
        this.server.use(express_1.default.json({ limit: '1mb' }));
        this.server.use(express_1.default.urlencoded({ extended: true }));
        console.log('running into config');
    }
    createServer() {
        try {
            this.config();
            this.server.listen(3000, () => {
                console.log('Listening on port 3000... ');
            });
        }
        catch (err) {
            console.log(`There has been some error: ${err}`);
        }
    }
}
exports.Server = Server;
