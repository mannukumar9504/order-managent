const {
    saveRole, getAllRole, getRoleById, updateRole, deleteRole,
} = require('./role.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/roles', authenticateUserWithToken, (_req, _res, _next) => saveRole(_req).then(_res.success).catch(_next));
    router.get('/roles', authenticateUserWithToken, (_req, _res, _next) => getAllRole(_req).then(_res.success).catch(_next));
    router.get('/roles/:id', authenticateUserWithToken, (_req, _res, _next) => getRoleById(_req).then(_res.success).catch(_next));
    router.put('/roles/:id', authenticateUserWithToken, (_req, _res, _next) => updateRole(_req).then(_res.success).catch(_next));
    router.delete('/roles/:id', authenticateUserWithToken, (_req, _res, _next) => deleteRole(_req).then(_res.success).catch(_next));
};
