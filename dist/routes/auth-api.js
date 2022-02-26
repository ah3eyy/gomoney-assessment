"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = __importDefault(require("../controllers/authentication-controller"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
exports.authRouter = router;
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 3 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
router.post('/create-user-account', authentication_controller_1.default.createUserAccount);
router.post('/create-admin-account', authentication_controller_1.default.createAdminAccount);
router.post('/login-user-account', apiLimiter, authentication_controller_1.default.loginUserAccount);
router.post('/login-admin-account', authentication_controller_1.default.loginAdminAccount);
//# sourceMappingURL=auth-api.js.map