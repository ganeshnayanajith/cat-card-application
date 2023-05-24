'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');

const mergeSchema = Joi.object().keys({
    textForImageOne: Joi.string().required(),
    textForImageTwo: Joi.string().required(),
    width: Joi.number(),
    height: Joi.number(),
    color: Joi.string(),
    size: Joi.number(),
});

class CatValidator {
    static mergeValidation (obj) {

        const { value, error } = mergeSchema.validate(obj);

        if (error) {
            return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
        }

        return Promise.resolve(value);
    }
}

module.exports = CatValidator;