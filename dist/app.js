"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./utils/server");
(0, server_1.createServer)()
    .then((server) => {
    server.listen(3000, () => {
        console.log('Listening on port 3000... ');
    });
})
    .catch((err) => {
    console.log(`Err: ${err}`);
});
