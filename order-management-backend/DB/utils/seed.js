const csv = require('fast-csv');

module.exports = {
    seedFromCsv(_q, _S, _table, _file, _map) {
        let chunk = [];
        return new Promise((fulfill, reject) => csv
            .parseFile(_file)
            .on('data', (data) => {
                chunk.push(_map(data));
                if (chunk.length >= 1000) {
                    chunk = bulkInsert(_q, _S, _table, chunk);
                }
            })
            .on('error', (_err) => {
                reject(_err);
            })
            .on('end', (_res) => {
                chunk = bulkInsert(_q, _S, _table, chunk);
                fulfill(_res);
            }));

        async function bulkInsert(_q, _S, _table, _chunk) {
            const { getAllModelsDetails } = require('./getAllmodels');

            const db = await getAllModelsDetails(_q, _S);
            if (_chunk && _chunk.length > 0) {
                const f = function (_e) {
                    console.log(_e);
                };
                db[_table].bulkCreate(_chunk).catch(f);
                _chunk.length = 0;
            }
            return _chunk;
        }
    },
};
