'use strict';
const mergeImg = require('merge-img');
const { writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const request = require('request');

const CatAsAService = require('../../../lib/services/cat-as-a-service');
const CONSTANT = require('../../../lib/constant.js');
const logger = require('../../../lib/logger');

const writeFileAsync = promisify(writeFile);
const requestAsync = promisify(request.get);

class CatService {
    static async merge (textForImageOne, textForImageTwo, width, height, color, size) {
        try {

            const firstReq = {
                url: CatAsAService.createFetchImageWithTextRequest(textForImageOne, width, height, color, size),
                encoding: 'binary'
            };

            const secondReq = {
                url: CatAsAService.createFetchImageWithTextRequest(textForImageTwo, width, height, color, size),
                encoding: 'binary'
            };

            logger.log(CONSTANT.LOGGER.INFO, `First request : ${JSON.stringify(firstReq)}`);
            logger.log(CONSTANT.LOGGER.INFO, `Second request : ${JSON.stringify(secondReq)}`);

            const [firstRes, secondRes] = await Promise.all([
                requestAsync(firstReq),
                requestAsync(secondReq)
            ]);

            const firstBody = firstRes.body;

            logger.log(CONSTANT.LOGGER.INFO, `Received first response with status : ${firstRes.statusCode}`);

            const secondBody = secondRes.body;

            logger.log(CONSTANT.LOGGER.INFO, `Received second response with status : ${secondRes.statusCode}`);

            const img = await mergeImg([
                { src: Buffer.from(firstBody, 'binary'), x: 0, y: 0 },
                { src: Buffer.from(secondBody, 'binary'), x: width, y: 0 }
            ]);

            const buffer = await promisify(img.getBuffer.bind(img))('image/jpeg');

            const fileName = `${Date.now()}-cat-card.jpg`;

            const fileOut = join(`${process.cwd()}/outputs/${fileName}`);

            await writeFileAsync(fileOut, buffer, 'binary');

            logger.log(CONSTANT.LOGGER.INFO, `The file was saved with file name : ${fileName}`);

            return Promise.resolve({ fileName });

        } catch (err) {
            logger.log(CONSTANT.LOGGER.ERROR, err);
            return Promise.reject(err);
        }
    }
}

module.exports = CatService;