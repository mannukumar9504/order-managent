const {
    saveOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderStatus,
} = require('./order.controller');

const { authenticateUserWithToken } = require(`${__basedir}/utilities/middleware/index`);

module.exports = (router) => {
    router.post('/orders', authenticateUserWithToken, (_req, _res, _next) => saveOrder(_req).then(_res.success).catch(_next));
    router.get('/orders', authenticateUserWithToken, (_req, _res, _next) => getAllOrder(_req).then(_res.success).catch(_next));
    router.get('/order-status', authenticateUserWithToken, (_req, _res, _next) => getOrderStatus(_req).then(_res.success).catch(_next));
    router.get('/order-detail', authenticateUserWithToken, (_req, _res, _next) => getOrderById(_req).then(_res.success).catch(_next));
    router.put('/orders/:id', authenticateUserWithToken, (_req, _res, _next) => updateOrder(_req).then(_res.success).catch(_next));
    router.delete('/order-delete', authenticateUserWithToken, (_req, _res, _next) => deleteOrder(_req).then(_res.success).catch(_next));
};
