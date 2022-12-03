const {
    saveGroup,
    getAllGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
} = require('./group.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.post('/groups', authenticateUserWithToken, (_req, _res, _next) => saveGroup(_req).then(_res.success).catch(_next));
    router.get('/groups', authenticateUserWithToken, (_req, _res, _next) => getAllGroup(_req).then(_res.success).catch(_next));
    router.get('/groups/:id', authenticateUserWithToken, (_req, _res, _next) => getGroupById(_req).then(_res.success).catch(_next));
    router.put('/groups/:id', authenticateUserWithToken, (_req, _res, _next) => updateGroup(_req).then(_res.success).catch(_next));
    router.delete('/groups/:id', authenticateUserWithToken, (_req, _res, _next) => deleteGroup(_req).then(_res.success).catch(_next));
};
