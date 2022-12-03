const {
    saveAttributeType,
    getAllAttributeType,
    getAttributeTypeById,
    updateAttributeType,
    deleteAttributeType,
} = require('./attribute-type.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/attribute-types', authenticateUserWithToken, (_req, _res, _next) => saveAttributeType(_req).then(_res.success).catch(_next));
    router.get('/attribute-types', authenticateUserWithToken, (_req, _res, _next) => getAllAttributeType(_req).then(_res.success).catch(_next));
    router.get('/attribute-types/:id', authenticateUserWithToken, (_req, _res, _next) => getAttributeTypeById(_req).then(_res.success).catch(_next));
    router.put('/attribute-types/:id', authenticateUserWithToken, (_req, _res, _next) => updateAttributeType(_req).then(_res.success).catch(_next));
    router.delete('/attribute-types/:id', authenticateUserWithToken, (_req, _res, _next) => deleteAttributeType(_req).then(_res.success).catch(_next));
};
