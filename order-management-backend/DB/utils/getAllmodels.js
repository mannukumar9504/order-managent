const fs = require('fs');
const path = require('path');
const SequelizeIns = require('sequelize');
const logger = require('../../services/logger');

const rootPath = path.normalize(`${__dirname}/..`);
async function getAllModelsDetails(queryInterface, Sequelize) {
    try {
        if (!Sequelize) {
            Sequelize = SequelizeIns;
        }
        // loop through all files in models directory
        const db = {};
        const modelPath = path.join(rootPath, '/models');
        fs.readdirSync(modelPath)
            .forEach((file) => {
                if (file !== 'index.js') {
                    const model = require(`${path.join(modelPath, file)}`)(queryInterface?.sequelize, Sequelize?.DataTypes);
                    db[model.name] = model;
                }
            });

        Object.keys(db).forEach((modelName) => {
            if (db[modelName].hasOwnProperty('associate')) {
                db[modelName].options.associate(db);
            }
        });
        return Promise.resolve(db);
    } catch (error) {
        logger.error(error);
        return Promise.resolve({});
    }
}

module.exports = {
    getAllModelsDetails,
};
