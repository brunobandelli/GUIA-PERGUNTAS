const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas','root','mysqlbn94',{           // nome do banco de dados, nome do usuario, senha.
    host: 'localhost',                                                          // o servidor aonde ele esta rodando, no caso estamos usando o proprio computador.
    dialect: 'mysql'                                                            // aqui qual banco de dados nós vamos se comunicar.
})

module.exports = connection;                                                    // comando para poder exportar a conexão para utilizar em outros arquivos