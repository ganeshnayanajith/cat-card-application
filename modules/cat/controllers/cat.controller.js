'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES } = require('../../../lib/constant');
const CatValidator = require('../validators/cat.validator');
const CatService = require('../services/cat.service');

exports.merge = async (req, res, next) => {
    try {
        const {
            textForImageOne,
            textForImageTwo,
            width,
            height,
            color,
            size
        } = await CatValidator.mergeValidation(req.body);
        const result = await CatService.merge(textForImageOne, textForImageTwo, width, height, color, size);
        Utils.successResponse(res, HTTP_CODES.OK, 'Merged and saved successfully', result);
    } catch (err) {
        Utils.errorResponse(res, err);
    }
};