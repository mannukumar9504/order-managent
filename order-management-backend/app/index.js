const user = require('./user/user.route');
const role = require('./role/role.route');
const location = require('./location/location.route');
const login = require('./login/login.route');
const organisationRoute = require('./organisation/organisation.route');
const resourceRoute = require('./resource/resource.route');
const resourceTypeRoute = require('./resource-type/resource-type.route');
const resourceCategoryRouter = require('./resource-category/resource-category.route');
const resourceManufacturerRouter = require('./resource-manufacturer/resource-manufacturer.route');
const processrouter = require('./process/process.route');
const groupRouter = require('./group/group.route');
const attributeRoute = require('./attribute/attribute.route');
const attributeTypeRoute = require('./attribute-type/attribute-type.route');
const attributeGroupRoute = require('./attribute-group/attributeGroup.route');
const processStepRoute = require('./process-step/process-step.route');
const attributeFieldMappingRoute = require('./attribute-field-mapping/attribute-field-mapping.route');
const orderRoute = require('./order/order.route');

const initiateRoutes = (router) => {
    // all modules with routes will be added here
    user(router);
    role(router);
    location(router);
    login(router);
    organisationRoute(router);
    resourceRoute(router);
    resourceTypeRoute(router);
    resourceCategoryRouter(router);
    resourceManufacturerRouter(router);
    processrouter(router);
    groupRouter(router);
    attributeRoute(router);
    attributeTypeRoute(router);
    attributeGroupRoute(router);
    processStepRoute(router);
    attributeFieldMappingRoute(router);
    orderRoute(router);
};

module.exports = initiateRoutes;
