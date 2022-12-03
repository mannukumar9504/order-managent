const { userLogin, resetPassword } = require('./login.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/login', (_req, _res, _next) => userLogin(_req).then(_res.success).catch(_next));
    router.post('/reset-password', authenticateUserWithToken, (_req, _res, _next) => resetPassword(_req).then(_res.success).catch(_next));
};
