import {Request, Response} from "express";
import AuthenticationService from '../services/authentication-service';
import ResponseHandler from '../helpers/response-handler';
import Joi from "joi";

class AuthenticationController {

    createUserAccount(req: Request, res: Response) {
        const schema = Joi.object({
            full_name: Joi.string().required().messages({"any.required": "Full name is required"}),
            password: Joi.string().required().messages({"any.required": "Password is required"}),
            email: Joi.string().required().messages({"any.required": "Email is required"})
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);

        return AuthenticationService.createUserAccount(req, res);
    }

    createAdminAccount(req: Request, res: Response) {
        const schema = Joi.object({
            full_name: Joi.string().required().messages({"any.required": "Full name is required"}),
            password: Joi.string().required().messages({"any.required": "Password is required"}),
            email: Joi.string().required().messages({"any.required": "Email is required"})
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);


        return AuthenticationService.createAdminAccount(req, res);
    }

    loginUserAccount(req: Request, res: Response) {
        const schema = Joi.object({
            password: Joi.string().required().messages({"any.required": "Password is required"}),
            email: Joi.string().required().messages({"any.required": "Email is required"})
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);

        return AuthenticationService.loginUserAccount(req, res);
    }

    loginAdminAccount(req: Request, res: Response) {
        const schema = Joi.object({
            password: Joi.string().required().messages({"any.required": "Password is required"}),
            email: Joi.string().required().messages({"any.required": "Email is required"})
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);

        return AuthenticationService.loginAdminAccount(req, res);
    }
}

export default new AuthenticationController();