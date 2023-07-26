import { Request, Response, NextFunction } from "express";
import {CustomError} from '../exceptions/Base'
/**
* Standardizes Successful responses format.
* 
* Rewrites response.send function to standarize format
* adding code `OK` and message `Success`.
*/
export function customResponseFormatter(req: Request, res: Response, next: Function) {
    var send = res.send;
    (res as any).send = function (string:any) {
        var body = string instanceof Buffer ? string.toString() : string;
        if(typeof body == 'object')
            body = {code:"OK",message:"Success",...body}
        send.call(this, body);
    }
    next();
}
/**
* Standardizes Successful responses format.
* 
* Rewrites response.send function to standarize format
* adding code `OK` and message `Success`.
*/
export function customErrorResponseFormatter(error: CustomError, req: Request, res: Response) {
    switch(error.err_code){
        case "ERR_INVALID_FIELDS":
            return res.status(error.status_code).json({
                code: error.err_code,
                message: error.message,
                details: error.details
            })
        case "ERR_INVALID_CREDENTIALS":
            return res.status(error.status_code).json({
                code: error.err_code,
                message: error.message,
            })
        default:
            return res.status(500).json(error)
    }
}