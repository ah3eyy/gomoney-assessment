import {Response} from "express";
import RedisStore from "../config/redis-store";

class ResponseHandler {

    successResponse(message: string, data: any, res: Response, cacheStatus = false) {

        if(cacheStatus){
            new RedisStore(null)
        }

        return res.status(200).send({
            message,
            data
        });
    }

    errorResponse(message: string, data: any, res: Response, errorCode = 400) {
        return res.status(errorCode).json({
            message,
            data
        });
    }

}

export default new ResponseHandler();