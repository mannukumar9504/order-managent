const {
    getAllAttributeFieldMapping,
    updateAttributeFieldMapping,
} = require('./attribute_field_mapping.controller');

const { authenticateUserWithToken } = require(__basedir + '/utilities/middleware/index');

module.exports = (router) => {
    router.get('/attributes-field-mappings', authenticateUserWithToken, (_req, _res, _next) => getAllAttributeFieldMapping(_req).then(_res.success).catch(_next));
    router.put('/attributes-field-mappings', authenticateUserWithToken, (_req, _res, _next) => updateAttributeFieldMapping(_req).then(_res.success).catch(_next));
};
