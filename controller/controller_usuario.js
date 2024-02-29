/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de usuários
* Data: 15/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const usuariosDAO = require('../model/DAO/usuario.js')

// Import do arquivo para mensagens
const message = require('./modulo/config.js')

const getListarUsuarios = async() => {

    let usuariosJSON = {}
    let dadosUsuarios = await usuariosDAO.selectAllUsers()

    if (dadosUsuarios){

        if(dadosUsuarios.length > 0){

            usuariosJSON.usuarios = dadosUsuarios
            usuariosJSON.status_code = 200

            return usuariosJSON

        } else {

            return message.ERROR_NOT_FOUND //404
        }

    } else {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }
}

const getUserIdByEmail = async(email) => {

    let userEmail = email
    let usuariosJSON = {}

    if (userEmail == '' || userEmail == undefined){

        return message.ERROR_INVALID_EMAIL

    } else {

        let dadosUsuarios = await usuariosDAO.selectUserIDByEmail(userEmail)
    
        if (dadosUsuarios){
    
            if(dadosUsuarios.length > 0){
    
                usuariosJSON.usuarios = dadosUsuarios
                usuariosJSON.status_code = 200
    
                return usuariosJSON
    
            } else {
    
                return message.ERROR_NOT_FOUND //404
            }
    
        } else {
    
            return message.ERROR_INTERNAL_SERVER_DB //500
    
        }
    }

}

const getUserByID = async(id) => {

    let userID = id
    let usuariosJSON = {}

    if (userID == '' || userID == undefined || isNaN(userID)){

        return message.ERROR_INVALID_ID

    } else {

        let dadosUsuarios = await usuariosDAO.selectUserByID(userID)
    
        if (dadosUsuarios){

            if(dadosUsuarios.length > 0){
    
                usuariosJSON.usuarios = dadosUsuarios
                usuariosJSON.status_code = 200
    
                return usuariosJSON
    
            } else {
    
                return message.ERROR_NOT_FOUND //404
            }
    
        } else {
    
            return message.ERROR_INTERNAL_SERVER_DB //500
    
        }
    }
}

const updateUser = async(usuario) => {

    let objUsuario = usuario
    let resultDadosUsuario

    if( objUsuario.nome == ''   || objUsuario.nome == undefined  || objUsuario.nome.length > 100  ||
        objUsuario.email == ''  || objUsuario.email == undefined || objUsuario.email.length > 50  ||
        objUsuario.senha == ''  || objUsuario.senha == undefined || objUsuario.senha.length > 10                
     ){
        
        return message.ERROR_REQUIRED_FIELDS // 400

     }else{

        resultDadosUsuario = await usuariosDAO.updateUser(usuario)

        if(resultDadosUsuario)
            return message.UPDATED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }

}

const setNewUser = async(usuario) => {

    let objUsuario = usuario
    let resultDadosUsuario

    if( objUsuario.nome == ''   || objUsuario.nome == undefined  || objUsuario.nome.length > 100  ||
        objUsuario.email == ''  || objUsuario.email == undefined || objUsuario.email.length > 50  ||
        objUsuario.senha == ''  || objUsuario.senha == undefined || objUsuario.senha.length > 10                
     ){
        
        return message.ERROR_REQUIRED_FIELDS // 400

     }else{

        resultDadosUsuario = await usuariosDAO.insertUser(usuario)

        if(resultDadosUsuario)
            return message.UPDATED_ITEM // 200
        else
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }

}

module.exports={
    getListarUsuarios,
    getUserByID,
    getUserIdByEmail,
    updateUser,
    setNewUser
}