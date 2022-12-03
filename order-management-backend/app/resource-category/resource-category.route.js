const {
    saveResourceCategory,
    getAllResourceCategory,
    getResourceCategoryById,
    updateResourceCategory,
    deleteResourceCategory,
} = require('./resource-category.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/resource-categories', authenticateUserWithToken, (_req, _res, _next) => saveResourceCategory(_req).then(_res.success).catch(_next));
    router.get('/resource-categories', authenticateUserWithToken, (_req, _res, _next) => getAllResourceCategory(_req).then(_res.success).catch(_next));
    router.get('/resource-categories/:id', authenticateUserWithToken, (_req, _res, _next) => getResourceCategoryById(_req).then(_res.success).catch(_next));
    router.put('/resource-categories/:id', authenticateUserWithToken, (_req, _res, _next) => updateResourceCategory(_req).then(_res.success).catch(_next));
    router.delete('/resource-categories/:id', authenticateUserWithToken, (_req, _res, _next) => deleteResourceCategory(_req).then(_res.success).catch(_next));
};
