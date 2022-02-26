"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_store_1 = __importDefault(require("../config/redis-store"));
class ResponseHandler {
    successResponse(message, data, res, cacheStatus = false) {
        if (cacheStatus) {
            new redis_store_1.default(null);
        }
        return res.status(200).send({
            message,
            data
        });
    }
    errorResponse(message, data, res, errorCode = 400) {
        return res.status(errorCode).json({
            message,
            data
        });
    }
}
exports.default = new ResponseHandler();
//# sourceMappingURL=response-handler.js.map