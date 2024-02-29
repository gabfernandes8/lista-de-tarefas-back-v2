/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de usuário
* Data: 15/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

const selectAllUsers = async() => {

    try {

        let sql = 'select * from tbl_usuarios'
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios

    } catch (error) {
     
        return false
    
    }
}

const selectUserIDByEmail = async(email) => {

    try {
        
        let sql = `select id from tbl_usuarios where email = '${email}'`
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios

    } catch (error) {
        
        return false

    }

}

const selectUserByID = async(id) => {

    try {
        
        let sql = `select * from tbl_usuarios where id = ${id}`
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios

    } catch (error) {
        
        return false

    }

}

const updateUser = async(usuario) => {

    try {
        
        let sql = `update tbl_usuarios set 
                                        nome='${usuario.nome}', 
                                        email='${usuario.email}', 
                                        senha='${usuario.senha}' 
                                where id=${usuario.id}`
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios

    } catch (error) {
        
        return false

    }
}

const insertUser = async(usuario) => {

    try {
        
        let sql = `insert into tbl_usuarios (
                                                nome,
                                                email,
                                                senha
                                            )values(
                                                '${usuario.nome}',
                                                '${usuario.email}',
                                                '${usuario.senha}'
                                            )`
                 
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        return true

    } catch (error) {
        
        return false 

    }

}

module.exports={
    selectAllUsers,
    selectUserIDByEmail,
    selectUserByID,
    updateUser,
    insertUser
}