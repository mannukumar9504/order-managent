const {
    saveTypeResource,
    getAllTypeResource,
    getTypeResourceById,
    updateTypeResource,
    deleteTypeResource,
} = require('./resource-type.controller');

const { authenticateUserWithToken } = require(`${__basedir}/utilities/middleware/index`);

module.exports = (router) => {
    router.post('/resource-types', authenticateUserWithToken, (_req, _res, _next) => saveTypeResource(_req).then(_res.success).catch(_next));
    router.get('/resource-types', authenticateUserWithToken, (_req, _res, _next) => getAllTypeResource(_req).then(_res.success).catch(_next));
    router.get('/resource-types/:id', authenticateUserWithToken, (_req, _res, _next) => getTypeResourceById(_req).then(_res.success).catch(_next));
    router.put('/resource-types/:id', authenticateUserWithToken, (_req, _res, _next) => updateTypeResource(_req).then(_res.success).catch(_next));
    router.delete('/resource-types/:id', authenticateUserWithToken, (_req, _res, _next) => deleteTypeResource(_req).then(_res.success).catch(_next));
};
