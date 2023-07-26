import {ValidationError} from 'joi'

export class CustomError extends Error{
    status_code: number = 400;
    err_code: string = "";
    details = {}
}

/**
 * Error called when client sends invalid fields for endpoint.
 */
export class InvalidCredentialsError extends CustomError{
    status_code=400
    err_code="ERR_INVALID_CREDENTIALS"
    message = "Incorrect Email or Password."
    constructor(){
        super()
        this.details = {}
    }
}

/**
 * Error called when client sends invalid fields for endpoint.
 */
export class InvalidFieldsError extends CustomError{
    status_code=400
    err_code="ERR_INVALID_FIELDS"
    message = "Invalid or Required Fields."
    constructor(error: ValidationError){
        super()
        this.details = {
            field: (error.details[0].context as any).key,
            value: (error.details[0].context as any).value
        }
    }
}