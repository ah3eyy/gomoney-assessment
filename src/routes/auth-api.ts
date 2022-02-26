import express from "express";
import AuthenticationController from '../controllers/authentication-controller'
import rateLimit from 'express-rate-limit'


const router = express.Router();

const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})


router.post('/create-user-account',AuthenticationController.createUserAccount);
router.post('/create-admin-account', AuthenticationController.createAdminAccount);
router.post('/login-user-account', apiLimiter ,AuthenticationController.loginUserAccount);
router.post('/login-admin-account', AuthenticationController.loginAdminAccount);


export {router as authRouter};