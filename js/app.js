'use strict'

import {openModal, closeModal} from './modal.js'
import {updateCliente, readClients, createClient, deleteClient} from './clientes.js'

const createRow = ({nome,email,celular,cidade,id}) => {
    const row = document.createElement ('tr')
    row.innerHTML = `
    <td>${nome}</td>
    <td>${email}</td>
    <td>${celular}</td>
    <td>${cidade}</td>
    <td>
        <button type="button" class="button green" onClick="editClient(${id})">editar</button>
        <button type="button" class="button red" onClick="delClient(${id})">excluir</button>
    </td>
    `

    return row 
}

    const updateTable = async () => {

    const clientsContainer = document.getElementById ('clients-container')

    // Ler a API e armazenar o resultado em uma variavel 
    const clients = await readClients() 

    // Preencher a tabela com as informações da API
    const rows = clients.map(createRow)
    
    clientsContainer.replaceChildren(...rows)
}
const isEdit = () => document.getElementById('nome').hasAttibute('data-id')



const saveClient = async () => {
    //Criar um JSON com as infomações do cliente
    const client = {
        "id": "",
        "nome":    document.getElementById('nome').value,
        "email":   document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade":  document.getElementById('cidade').value
    }


    if(isEdit()){
        cliente.id = document.getElementById('nome').dataset.id
        await updateCliente(cliente)
    }else{

    //Pegar o JSON e enviar o servidor API
        await createCliente(client)

    }

    //Fechar a modal
    closeModal()

    //Atualizar a tabela 
    updateTable()
}


const fillForm = (cliente) => {

    document.getElementById('nome').value = cliente.nome
    document.getElementById('email').value = cliente.email
    document.getElementById('celular').value = cliente.celular
    document.getElementById('cidade').value = cliente.cidade
    document.getElementById('nome').dataset.id = cliente.id

}

globalThis.editClient = async (id) =>{
    //Armazenar as informações do cliente selecionado em uma variavel
    const cliente = await readClients(id)


    //Preencher formulário com as informações
    fillForm(cliente)


    //Abrir a modal no estado de edição
    openModal()
}

globalThis.delClient = async (id) =>{
    await deleteClient(id)
    updateTable()
}


// const actionClient = async (event) => {
//     if(event.target.type == 'button'){

//         const [action, codigo]= event.target.id.split('-')

//         if(action == 'editar'){
//             //função para editar o cliente
//         }else if (action == 'excluir'){
//            //funçao para excluir
//           await deleteClient(codigo)
//           updateTable()
//         }
//     }
// }

//Essa funcao vai atualizar a tabela
    updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
//document.getElementById('clients-container').addEventListener('click', actionClient)

