const {
    saveOrganisation,
    getAllOrganisation,
    getOrganisationById,
    updateOrganisation,
    deleteOrganisation,
} = require('./organisation.controller');

const { authenticateUserWithToken } = require(`${__basedir}/utilities/middleware/index`);

module.exports = (router) => {
    router.post('/organisations', authenticateUserWithToken, (_req, _res, _next) => saveOrganisation(_req).then(_res.success).catch(_next));
    router.get('/organisations', authenticateUserWithToken, (_req, _res, _next) => getAllOrganisation(_req).then(_res.success).catch(_next));
    router.get('/organisations/:id', authenticateUserWithToken, (_req, _res, _next) => getOrganisationById(_req).then(_res.success).catch(_next));
    router.put('/organisations/:id', authenticateUserWithToken, (_req, _res, _next) => updateOrganisation(_req).then(_res.success).catch(_next));
    router.delete('/organisations/:id', authenticateUserWithToken, (_req, _res, _next) => deleteOrganisation(_req).then(_res.success).catch(_next));
};
