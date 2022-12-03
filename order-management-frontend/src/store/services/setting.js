/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

const getUser = () => request.get('users');
const addUser = (payload) => request.post('users', payload);
const updateUser = (payload, userId) => request.put(`users/${userId}`, payload);
const deleteUser = (userId) => request.delete(`users/${userId}`);


const getRole = () => request.get('roles');
const addRole = (payload) => request.post('roles', payload);
const updateRole = (payload, roleId) => request.put(`roles/${roleId}`, payload);
const deleteRole = (roleId) => request.delete(`roles/${roleId}`);


const getLocation = () => request.get('locations');
const addLocation = (payload) => request.post('locations', payload);
const updateLocation = (payload, locationId) => request.put(`locations/${locationId}`, payload);
const deleteLocation = (locationId) => request.delete(`locations/${locationId}`);


const getOrganisation = () => request.get('organisations');
const addOrganisation = (payload) => request.post('organisations', payload);
const updateOrganisation = (payload, organisationId) => request.put(`organisations/${organisationId}`, payload);
const deleteOrganisation = (organisationId) => request.delete(`organisations/${organisationId}`);


const getResourceType = () => request.get('resource-types');
const addResourceType = (payload) => request.post('resource-types', payload);
const updateResourceType = (payload, resourceTypeId) => request.put(`resource-types/${resourceTypeId}`, payload);
const deleteResourceType = (resourceTypeId) => request.delete(`resource-types/${resourceTypeId}`);


const getGroup = () => request.get('groups');
const addGroup = (payload) => request.post('groups', payload);
const updateGroup = (payload, groupId) => request.put(`groups/${groupId}`, payload);
const deleteGroup = (groupId) => request.delete(`groups/${groupId}`);


const getResourceCategory = () => request.get('resource-categories');
const addResourceCategory = (payload) => request.post('resource-categories', payload);
const updateResourceCategory = (payload, categoryResourceId) => request.put(`resource-categories/${categoryResourceId}`, payload);
const deleteResourceCategory = (categoryResourceId) => request.delete(`resource-categories/${categoryResourceId}`);


const getResourceManufacture = () => request.get('resource-manufacturers');
const addResourceManufacture = (payload) => request.post('resource-manufacturers', payload);
const updateResourceManufacture = (payload, resourceManufactureId) => request.put(`resource-manufacturers/${resourceManufactureId}`, payload);
const deleteResourceManufacture = (resourceManufactureId) => request.delete(`resource-manufacturers/${resourceManufactureId}`);


const getResource = () => request.get('resources');
const addResource = (payload) => request.post('resources', payload);
const updateResource = (payload, resourceId) => request.put(`resources/${resourceId}`, payload);
const deleteResource = (resourceId) => request.delete(`resources/${resourceId}`);


const getProcess = () => request.get('processes');
const addProcess = (payload) => request.post('processes', payload);
const updateProcess = (payload, processId) => request.put(`processes/${processId}`, payload);
const deleteProcess = (processId) => request.delete(`processes/${processId}`);
const getProcessStepsByProcessId = (processId) => request.get(`processes/${processId}/process-steps`);
const getProcessAttributesByProcessId = (processId) => request.get(`processes/${processId}/attributes-groups`);


const getProcessSteps = () => request.get('process-steps');
const addProcessStep = (payload) => request.post('process-steps', payload);
const updateProcessStep = (payload, processStepId) => request.put(`process-steps/${processStepId}`, payload);
const deleteProcessStep = (processStepId) => request.delete(`process-steps/${processStepId}`);
const addResourceToProcessStep = (processStepId, payload) => request.put(`process-steps/${processStepId}/add-resources`, payload);

const getAttributeGroups = () => request.get('attribute-groups');
const addAttributeGroup = (payload) => request.post('attribute-groups', payload);
const updateAttributeGroup = (payload, groupAttributeId) => request.put(`attribute-groups/${groupAttributeId}`, payload);
const deleteAttributeGroups = (groupAttributeId) => request.delete(`attribute-groups/${groupAttributeId}`);

const getAttributeTypes = () => request.get('attribute-types');


const getAttributes = () => request.get('attributes');
const addAttributes = (payload) => request.post('attributes', payload);
const updateAttributes = (payload, attributeId) => request.put(`attributes/${attributeId}`, payload);
const deleteAttributes = (attributeId) => request.delete(`attributes/${attributeId}`);


export default {
    getUser,
    getRole,
    getLocation,
    addRole,
    updateRole,
    addLocation,
    updateLocation,
    addOrganisation,
    getOrganisation,
    updateOrganisation,
    getResourceType,
    addResourceType,
    updateResourceType,
    getGroup,
    getResourceCategory,
    addResourceCategory,
    updateResourceCategory,
    addGroup,
    updateGroup,
    getResourceManufacture,
    addResourceManufacture,
    updateResourceManufacture,
    getResource,
    addResource,
    updateResource,
    addUser,
    updateUser,
    getProcess,
    addProcess,
    updateProcess,
    getProcessStepsByProcessId,
    getProcessAttributesByProcessId,
    deleteUser,
    deleteRole,
    deleteLocation,
    deleteOrganisation,
    deleteGroup,
    getProcessSteps,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    addResourceToProcessStep,
    deleteResource,
    deleteResourceType,
    deleteResourceCategory,
    deleteResourceManufacture,
    deleteProcess,
    getAttributeGroups,
    addAttributeGroup,
    updateAttributeGroup,
    deleteAttributeGroups,
    getAttributeTypes,
    getAttributes,
    addAttributes,
    updateAttributes,
    deleteAttributes
};