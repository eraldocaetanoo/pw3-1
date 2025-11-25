import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function UsuarioList({ setCurrentPage, setIdUser }) {

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [listaUsuarios, setListaUsuarios] = useState([]);

    function setUsersList(){

        const body={
            name:  "%"+nome+"%",
            email: "%"+email+"%"
        }

         axios.post('http://localhost:3000/v1/users/by', body).then(response => {
            console.log('User data:', response.data);
            setListaUsuarios(response.data);
       
        }   ).catch(error => {
            console.error('There was an error!', error.message);
        }   );   

    }

    function handleNew() {
        setCurrentPage('newusuario');

    }

    function handleSave() {
       // alert('Pesquisar usuario: '+nome+' - '+email);
        const body = {
            name: nome,
            email: email
        };
        setUsersList();
    }

    function handleDelete(id) {
        const resposta = confirm('Deseja excluir  o usuario '+id.name+" ?");
        if (resposta){

            axios.delete('http://localhost:3000/v1/users/'+id.id).then(response => {
                console.log('User deleted:', response.data);
                setUsersList();
            }).catch(error => {
                console.error('Houve um erro ao excluir!', error.message);
            });
        }
    }

    function handleUpdade(id){
      //  alert('Editar usuario '+id.name);
        setCurrentPage('updateusuario');
        setIdUser(id.id);
    }

     useEffect(() => {
       setUsersList();

     }, []);

   
    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Cadastro de Usuário</h1>
            <TextField label="Nome" variant="outlined" fullWidth margin="normal" onChange={(e) => setNome(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleSave} >Pesquisar</Button>
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleNew} >Novo</Button>
       
         </div>
         <div className="table_component" style={{marginTop:20}}>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>excluir</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td> <a  onClick={() => handleDelete(usuario)} href='#'>excluir</a>  </td>
                        <td> <a  onClick={() => handleUpdade(usuario)} href='#'>editar</a>  </td>
                    </tr>))}
                </tbody>
            </table>
         </div>
         </div>
        </>
    )
}



export default UsuarioList