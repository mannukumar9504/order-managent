const {
    saveAttributeGroup,
    getAllAttributeGroup,
    getAttributeGroupById,
    updateAttributeGroup,
    deleteAttributeGroup,
    getAttributeGroupAttributes,
} = require('./attributeGroup.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/attribute-groups', authenticateUserWithToken, (_req, _res, _next) => saveAttributeGroup(_req).then(_res.success).catch(_next));
    router.get('/attribute-groups', authenticateUserWithToken, (_req, _res, _next) => getAllAttributeGroup(_req).then(_res.success).catch(_next));
    router.get('/attribute-groups/:id', authenticateUserWithToken, (_req, _res, _next) => getAttributeGroupById(_req).then(_res.success).catch(_next));
    router.put('/attribute-groups/:id', authenticateUserWithToken, (_req, _res, _next) => updateAttributeGroup(_req).then(_res.success).catch(_next));
    router.delete('/attribute-groups/:id', authenticateUserWithToken, (_req, _res, _next) => deleteAttributeGroup(_req).then(_res.success).catch(_next));
    router.get('/attribute-groups/:id/attributes', authenticateUserWithToken, (_req, _res, _next) => getAttributeGroupAttributes(_req).then(_res.success).catch(_next));
};
