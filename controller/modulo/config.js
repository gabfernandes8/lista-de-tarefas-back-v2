/***************************************************************************************
* Objetivo: Arquivo responsável por padronizar as mensagens de ERRO, SUCESSO, Funções 
* e variáveis para o projeto
* Data: 20/02/2024
* Autor: Gabriela Fernandes e Ryan Alves
* Versão: 1.0
***************************************************************************************/

/********************************** Mensagens de Erro *********************************/

const ERROR_INVALID_ID = {
    status: false,
    status_code: 400,
    message: 'O ID encaminhado na requisição não é válido'
}

const ERROR_INVALID_EMAIL = {
    status: false,
    status_code: 400,
    message: 'O Email encaminhado na requisição não é válido'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Nenhum item encontrado na requisição'
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'O parâmetro encaminhado na requisição não é valido'
}

const ERROR_INTERNAL_SERVER_DB = {
    status: false,
    status_code: 500,
    message: 'Ocorrem erros internos no servidor do banco de dados, por favor contate o administrador do sistema'
}

/******************************** Mensagens de Sucesso ********************************/

const CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro criado com sucesso'
}

const UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro atualizado com sucesso'
}

const DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro deletado com sucesso'
}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_INVALID_EMAIL,
    ERROR_NOT_FOUND,
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_DB,
    CREATED_ITEM,
    UPDATED_ITEM,
    DELETED_ITEM
}