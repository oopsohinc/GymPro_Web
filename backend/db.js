const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost', // hoặc IP nếu khác
    database: 'GymProDB',
    options: {
        trustServerCertificate: true
    }
};

module.exports = {
    sql, config
};
