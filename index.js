const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database
//ESSA ESTRUTURÁ A BAIXO É CHAMADA DE PROMISSE:
connection                                                          //CHAMAR A CONEXÃO
    .authenticate()                                                 //IRÁ TENTAR LOGAR NO MYSQL
    .then(() => {                                                   //SE CONSEGUIR SE CONECTAR,CONECTADO:
        console.log("Conexão feita com o banco de dados!")          //Conexão feita com o banco de dados!
    })
    .catch((msgErro) => {                                           //SE NÃO CONSEGUIR,DER ERRO
        console.log("msgErro");                                     //msgErro
    })

// EXPRESS USANDO O EJS COMO VIEW ENGINE
app.set('view engine','ejs');           //ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.use(express.static('public'));      //ESTOU DIZENDO PRO EXPRESS QUE EU QUERO USAR ALGUMA COISA( NESSE CASO ARQUIVOS ESTATICOS EM UMA PASTA )

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROTAS
app.get("/",(req, res) => {                                          //ROTA PRINCIPAL
    Pergunta.findAll({ raw: true }).then(perguntas => {              //SIGNIFICA QUE ESTÁ RECEBENDO AS PERGUNTAS DE MANEIRA SIMPLES E ENVIANDO DENTRO DA VARIAVEL: perguntas
        res.render("index",{                                         //FAZENDO ISSO ELE IRÁ LER O ARQUIVO HTML(index.ejs)
            perguntas: perguntas                                     //A VARIAVEL perguntas ESTA RECEBENDO AS LISTAS DE PERGUNTAS, DENTRO DA VARIAVEL: perguntas
        });                                                
    });                                                                      
});


app.get("/perguntar",(req, res) => {
    res.render("perguntar");                       //FAZENDO ISSO ELE IRÁ LER O ARQUIVO HTML(perguntar.ejs)   
});

app.post("/salvarpergunta",(req, res) => {          // ROTA PARA RECEBER OS DADOS DO FORMULARIO
    var titulo = req.body.titulo;                   // RECEBE OS DADOS DO TITULO NA VAR
    var descricao =  req.body.descricao;            // RECEBER OS DADOS DA DESCRIÇÃO NA VAR
    Pergunta.create({                               // CHAMAR O MODEL Pergunta. // EQUIVALENTE AO CÓDIGO SQL: INSERTE INTO perguntas ...Pergunta.                              
        titulo: titulo,                             // CAMPO TITULO RECEBE OS DADOS DA VARIAVEL TITULO DO FORMULÁRIO: var titulo = req.body.titulo;
        descricao: descricao                        // CAMPO DESCRICAO RECEBE OS DADOS DA VARIAVEL DESCRICAO DO FORMULÁRIO: var descricao = req.body.descricao;
    }).then(() =>{                                  // QUANDO A PERGUNTA FOR SALVA COM SUCESSO NO MEU BANCO DE DADOS, ENTÃO FARÁ O COMANDO A BAIXO:
        res.redirect("/");                          // FARÁ COM QUE O USUARIO SEJÁ REDIRECIONADO PARA A PAGINA PRINCIPAL.
    });
});

app.listen(8080,()=>{console.log("App rodando!");});
