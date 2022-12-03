const {
    saveResourceManufacturer,
    updateResourceManufacturer,
    getAllResourceManufacturer, getResourceManufacturerById, deleteResourceManufacturer,
} = require('./resource-manufacturer.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/resource-manufacturers', authenticateUserWithToken, (_req, _res, _next) => saveResourceManufacturer(_req).then(_res.success).catch(_next));
    router.get('/resource-manufacturers', authenticateUserWithToken, (_req, _res, _next) => getAllResourceManufacturer(_req).then(_res.success).catch(_next));
    router.get('/resource-manufacturers/:id', authenticateUserWithToken, (_req, _res, _next) => getResourceManufacturerById(_req).then(_res.success).catch(_next));
    router.put('/resource-manufacturers/:id', authenticateUserWithToken, (_req, _res, _next) => updateResourceManufacturer(_req).then(_res.success).catch(_next));
    router.delete('/resource-manufacturers/:id', authenticateUserWithToken, (_req, _res, _next) => deleteResourceManufacturer(_req).then(_res.success).catch(_next));
};
