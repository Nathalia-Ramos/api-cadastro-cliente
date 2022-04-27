'use strict'

import {openModal, closeModal} from './modal.js'
import {readClients, createClient, deleteClient} from './clientes.js'

const createRow = (client) =>{
    const row = document.createElement ('tr')
    row.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="editar"-${client.id}>editar</button>
        <button type="button" class="button red" id="excluir"-${client.id}>excluir</button>
    </td>
    `

    return row 
}

const updateTable = async () => {

    const clientsContainer = document.getElementById ('clients-container')

    // Ler a API e armazenar o resultado em uma variavel 
    const clients = await readClients() 

    // Preencher a tabela com as informações da API
    const rowns = clients.map(createRow)
    clientsContainer.replaceChildren(...rowns)
}
const saveClient = async  () => {
    //Criar um JSON com as infomações do cliente
    const client = {
        "id": "",
        "nome":    document.getElementById('nome').value,
        "email":   document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade":  document.getElementById('cidade').value
    }
    
    //Pegar o JSON e enviar o servidor API
    await createClient(client)

    //Fechar a modal
    closeModal()

    //Atualizar a tabela 
    updateTable()
}
const actionClient = async (event) => {
    if(event.target.type == 'button'){

        const [action, codigo]= event.target.id.split('-')

        if(action [0] == 'editar'){
            //função para editar o cliente
        }else if (action [0] == 'excluir'){
           //funçao para excluir
          await deleteClient(codigo)
          updateTable()
        }
    }
}

//Essa funcao vai atualizar a tabela
    updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.getElementById('clients-container').addEventListener('click', actionClient)

