'use strict';
const SECRET_CONFIGS = require('../../secret-config');
const CONSTANT = require('../constant.js');
const logger = require('../logger');

class CatAsAService {
    static createFetchImageWithTextRequest (text, width, height, color, size) {

        let url = `${SECRET_CONFIGS.CAT_AS_A_SERVICE_BASE_URL}/cat/says/${encodeURIComponent(text)}?`;

        if (width) {
            url += 'width=' + encodeURIComponent(width) + '&';
        }
        if (height) {
            url += 'height=' + encodeURIComponent(height) + '&';
        }
        if (color) {
            url += 'color=' + encodeURIComponent(color) + '&';
        }
        if (size) {
            url += 's=' + encodeURIComponent(size);
        }

        logger.log(CONSTANT.LOGGER.INFO, `URL : ${url}`);

        return url;
    }
}

module.exports = CatAsAService;