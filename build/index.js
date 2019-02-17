"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
async function main() {
    const app = await http_1.default();
    app.listen(8080);
    // tslint:disable-next-line
    console.log('App started');
}
main().catch(err => {
    // tslint:disable-next-line
    console.error('failed to start', err);
    throw err;
});
//# sourceMappingURL=index.js.map