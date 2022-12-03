const {
    saveLocation, getAllLocations, getLocationById, updateLocation, deleteLocation,
} = require('./location.controller');

const { authenticateUserWithToken } = require(`${__basedir}/utilities/middleware/index`);

module.exports = (router) => {
    router.post('/locations', authenticateUserWithToken, (_req, _res, _next) => saveLocation(_req).then(_res.success).catch(_next));
    router.get('/locations', authenticateUserWithToken, (_req, _res, _next) => getAllLocations(_req).then(_res.success).catch(_next));
    router.get('/locations/:id', authenticateUserWithToken, (_req, _res, _next) => getLocationById(_req).then(_res.success).catch(_next));
    router.put('/locations/:id', authenticateUserWithToken, (_req, _res, _next) => updateLocation(_req).then(_res.success).catch(_next));
    router.delete('/locations/:id', authenticateUserWithToken, (_req, _res, _next) => deleteLocation(_req).then(_res.success).catch(_next));
};
