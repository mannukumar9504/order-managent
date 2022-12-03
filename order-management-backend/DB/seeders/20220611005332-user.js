const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const seed = require(path.join(__dirname, '../utils/seed'));

module.exports = {
    up(queryInterface, Sequelize) {
        const file = path.join(__dirname, 'csv', path.basename(__filename).replace('.js', '.csv'));
        const map = function (_data) {
            return {
                id: _data[0],
                firstName: _data[1],
                lastName: _data[2],
                password: _data[3],
                userSalt: _data[4],
                email: _data[5],
                isDeleted: _data[6],
                roleId: _data[7],
                contactNumber: _data[8],
                createdBy: _data[9],
                updatedBy: _data[10],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        };
        return seed.seedFromCsv(queryInterface, Sequelize, 'user', file, map);
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user', null, {});
    },
};
