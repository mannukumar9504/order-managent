const {
    saveProcess,
    getAllProcess,
    getProcessById,
    updateProcess,
    deleteProcess,
    attributesByProcessId,
    ProcessStepByProcessId,
} = require('./process.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    //resource---type
    router.post('/processes', authenticateUserWithToken, (_req, _res, _next) => saveProcess(_req).then(_res.success).catch(_next));
    router.get('/processes', authenticateUserWithToken, (_req, _res, _next) => getAllProcess(_req).then(_res.success).catch(_next));
    router.get('/processes/:id', authenticateUserWithToken, (_req, _res, _next) => getProcessById(_req).then(_res.success).catch(_next));
    router.put('/processes/:id', authenticateUserWithToken, (_req, _res, _next) => updateProcess(_req).then(_res.success).catch(_next));
    router.delete('/processes/:id', authenticateUserWithToken, (_req, _res, _next) => deleteProcess(_req).then(_res.success).catch(_next));
    router.get('/processes/:id/attributes-groups', authenticateUserWithToken, (_req, _res, _next) => attributesByProcessId(_req).then(_res.success).catch(_next));
    router.get('/processes/:processId/process-steps', authenticateUserWithToken, (_req, _res, _next) => ProcessStepByProcessId(_req).then(_res.success).catch(_next));
};
