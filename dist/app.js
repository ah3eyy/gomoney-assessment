"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./routes/api");
const database_init_1 = __importDefault(require("./database/database-init"));
const redis_store_1 = __importDefault(require("./config/redis-store"));
const app = (0, express_1.default)();
const server = http.createServer(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const port = 3000;
app.get('/', (req, res) => {
    res.send('Gomoney assessment ');
});
database_init_1.default.connect();
new redis_store_1.default(app).connectStore();
app.use('/api', api_1.appRouter);
server.listen(port, () => {
    return console.log(`server listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map