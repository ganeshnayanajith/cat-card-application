'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES } = require('../../../lib/constant');
const CatValidator = require('../validators/cat.validator');
const CatService = require('../services/cat.service');
const CONSTANT = require('../../../lib/constant.js');
const logger = require('../../../lib/logger');

exports.merge = async (req, res, next) => {
    try {

        const payload = req.body;

        logger.log(CONSTANT.LOGGER.INFO, `START - Function : merge, Request : ${JSON.stringify(payload)}`);

        const {
            textForImageOne,
            textForImageTwo,
            width,
            height,
            color,
            size
        } = await CatValidator.mergeValidation(payload);

        const result = await CatService.merge(textForImageOne, textForImageTwo, width, height, color, size);

        logger.log(CONSTANT.LOGGER.INFO, `END - Function : merge, Response : ${JSON.stringify(result)}`);

        Utils.successResponse(res, HTTP_CODES.OK, 'Merged and saved successfully', result);

    } catch (err) {
        Utils.errorResponse(res, err);
    }
};