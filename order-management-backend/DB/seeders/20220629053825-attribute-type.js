const path = require('path');

const seed = require(path.join(__dirname, '../utils/seed'));

module.exports = {
    up(queryInterface, Sequelize) {
        const file = path.join(__dirname, 'csv', path.basename(__filename).replace('.js', '.csv'));
        const map = function (_data) {
            return {
                id: _data[0],
                name: _data[1],
                createdBy: _data[2],
                updatedBy: _data[3],
            };
        };
        return seed.seedFromCsv(queryInterface, Sequelize, 'attribute_type', file, map);
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('attribute_type', null, {});
    },
};
