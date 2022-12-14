const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const orderPostSchema = joi.array().items(
    joi.object().keys({
        KDAUF: joi.string().min(1).max(10).required(),
        KDPOS: joi.string().min(1).max(6).required(),
        WERKS: joi.string().min(1).max(4).required(),
        VORNR: joi.string().min(1).max(4).required(),
        VORNR_TXT: joi.string().min(1).max(40).required(),
        NAME1: joi.string().required(),
        HALL: joi.string().required(),
        MATNR_P: joi.string().required(),
        ARKTX_P: joi.string().required(),
        MATKL_P: joi.string().required(),
        THICKNESS_P: joi.number().required(),
        WIDTH_P: joi.number().required(),
        LENGTH_P: joi.number().required(),
        GUETE_P: joi.string().required(),
        ATTES_P: joi.string().required(),
        SDATE: joi.date().required(),
        FDATE: joi.date().required(),
        GAMNG: joi.number().required(),
        GMEIN: joi.string().required(),
        GMNGA: joi.number().required(),
        MachId: joi.number().required(),
        STATUS_KB: joi.string().required(),
        CHARG: joi.string().required(),
        MATNR_S: joi.string(),
        PICK_TXT: joi.string(),
        LGORT: joi.string(),
        LGPBE: joi.string(),
        MATKL_S: joi.string(),
        THICKNESS_S: joi.number(),
        WIDTH_S: joi.number(),
        processId: joi.string(),
        LENGTH_S: joi.number(),
        GUETE_S: joi.string(),
        ATTES_S: joi.string(),
        RSNUM: joi.string(),
        RSPOS: joi.string(),
    }),
);
const orderPutSchema = joi.object().keys({
    KDAUF: joi.string().min(1).max(10),
    KDPOS: joi.string().min(1).max(6),
    WERKS: joi.string().min(1).max(4),
    VORNR: joi.string().min(1).max(4),
    VORNR_TXT: joi.string().min(1).max(40),
    NAME1: joi.string().min(1).max(30),
    HALL: joi.string().min(1).max(2),
    MATNR_P: joi.string().min(1).max(18),
    ARKTX_P: joi.string().min(1).max(40),
    MATKL_P: joi.string().min(1).max(9),
    THICKNESS_P: joi.number(),
    WIDTH_P: joi.number(),
    LENGTH_P: joi.number(),
    GUETE_P: joi.string().min(1).max(6),
    ATTES_P: joi.string().min(1).max(4),
    SDATE: joi.date(),
    FDATE: joi.date(),
    GAMNG: joi.number(),
    GMEIN: joi.string().min(1).max(2),
    CHARG: joi.string().min(1).max(10),
    MATNR_S: joi.string().min(1).max(18),
    PICK_TXT: joi.string().min(1).max(18),
    LGORT: joi.string().min(1).max(4),
    LGPBE: joi.string().min(1).max(6),
    MATKL_S: joi.string().min(1).max(9),
    THICKNESS_S: joi.number(),
    WIDTH_S: joi.number(),
    LENGTH_S: joi.number(),
    GUETE_S: joi.string().min(1).max(6),
    ATTES_S: joi.string().min(1).max(4),
    RSNUM: joi.string().min(1).max(10),
    RSPOS: joi.string().min(1).max(6),
});

const orderGetSchema = joi.object().keys({
    KDAUF: joi.string().min(1).max(10).required(),
    KDPOS: joi.string().min(1).max(6).required(),
    WERKS: joi.string().min(1).max(4).required(),
    VORNR: joi.string().min(1).max(4).required(),
    CHARG: joi.string().min(1).max(10).required(),
});

module.exports = {
    orderPostSchema,
    orderPutSchema,
    orderGetSchema,
};
