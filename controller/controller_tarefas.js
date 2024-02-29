/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de tarefas
* Data: 15/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const tarefasDAO = require('../model/DAO/tarefa.js')

// Import do arquivo para mensagens
const message = require('./modulo/config.js')

// Função para listar todas as tarefas de um usuário
const getListarTarefas = async(idUsuario) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefasJSON = {}
 
    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario)){

        return message.ERROR_INVALID_ID // 400

    } else {

        let dadosTarefas = await tarefasDAO.selectAllTarefasById(usuario)

        // Validação para verificar se os dados no servidor foram processados
        if(dadosTarefas){

            // Validação para verificar se existem dados de retorno
            if(dadosTarefas.length > 0){
                
                // Montando o JSON para retornar a tarefa
                tarefasJSON.tarefas = dadosTarefas
                tarefasJSON.status_code = 200
                // Retorna o JSON montado
                return tarefasJSON

            }else{

                return message.ERROR_NOT_FOUND // 404

            }

        } else {

            return message.ERROR_INTERNAL_SERVER_DB // 500

        }

    }

}

// Função para listar todas as tarefas não concluidas de um usuário
const getListarTarefasNaoConcluidas = async(idUsuario) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefasJSON = {}
 
    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario)){

        return message.ERROR_INVALID_ID // 400

    } else {

        let dadosTarefas = await tarefasDAO.selectTarefasNaoConcluidasById(usuario)

        // Validação para verificar se os dados no servidor foram processados
        if(dadosTarefas){

            // Validação para verificar se existem dados de retorno
            if(dadosTarefas.length > 0){
                
                // Montando o JSON para retornar a tarefa
                tarefasJSON.tarefas = dadosTarefas
                tarefasJSON.status_code = 200
                // Retorna o JSON montado
                return tarefasJSON

            }else{

                return message.ERROR_NOT_FOUND // 404

            }

        } else {

            return message.ERROR_INTERNAL_SERVER_DB // 500

        }

    }

}

// Função para buscar uma tarefa pelo ID
const getBuscarTarefa = async(idUsuario, idTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefa = idTarefa
    let tarefasJSON = {}
 
    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario) || tarefa == '' || tarefa == undefined || isNaN(tarefa)){

        return message.ERROR_INVALID_ID // 400

    } else {

        let dadosTarefas = await tarefasDAO.selectTarefaById(usuario, tarefa)

        // Validação para verificar se os dados no servidor foram processados
        if(dadosTarefas){

            // Validação para verificar se existem dados de retorno
            if(dadosTarefas.length > 0){
                
                // Montando o JSON para retornar a tarefa
                tarefasJSON.tarefa = dadosTarefas
                tarefasJSON.status_code = 200
                // Retorna o JSON montado
                return tarefasJSON

            }else{

                return message.ERROR_NOT_FOUND // 404

            }

        } else {

            return message.ERROR_INTERNAL_SERVER_DB // 500

        }

    }

}

// Função para alterar o estado de uma tarefa como concluida
const setConcluirTarefa = async(idUsuario, idTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefa = idTarefa

    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario) || tarefa == '' || tarefa == undefined || isNaN(tarefa)){

        return message.ERROR_INVALID_ID // 400

    } else {

        //Envia os dados para a model inserir no BD
        resultDadosTarefa = await tarefasDAO.updateConcluirTarefa(usuario, tarefa)

        //Valida se o BD inseriu corretamente os dados
        if(resultDadosTarefa)
            return message.UPDATED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }    

}

// Função para alterar o estado de uma tarefa como não concluida
const setTarefaNaoConcluida = async(idUsuario, idTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefa = idTarefa
    let resultDadosTarefa

    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario) || tarefa == '' || tarefa == undefined || isNaN(tarefa)){

        return message.ERROR_INVALID_ID // 400

    } else {

        //Envia os dados para a model inserir no BD
        resultDadosTarefa = await tarefasDAO.updateTarefaNaoConcluida(usuario, tarefa)

        //Valida se o BD inseriu corretamente os dados
        if(resultDadosTarefa)
            return message.UPDATED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500


    }    

}

// Função para atualizar os dados de uma tarefa
const setAtualizarTarefa = async(idUsuario, idTarefa, objTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefaId = idTarefa
    let tarefa = objTarefa
    let resultDadosTarefa

    //Validação para tratar campos obrigatórios e quantide de caracteres
    if( tarefa.titulo == ''     || tarefa.titulo == undefined    || tarefa.titulo.length > 50        ||
        tarefa.descricao == ''  || tarefa.descricao == undefined || tarefa.descricao.length > 65535          
     ){
        
        return message.ERROR_REQUIRED_FIELDS // 400

     }else{

        //Envia os dados para a model inserir no BD
        resultDadosTarefa = await tarefasDAO.updateTarefaById(usuario, tarefaId, tarefa)

        //Valida se o BD inseriu corretamente os dados
        if(resultDadosTarefa)
            return message.UPDATED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }

}

// Função para deletar uma tarefa
const setExcluirTarefa = async(idUsuario, idTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefa = idTarefa
    let resultDadosTarefa

    // Validação para ID vazio, indefinido
    if(usuario == '' || usuario == undefined || isNaN(usuario) || tarefa == '' || tarefa == undefined || isNaN(tarefa)){

        return message.ERROR_INVALID_ID // 400

    } else {

        //Envia os dados para a model inserir no BD
        resultDadosTarefa = await tarefasDAO.deleteTarefaById(usuario, tarefa)

        //Valida se o BD inseriu corretamente os dados
        if(resultDadosTarefa)
            return message.DELETED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500


    }   

}

// Função para adicionar uma nova tarefa
const setNovaTarefa = async(idUsuario, objTarefa) => {

    //Recebe o id da Tarefa e do Usuario
    let usuario = idUsuario
    let tarefa = objTarefa
    let resultDadosTarefa

    //Validação para tratar campos obrigatórios e quantide de caracteres
    if( tarefa.titulo == ''     || tarefa.titulo == undefined    || tarefa.titulo.length > 50        ||
        tarefa.descricao == ''  || tarefa.descricao == undefined || tarefa.descricao.length > 65535          
     ){
        
        return message.ERROR_REQUIRED_FIELDS // 400

     }else{

        //Envia os dados para a model inserir no BD
        resultDadosTarefa = await tarefasDAO.insertTarefa(tarefa, usuario)
        
        //Valida se o BD inseriu corretamente os dados
        if(resultDadosTarefa)
            return message.CREATED_ITEM // 201
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }

}

module.exports={
    getListarTarefas,
    getListarTarefasNaoConcluidas,
    getBuscarTarefa,
    setConcluirTarefa,
    setTarefaNaoConcluida,
    setAtualizarTarefa,
    setExcluirTarefa,
    setNovaTarefa
}