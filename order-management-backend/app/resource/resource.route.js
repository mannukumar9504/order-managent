const {
    saveResource, getAllResource, getResourceById, updateResource, deleteResource,
    createMultipleResources, deleteResourceBySAPId, updateResourceBySAPId, getResourceBySAPId,
} = require('./resource.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/resources', authenticateUserWithToken, (_req, _res, _next) => saveResource(_req).then(_res.success).catch(_next));
    router.get('/resources', authenticateUserWithToken, (_req, _res, _next) => getAllResource(_req).then(_res.success).catch(_next));
    router.get('/resources/:id', authenticateUserWithToken, (_req, _res, _next) => getResourceById(_req).then(_res.success).catch(_next));
    router.put('/resources/:id', authenticateUserWithToken, (_req, _res, _next) => updateResource(_req).then(_res.success).catch(_next));
    router.delete('/resources/:id', authenticateUserWithToken, (_req, _res, _next) => deleteResource(_req).then(_res.success).catch(_next));

    // External service routes
    router.post('/sap/resources', authenticateUserWithToken, (_req, _res,_next) => createMultipleResources(_req).then(_res.success).catch(_next));
    router.put('/sap/resources/:sapIdentifier', authenticateUserWithToken, (_req, _res,_next) => updateResourceBySAPId(_req).then(_res.success).catch(_next));
    router.get('/sap/resources/:sapIdentifier', authenticateUserWithToken, (_req, _res,_next) => getResourceBySAPId(_req).then(_res.success).catch(_next));
    router.delete('/sap/resources/:sapIdentifier', authenticateUserWithToken, (_req, _res,_next) => deleteResourceBySAPId(_req).then(_res.success).catch(_next));
};
