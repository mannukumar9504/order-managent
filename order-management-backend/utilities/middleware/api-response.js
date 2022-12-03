/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');

const { BaseError, RequestParamsInvalidError } = require('../../services/errors');
const logger = require('../../services/logger');

const validationError = new RequestParamsInvalidError();
const baseError = new BaseError();

module.exports = (_req, _res, _next) => {
    logger.info(`Incoming request on URL :  ${_req.url}`);

    _res.apiSuccess = async (data) => {
        logger.info(`${_req.ipAddress} Retuning Response for URL : ${_req.url}`);
        logger.info('====   Api Success Response Raw: ', data);
        _res.status(200).send(data);
    };

    _res.customResponse = async (data) => {
        _res.status(data.statusCode).send({
            ...data.response,
        });
    };

    _res.success = async (data) => {
        // Response modification for pagination
        if (data && data.rows && data.total) {
            const { total } = data;
            const { perPage } = data;
            const { currentPage } = data;
            const { lastPage } = data;
            const { firstPage } = data;
            const { firstPageUrl } = data;
            const { lastPageUrl } = data;
            const { nextPageUrl } = data;
            const { prevPageUrl } = data;
            const { from } = data;
            const { to } = data;
            const { path } = data;
            data = data.rows.map((_record) => _record);
            data = {
                total,
                perPage,
                currentPage,
                path,
                firstPage,
                firstPageUrl,
                lastPage,
                lastPageUrl,
                nextPageUrl,
                prevPageUrl,
                from,
                to,
                data,
            };
        }
        logger.info(`${_req.ipAddress} Retuning Response for URL : ${_req.url}`);
        logger.info('====  Success Response: ');
        // console.log('====   Api Success Response: ', data);
        return _res
            .status(200)
            .send(data);
    };

    _res.error = (_error) => {
        // eslint-disable-next-line max-len
        const defaultError = _error instanceof Sequelize.ValidationError ? validationError : baseError;

        const errors = (_error.errors || []).map((error) => ({
            message: error.message,
            sapIdentifier: error.sapIdentifier,
            KDAUF: error.KDAUF,
            locationName: error.locationName,
            type: error.type,
            path: error.path,
            value: error.value,
        }));
        const message = _error.message || defaultError.message;

        const error = {
            errors,
            message,
            // code: _error.code || defaultError.code,
            // return_code: _error.returnCode || defaultError.returnCode,
        };

        logger.info(`${_req.ipAddress} Retuning Response for URL  ${_req.url}`);
        logger.info('==== Api Error Response: ', error);

        return _res
            .status(_error.statusCode || 400)
            .json(error)
            .end();
    };

    _next();
};
