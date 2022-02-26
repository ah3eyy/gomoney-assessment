"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../helpers/response-handler"));
const user_1 = __importDefault(require("../database/models/user"));
const staff_1 = __importDefault(require("../database/models/staff"));
const utils_1 = __importDefault(require("../helpers/utils"));
const jwt_init_1 = __importDefault(require("../config/jwt-init"));
class AuthenticationService {
    createUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { full_name, email, password } = req.body;
                // check if email already in use
                let emailCheck = yield user_1.default.findOne({ email: email });
                if (emailCheck)
                    return response_handler_1.default.errorResponse('Email already in use', null, res, 422);
                let user = new user_1.default();
                user.email = email;
                user.full_name = full_name;
                user.password = password;
                yield user.save();
                // create session and login token for user
                let token = jwt_init_1.default.signToken(user);
                let userData = yield user_1.default.findOne({ _id: user._id });
                let data = {
                    token,
                    user: userData
                };
                return response_handler_1.default.successResponse('Account created successfully', data, res);
            }
            catch (e) {
                return response_handler_1.default.errorResponse('An error occurred creating account at the moment', null, res, 500);
            }
        });
    }
    createAdminAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { full_name, email, password } = req.body;
                // check if email already in use
                let emailCheck = yield user_1.default.findOne({ email: email });
                if (emailCheck)
                    return response_handler_1.default.errorResponse('Email already in use', null, res, 422);
                let user = new staff_1.default();
                user.email = email;
                user.full_name = full_name;
                user.password = password;
                yield user.save();
                // create session and login token for user
                let token = jwt_init_1.default.signToken(user);
                let userData = yield staff_1.default.findOne({ _id: user._id });
                let data = {
                    token,
                    staff: userData
                };
                // const session = req.session;
                // session.token = token;
                // session.email = email;
                // session.save();
                return response_handler_1.default.successResponse('Account created successfully', data, res);
            }
            catch (e) {
                return response_handler_1.default.errorResponse('An error occurred creating account at the moment', null, res, 500);
            }
        });
    }
    loginUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                // check if email already in use
                let userAccount = yield user_1.default.findOne({ email: email }).select('password');
                if (!userAccount)
                    return response_handler_1.default.errorResponse('Invalid account credentials provided', null, res, 422);
                // verify password
                let passwordVerify = utils_1.default.comparePassword(password, userAccount.password);
                if (!passwordVerify)
                    return response_handler_1.default.errorResponse('Invalid account credentials provided', null, res, 422);
                // create session and login token for user
                let token = jwt_init_1.default.signToken(userAccount);
                let userData = yield user_1.default.findOne({ _id: userAccount._id });
                let data = {
                    token,
                    staff: userData
                };
                return response_handler_1.default.successResponse('Account granted successfully', data, res);
            }
            catch (e) {
                return response_handler_1.default.errorResponse('An error occurred accessing account at the moment', null, res, 500);
            }
        });
    }
    loginAdminAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                // check if email already in use
                let userAccount = yield staff_1.default.findOne({ email: email }).select('password');
                if (!userAccount)
                    return response_handler_1.default.errorResponse('Invalid account credentials provided', null, res, 422);
                // verify password
                let passwordVerify = utils_1.default.comparePassword(password, userAccount.password);
                if (!passwordVerify)
                    return response_handler_1.default.errorResponse('Invalid account credentials provided', null, res, 422);
                console.log(userAccount);
                // create session and login token for user
                let token = jwt_init_1.default.signToken(userAccount);
                let userData = yield staff_1.default.findOne({ _id: userAccount._id });
                let data = {
                    token,
                    staff: userData
                };
                // const session = req.session;
                // session.token = token;
                // session.email = email;
                // session.save();
                return response_handler_1.default.successResponse('Account granted successfully', data, res);
            }
            catch (e) {
                return response_handler_1.default.errorResponse('An error occurred accessing account at the moment', null, res, 500);
            }
        });
    }
}
exports.default = new AuthenticationService();
//# sourceMappingURL=authentication-service.js.map