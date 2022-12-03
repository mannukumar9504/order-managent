const {
    saveAttribute,
    getAllAttribute,
    getAttributeById,
    updateAttribute,
    deleteAttribute,
    attributeReorder,
} = require('./attribute.controller');

const { authenticateUserWithToken } = require(`${__basedir}/utilities/middleware/index`);

module.exports = (router) => {
    router.post('/attributes', authenticateUserWithToken, (_req, _res, _next) => saveAttribute(_req).then(_res.success).catch(_next));
    router.get('/attributes', authenticateUserWithToken, (_req, _res, _next) => getAllAttribute(_req).then(_res.success).catch(_next));
    router.get('/attributes/:id', authenticateUserWithToken, (_req, _res, _next) => getAttributeById(_req).then(_res.success).catch(_next));
    router.put('/attributes/:id', authenticateUserWithToken, (_req, _res, _next) => updateAttribute(_req).then(_res.success).catch(_next));
    router.delete('/attributes/:id', authenticateUserWithToken, (_req, _res, _next) => deleteAttribute(_req).then(_res.success).catch(_next));
    router.post('/attributes/reorder', authenticateUserWithToken, (_req, _res, _next) => attributeReorder(_req).then(_res.success).catch(_next));
};
