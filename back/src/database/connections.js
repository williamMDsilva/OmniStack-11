const knex = require("knex");

const config = require("../../knexfile");

const env = process.env.NODE_ENV
let configEnv;

if(env == 'development'){
    configEnv = config.development
}
if(env == 'tests'){
    configEnv = config.tests
}

if(!env){
    configEnv = config.development
}

module.exports = knex(configEnv);
