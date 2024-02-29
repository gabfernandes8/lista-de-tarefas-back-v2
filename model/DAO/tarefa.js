/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de tarefas
* Data: 15/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// listar todas as tarefas de um usuário
const selectAllTarefasById = async(idUsuario) => {

    try {
        
        let sql = `select * from tbl_tarefas where usuario_id = ${idUsuario}`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false

    }
   
}

// listar todas as tarefas não concluidas de um usuário
const selectTarefasNaoConcluidasById = async(idUsuario) => {

    try {
        
        let sql = `select * from tbl_tarefas where usuario_id = ${idUsuario} and concluido = false`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false

    }
   
}

// buscar uma tarefa existente filtrando pelo ID da tarefa e do usuário
const selectTarefaById = async(idUsuario, idTarefa) => {

    try {
        

        let sql = `select * from tbl_tarefas where id = ${idTarefa} and usuario_id = ${idUsuario}`
        
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)

        return rsTarefas
        
    } catch (error) {
        
        return false

    }
}

// define o estado de uma tarefa como concluida
const updateConcluirTarefa = async(idUsuario, idTarefa) => {

    try {
        
        let sql = `update tbl_tarefas set concluido = true where id = ${idTarefa} and usuario_id = ${idUsuario}`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$upRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false

    }

}

// define o estado de uma tarefa como não concluida
const updateTarefaNaoConcluida = async(idUsuario, idTarefa) => {
    
    try {
        
        let sql = `update tbl_tarefas set concluido = false where id = ${idTarefa} and usuario_id = ${idUsuario}`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false

    }

}

// atualizar uma tarefa existente filtrando pelo ID
const updateTarefaById = async(idUsuario, idTarefa, tarefa) => {

    try {
        
        let sql =  `update tbl_tarefas set 
                                        titulo = '${tarefa.titulo}',	    
                                        descricao = '${tarefa.descricao}'
                    where id = ${idTarefa} and usuario_id = ${idUsuario}`   

                    console.log(sql)

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false

    }

}

// excluir uma tarefa existente filtrando pelo ID
const deleteTarefaById = async(idUsuario, idTarefa) => {
    
    try {
        
        let sql = `delete from tbl_tarefas where id = ${idTarefa} and usuario_id = ${idUsuario}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsTarefas
        let rsTarefas = await prisma.$queryRawUnsafe(sql)
        
        return rsTarefas
        
    } catch (error) {
        
        return false
    }

}

// inserir uma nova tarefa
const insertTarefa = async(tarefa, idUsuario) => {

    try {
        
        let sql = `insert into tbl_tarefas (
                                        titulo,
                                        descricao,
                                        concluido,
                                        usuario_id
                                        ) values (
                                            '${tarefa.titulo}',
                                            '${tarefa.descricao}',
                                            false,
                                            ${idUsuario}
                                        )`

        let resultStatus = await prisma.$executeRawUnsafe(sql)

        return true

    } catch (error) {
        
        return false

    }

}

module.exports = {
    selectAllTarefasById,
    selectTarefasNaoConcluidasById,
    selectTarefaById,
    updateConcluirTarefa,
    updateTarefaNaoConcluida,
    updateTarefaById,
    deleteTarefaById,
    insertTarefa
}