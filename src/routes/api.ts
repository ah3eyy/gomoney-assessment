import express from "express";
import {authRouter} from './auth-api'
import {AdminRouter} from "./admin-api";

import TokenAuthVerification from '../middleware/jwt-middleware';
import {UserRouter} from "./user-api";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', TokenAuthVerification.verifyUserAuthToken, AdminRouter);
router.use('/user', TokenAuthVerification.verifyUserAuthToken, UserRouter);

export {router as appRouter};