"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_service_1 = __importDefault(require("../services/authentication-service"));
const response_handler_1 = __importDefault(require("../helpers/response-handler"));
const joi_1 = __importDefault(require("joi"));
class AuthenticationController {
    createUserAccount(req, res) {
        const schema = joi_1.default.object({
            full_name: joi_1.default.string().required().messages({ "any.required": "Full name is required" }),
            password: joi_1.default.string().required().messages({ "any.required": "Password is required" }),
            email: joi_1.default.string().required().messages({ "any.required": "Email is required" })
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return authentication_service_1.default.createUserAccount(req, res);
    }
    createAdminAccount(req, res) {
        const schema = joi_1.default.object({
            full_name: joi_1.default.string().required().messages({ "any.required": "Full name is required" }),
            password: joi_1.default.string().required().messages({ "any.required": "Password is required" }),
            email: joi_1.default.string().required().messages({ "any.required": "Email is required" })
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return authentication_service_1.default.createAdminAccount(req, res);
    }
    loginUserAccount(req, res) {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required().messages({ "any.required": "Password is required" }),
            email: joi_1.default.string().required().messages({ "any.required": "Email is required" })
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return authentication_service_1.default.loginUserAccount(req, res);
    }
    loginAdminAccount(req, res) {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required().messages({ "any.required": "Password is required" }),
            email: joi_1.default.string().required().messages({ "any.required": "Email is required" })
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return authentication_service_1.default.loginAdminAccount(req, res);
    }
}
exports.default = new AuthenticationController();
//# sourceMappingURL=authentication-controller.js.map