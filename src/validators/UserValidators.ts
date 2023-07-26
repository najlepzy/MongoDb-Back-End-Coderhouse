import Joi from 'joi';

/**
 * Parses data to retrieve user info.
 */
export const UserRetrieveValidator = Joi.object().custom((value, helper) => {;
    return {
        id: value.id,
        username: value.username,
        email: value.email,
    };
});

/**
 * Validates Request data for User Signup.
 */
export const UserSignUpValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9#$%_.-]{3,30}$')).required(),
})
export const UserLoginValidator = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9#$%_.-]{3,30}$')).required(),
})
