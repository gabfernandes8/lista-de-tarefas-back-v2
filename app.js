/*****************************************************************
* Objetivo: Criar uma api para responder as tarefas da empresa GARY's TASKS
* Data: 15/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
*****************************************************************/

/****************************************************************************************************************************************************
* Para realizar a conexão com o Banco de Dados precisamos utilizar uma dependência:  
*  - SEQUELIZE  ORM
*  - PRISMA     ORM
*  - FASTIFY    ORM
*
* Prisma - Dependências:
*   npm install prisma --save
*   npm install @prisma/client --save
*   
* Comando para incialização o prisma
*   npx prisma init
*
* Comando para sincronizar o Banco de Dados e o Prisma
* npx prisma migrate dev
****************************************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json();

//index do backend
const app = express()

// para funcionar
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')
    app.use(cors)
    next()
})

/*************** IMPORTS DE ARQUIVOS E BIBLIOTECAS DO PROJETO *******************/
    const controllerTarefas = require('./controller/controller_tarefas.js')
    const controllerUsuarios = require('./controller/controller_usuario.js');
const { request } = require('express');
/****************************************************************************** */

app.get('/v2/lista-de-tarefas/usuarios/', cors(), async(request, response, next) => {

    let dadosUsuario = await controllerUsuarios.getListarUsuarios()

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)

})

app.get('/v2/lista-de-tarefas/usuarios/id/:email', cors(), async(request, response, next) => {

    let email = request.params.email
    let dadosUsuario = await controllerUsuarios.getUserIdByEmail(email)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)

})

app.get('/v2/lista-de-tarefas/usuarios/:id', cors(), async(request, response, next) => {

    let id = request.params.id
    let dadosUsuario = await controllerUsuarios.getUserByID(id)
    
    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)

})

app.put('/v2/lista-de-tarefas/usuario/atualizar', cors(), bodyParserJSON, async(request, response, next) => {

    let usuario = request.body
    let dadosUsuario = await controllerUsuarios.updateUser(usuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})

app.post('/v2/lista-de-tarefas/criar-usuario', cors(), bodyParserJSON, async(request, response, next) => {

    let usuario = request.body
    let dadosUsuario = await controllerUsuarios.setNewUser(usuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)

})

app.get('/v2/lista-de-tarefas/tarefas/:id', cors(), async(request, response, next) => {

    let usuario = request.params.id

    let dadosTarefa = await controllerTarefas.getListarTarefas(usuario)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.get('/v2/lista-de-tarefas/tarefas/nao-concluidas/:id', cors(), async(request, response, next) => {

    let usuario = request.params.id

    let dadosTarefa = await controllerTarefas.getListarTarefasNaoConcluidas(usuario)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.get('/v2/lista-de-tarefas/tarefa/', cors(), async(request, response, next) => {

    let tarefa = request.query.idTarefa
    let usuario = request.query.idUsuario

    let dadosTarefa = await controllerTarefas.getBuscarTarefa(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.get('/v2/lista-de-tarefas/tarefa/privadas', cors(), async(request, response, next) => {

    let usuario = request.query.idUsuario

    let dadosTarefa = await controllerTarefas.getBuscarTarefa(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.put('/v2/lista-de-tarefas/tarefa/concluir/', cors(), async(request, response, next) => {

    let tarefa = request.query.idTarefa
    let usuario = request.query.idUsuario

    let dadosTarefa = await controllerTarefas.setConcluirTarefa(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.put('/v2/lista-de-tarefas/tarefa/nao-concluir/', cors(), async(request, response, next) => {

    let tarefa = request.query.idTarefa
    let usuario = request.query.idUsuario

    let dadosTarefa = await controllerTarefas.setTarefaNaoConcluida(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.put('/v2/lista-de-tarefas/tarefa/atualizar/', cors(), bodyParserJSON, async(request, response, next) => {

    let tarefa = request.query.idTarefa
    let usuario = request.query.idUsuario
    let objTarefa = request.body

    let dadosTarefa = await controllerTarefas.setAtualizarTarefa(usuario, tarefa, objTarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.delete('/v2/lista-de-tarefas/tarefa/excluir/', cors(), async(request, response, next) => {

    let tarefa = request.query.idTarefa
    let usuario = request.query.idUsuario

    let dadosTarefa = await controllerTarefas.setExcluirTarefa(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})

app.post('/v2/lista-de-tarefas/criar-tarefa/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let tarefa = request.body
    let usuario = request.params.id

    let dadosTarefa = await controllerTarefas.setNovaTarefa(usuario, tarefa)

    response.status(dadosTarefa.status_code)
    response.json(dadosTarefa)

})



app.listen(8080, () => {console.log('Servidor aguardando requisições na porta 8080')})