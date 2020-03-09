const config = require('../../config.json')

/**
 * Ambiente atual da aplicação.
 * Quando executada em produção no Docker, precisa ter setara a variavel de ambiente com o nome
 * do ambiente
 * @type {string | string}
 */
const environment = process.env.APP_ENV || 'development'
const environmentConfig = config[environment];

/**
 * Garante que existe ambiente configurado
 */
if (!environment) {
    console.error("FATAL: Erro ao configurar ambiente");
    console.error("verifique a variável de ambiente APP_ENV")
    process.exit(1);
}


/**
 * Como boa prática e convenção, toda variável global deve ser referenciada via "global"
 * e sempre deve começar com a letra g
 */
global.gConfig = environmentConfig;
