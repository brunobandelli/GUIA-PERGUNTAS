const Sequelize = require ("sequelize");                        //SEQUELIZE       
const connection = require("./database");                       //CONEXÃO COM O BANCO DE DADOS

const Resposta = connection.define("respostas",{               //CRIANDO TABELA, COM UM NOME, ABRIR UM JSON{} E DEFINIR OS CAMPOS DA TABELA
    corpo: {                                                    //CAMPO: corpo (PARTE DE TEXTO DA RESPOSTA)
        type: Sequelize.TEXT,                                   //DEFINIÇÃO DO TIPO DO CAMPO: TEXT(PORQUE VAI SER UM TEXTO LONGOS)
        allowNull: false                                        //ISSO IMPEDE QUE ESSE CAMPO RECEBA VALORES NULO, ELE NÃO PODERA SER VAZIL NO MEU BANCO DE DADOS
    },
    perguntaId: {                                               //CAMPO: perguntaId (RELACIONAMENTO ENTRE 2 TABELAS) TODA RESPOSTA VAI PERTENCER A UMA PERGUNTA DO SEU RESPECTIVO ID.
        type: Sequelize.INTEGER,                                //DEFINIÇÃO DO TIPO DO CAMPO: INTEGER (PORQUE É UM NUMERO INTEIRO)
        allowNull: false                                        //ISSO IMPEDE QUE ESSE CAMPO RECEBA VALORES NULO, ELE NÃO PODERA SER VAZIL NO MEU BANCO DE DADOS
    }

});

Resposta.sync({force: false});                                  //ESSE COMANDO IRÁ SINCRONIZAR OQUE ESTÁ ACIMA, COM O BANCO DE DADOS.
                                                                //ESSE force: false SERVE PARA NÃO CRIAR UMA NOVA TABELA COM O MESMO NOME CASO ELA JA EXISTA, ENTÃO SE A TABELA pergunta JÁ EXISTIR, ELE NÃO FORÇARA A CRIAÇÃO DELA.
module.exports = Resposta;                                      //LINK PARA EXPORTAR O MODEL PARA O ARQUIVO PRINCIPAL index.js
// ISO ACIMA IRÁ VIRAR UMA TABELA NO MEU BANCO DE DADOS.