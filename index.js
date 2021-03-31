const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
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
    Pergunta.findAll({ raw: true, order:[                            //PESQUISA COMPLETA, INXUTA E ORDENADA
        ['id','DESC']                                                //ORDEM: ASC = Crescente || DESC = Decrescente
    ] }).then(perguntas => {                                         //SIGNIFICA QUE ESTÁ RECEBENDO AS PERGUNTAS DE MANEIRA SIMPLES E ENVIANDO DENTRO DA VARIAVEL: perguntas
        res.render("index",{                                         //FAZENDO ISSO ELE IRÁ LER O ARQUIVO HTML(index.ejs)
            perguntas: perguntas                                     //A VARIAVEL perguntas ESTA RECEBENDO AS LISTAS DE PERGUNTAS, DENTRO DA VARIAVEL: perguntas
        });                                                
    });                                                                      
});


app.get("/perguntar",(req, res) => {
    res.render("perguntar");                       //FAZENDO ISSO ELE IRÁ LER O ARQUIVO HTML(perguntar.ejs)   
});

app.post("/salvarpergunta",(req, res) => {          // ROTA PARA RECEBER OS DADOS DO FORMULARIO (perguntar.ejs)
    var titulo = req.body.titulo;                   // RECEBE OS DADOS DO TITULO NA VAR PELO NAME TITULO NO perguntar.ejs
    var descricao =  req.body.descricao;            // RECEBER OS DADOS DA DESCRIÇÃO NA VAR PELO NAME DESCRICAO NO perguntar.ejs
    Pergunta.create({                               // CHAMAR O MODEL Pergunta. // EQUIVALENTE AO CÓDIGO SQL: INSERTE INTO perguntas ...Pergunta.                              
        titulo: titulo,                             // CAMPO TITULO RECEBE OS DADOS DA VARIAVEL TITULO DO FORMULÁRIO: var titulo = req.body.titulo; (perguntar.ejs)
        descricao: descricao                        // CAMPO DESCRICAO RECEBE OS DADOS DA VARIAVEL DESCRICAO DO FORMULÁRIO: var descricao = req.body.descricao; (perguntar.ejs)
    }).then(() =>{                                  // QUANDO A PERGUNTA FOR SALVA COM SUCESSO NO MEU BANCO DE DADOS, ENTÃO FARÁ O COMANDO A BAIXO:
        res.redirect("/");                          // FARÁ COM QUE O USUARIO SEJÁ REDIRECIONADO PARA A PAGINA PRINCIPAL.
    });
});


app.get("/pergunta/:id",(req, res) => {             // ROTA DE CADA ID DAS PERGUNTAS(PARAMETRO: :id)
    var id = req.params.id;                         // RECEBE OS DADOS DO PARAMETRO :id 
    Pergunta.findOne({                              // MODEL PERGUNTA(REPRESENTANTE DA TABELA) || findOne() É O METODO DO SEQUELIZE QUE PROCURA UM DADO, COM UMA CONDIÇÃO. 
        where: {id: id}                             // PESQUISA O ID INSERIDO IGUAL AO ID QUE TEM NO BANCO DE DADOS (perguntas)
    }).then(pergunta => {                           // QUANDO A OPERAÇÃO DE BUSCA FOR CONCLUIDA, ENTÃO O THEN IRÁ PASSAR A "PERGUNTA FEITA" PARA A VARIAVEL PERGUNTA.
 	if(pergunta != undefined){                          //QUANDO A PERGUNTA FOR ENCONTRADA( E NÃO FOR INDEFINIDA ), SE SIM
       	Resposta.findAll({					            //PROCURA TODOS OS DADOS NO MODEL Resposta CONFORME A BAIXO:
		where: {perguntaId: pergunta.id},		        //CONDICIONAL(ONDE): PESQUISA TODAS AS RESPOSTAS QUE TENHA O MESMO ID DA PERGUNTA RESPECTIVA CONFORME O BANCO DE DADOS (respostas)
        order: [                                        //ORDENA AS RESPOSTAS
            ['id','DESC']                               //PELO IDE DE FORMA DECRESCENTE
        ]
	}).then(respostas => {					            //QUANDO A OPERAÇÃO DE BUSCA FOR CONCLUIDA, ENTÃO O THEN IRÁ PASSAR A "RESPOSTA FEITA + PERGUNTA" PARA A VARIAVEL RESPOSTAS.
		res.render("pergunta", {			            //DIRECIONA PARA PAGINA PERGUNTA (DENTRO DA VIEW) ("pergunta")
			pergunta: pergunta,			                //CAMPO pergunta, RECEBE OS DADOS DA VARIAVEL: pergunta. 
			respostas: respostas			            //CAMPO respostas, RECEBE OS DADOS DA VARIAVEL: respostas. 
		});						                        //OU SEJÁ ESSES CAMPOS SERÃO PASSADOS PARA A VIEW pergunta.ejs
	});              
        }else{                                      // QUANDO A PERGUNTA NÃO FOR ENCONTRADA, SE NÃO
            res.redirect("/");                      // REDIRECIONA PARA A PAGINA PRINCIPAL ("/")
        }
    });
});
       

app.post("/responder", (req, res) => {              //ROTA PARA RECEBER OS DADOS DO FORMULARIO (pergunta.ejs)
    var corpo = req.body.corpo;                     //IRÁ RECEBER O CONTEUDO QUE VEM DA TEXTAREA PELO NAME CORPO NO pergunta.ejs [ req = requisição / body = corpo da requisição / nome do campo ]
    var perguntaId = req.body.pergunta;             //IRÁ RECEBER O ID DINAMICO DE PELO NAME PEGUNTA NO pergunta.ejs
    Resposta.create({                               //MODEL: Resposta // EQUIVALENTE AO CÓDIGO SQL: INSERTE INTO respotas ...Resposta.
        corpo: corpo,                               //CAMPO CORPO RECEBE OS DADOS DA VARIAVEL CORPO DO FORMULÁRIO: var corpo = req.body.corpo; (pergunta.ejs)
        perguntaId: perguntaId                      //CAMPO PERGUNTAID RECEBE OS DADOS DA VARIAVEL PERGUNTAID DO FORMULÁRIO: var perguntaId = req.body.pergunta; (pergunta.ejs)
    }).then(() => {                                 //QUANDO A PERGUNTA FOR SALVA COM SUCESSO NO MEU BANCO DE DADOS, ENTÃO FARÁ O COMANDO A BAIXO:
        res.redirect("/pergunta/"+perguntaId);      //APÓS RESPONDER A PERGUNTA, IRÁ REDIRECIONAR PARA A PAGINA DO ID CORRESPONDENTE A PERGUNTA QUE VOCÊ RESPONDEU.
    });
});

app.listen(8080,()=>{console.log("App rodando!");});
