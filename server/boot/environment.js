'use strict';

module.exports = function checkVarEnv() {
    if(!process.env.NODE_ENV) {
        throw 'need env var NODE_ENV';
    }
    console.log('NODE_ENV : ', process.env.NODE_ENV);
    if(!process.env.DB_URL) {
        throw 'need env var DB_URL';
    }
    console.log('DB_URL : ', process.env.DB_URL);
    if(!process.env.HOST_NAME) {
        throw 'need env var HOST_NAME';
    }
    console.log('HOST_NAME : ', process.env.HOST_NAME);
    if(!process.env.PROTOCOL) {
        throw 'need env var PROTOCOL';
    }
    console.log('PROTOCOL : ', process.env.PROTOCOL);
    if(!process.env.EMAIL_API_KEY) {
        throw 'need env var EMAIL_API_KEY';
    }
    console.log('DB_URL : ', process.env.DB_URL);
    if(!process.env.PORT) {
        throw 'need env var PORT';
    }
    console.log('PORT : ', process.env.PORT);
};
