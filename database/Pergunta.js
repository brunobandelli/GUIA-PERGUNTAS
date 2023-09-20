const Sequelize = require ("sequelize");                        //SEQUELIZE       
const connection = require("./database");                       //CONEXÃO COM O BANCO DE DADOS

//DEFININDO UM MODEL

const Pergunta = connection.define('perguntas',{                //CRIANDO TABELA, COM UM NOME, ABRIR UM JSON{} E DEFINIR OS CAMPOS DA TABELA
    titulo:{                                                    //CAMPO: TITULO
        type: Sequelize.STRING,                                 //DEFINIÇÃO DO TIPO DO CAMPO: STRING(PORQUE VAI SER UM TEXTO CURTO)
        allowNull: false                                        //ISSO IMPEDE QUE ESSE CAMPO RECEBA VALORES NULO, ELE NÃO PODERA SER VAZIL NO MEU BANCO DE DADOS
    },
    descricao:{                                                 //CAMPO: TITULO
        type: Sequelize.TEXT,                                   //DEFINIÇÃO DO TIPO DO CAMPO: TEXT(PORQUE VAI SER UM TEXTO LONGOS)
        allowNull: false                                        //ISSO IMPEDE QUE ESSE CAMPO RECEBA VALORES NULO, ELE NÃO PODERA SER VAZIL NO MEU BANCO DE DADOS
    }
});                                                             // ALÉM DISSO VOCÊ PODE PASSAR UM JSON DE OPÇÕES, OU COM {} OU SEM, FICARÁ ASSIM A ULTIMA LINHA: }{}); MAS NESE CASO, NÃO VAMOS COLOCAR.

Pergunta.sync({force: false}).then(() => {});                   //ESSE COMANDO IRÁ SINCRONIZAR OQUE ESTÁ ACIMA, COM O BANCO DE DADOS.
                                                                //ESSE force: false SERVE PARA NÃO CRIAR UMA NOVA TABELA COM O MESMO NOME CASO ELA JA EXISTA, ENTÃO SE A TABELA pergunta JÁ EXISTIR, ELE NÃO FORÇARA A CRIAÇÃO DELA.                        
module.exports = Pergunta;                                      //LINK PARA EXPORTAR O MODEL PARA O ARQUIVO PRINCIPAL index.js
// ISO ACIMA IRÁ VIRAR UMA TABELA NO MEU BANCO DE DADOS.

