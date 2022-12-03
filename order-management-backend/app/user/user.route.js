const user = require('./user.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/users', authenticateUserWithToken, (_req, _res, _next) => user.saveUser(_req).then(_res.success).catch(_next));
    router.get('/users', authenticateUserWithToken, (_req, _res, _next) => user.getAllUsers(_req).then(_res.success).catch(_next));
    router.put('/users/:id', authenticateUserWithToken, (_req, _res, _next) => user.updateUser(_req).then(_res.success).catch(_next));
    router.get('/users/:id', authenticateUserWithToken, (_req, _res, _next) => user.getUserById(_req).then(_res.success).catch(_next));
    router.delete('/users/:id', authenticateUserWithToken, (_req, _res, _next) => user.deleteUser(_req).then(_res.success).catch(_next));
};
