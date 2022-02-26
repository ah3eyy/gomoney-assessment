import ResponseHandler from '../helpers/response-handler'
import UserSchema from "../database/models/user";
import StaffSchema from "../database/models/staff";
import Utils from '../helpers/utils';
import JWTInit from "../config/jwt-init";


class AuthenticationService {
    async createUserAccount(req, res) {
        try {

            let {full_name, email, password} = req.body;

            // check if email already in use
            let emailCheck = await UserSchema.findOne({email: email});

            if (emailCheck)
                return ResponseHandler.errorResponse('Email already in use', null, res, 422);

            let user = new UserSchema();
            user.email = email;
            user.full_name = full_name;
            user.password = password;
            await user.save();

            // create session and login token for user
            let token = JWTInit.signToken(user);

            let userData = await UserSchema.findOne({_id: user._id});

            let data = {
                token,
                user: userData
            };

            return ResponseHandler.successResponse('Account created successfully', data, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred creating account at the moment', null, res, 500);
        }
    }

    async createAdminAccount(req, res) {
        try {

            let {full_name, email, password} = req.body;

            // check if email already in use
            let emailCheck = await UserSchema.findOne({email: email});

            if (emailCheck)
                return ResponseHandler.errorResponse('Email already in use', null, res, 422);

            let user = new StaffSchema();
            user.email = email;
            user.full_name = full_name;
            user.password = password;
            await user.save();

            // create session and login token for user
            let token = JWTInit.signToken(user);

            let userData = await StaffSchema.findOne({_id: user._id});

            let data = {
                token,
                staff: userData
            };

            // const session = req.session;
            // session.token = token;
            // session.email = email;
            // session.save();

            return ResponseHandler.successResponse('Account created successfully', data, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred creating account at the moment', null, res, 500);
        }
    }

    async loginUserAccount(req, res) {
        try {

            let {email, password} = req.body;

            // check if email already in use
            let userAccount = await UserSchema.findOne({email: email}).select('password');

            if (!userAccount)
                return ResponseHandler.errorResponse('Invalid account credentials provided', null, res, 422);

            // verify password
            let passwordVerify = Utils.comparePassword(password, userAccount.password);

            if (!passwordVerify)
                return ResponseHandler.errorResponse('Invalid account credentials provided', null, res, 422);

            // create session and login token for user
            let token = JWTInit.signToken(userAccount);

            let userData = await UserSchema.findOne({_id: userAccount._id});

            let data = {
                token,
                staff: userData
            };

            return ResponseHandler.successResponse('Account granted successfully', data, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred accessing account at the moment', null, res, 500);
        }
    }

    async loginAdminAccount(req, res) {
        try {

            let {email, password} = req.body;

            // check if email already in use
            let userAccount = await StaffSchema.findOne({email: email}).select('password');
            
            if (!userAccount)
                return ResponseHandler.errorResponse('Invalid account credentials provided', null, res, 422);

            // verify password
            let passwordVerify = Utils.comparePassword(password, userAccount.password);

            if (!passwordVerify)
                return ResponseHandler.errorResponse('Invalid account credentials provided', null, res, 422);

            console.log(userAccount);
            // create session and login token for user
            let token = JWTInit.signToken(userAccount);

            let userData = await StaffSchema.findOne({_id: userAccount._id});

            let data = {
                token,
                staff: userData
            };

            // const session = req.session;
            // session.token = token;
            // session.email = email;
            // session.save();

            return ResponseHandler.successResponse('Account granted successfully', data, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred accessing account at the moment', null, res, 500);
        }
    }
}

export default new AuthenticationService();