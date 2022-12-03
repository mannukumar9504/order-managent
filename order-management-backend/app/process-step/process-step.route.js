const {
    saveProcessStep,
    getAllProcessStep,
    getProcessStepById,
    updateProcessStep,
    deleteProcessStep,
    addResources,
} = require('./process-step.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/process-steps', authenticateUserWithToken, (_req, _res, _next) => saveProcessStep(_req).then(_res.success).catch(_next));
    router.get('/process-steps', authenticateUserWithToken, (_req, _res, _next) => getAllProcessStep(_req).then(_res.success).catch(_next));
    router.get('/process-steps/:id', authenticateUserWithToken, (_req, _res, _next) => getProcessStepById(_req).then(_res.success).catch(_next));
    router.put('/process-steps/:id', authenticateUserWithToken, (_req, _res, _next) => updateProcessStep(_req).then(_res.success).catch(_next));
    router.delete('/process-steps/:id', authenticateUserWithToken, (_req, _res, _next) => deleteProcessStep(_req).then(_res.success).catch(_next));
    router.put('/process-steps/:id/add-resources', authenticateUserWithToken, (_req, _res, _next) => addResources(_req).then(_res.success).catch(_next));
};
