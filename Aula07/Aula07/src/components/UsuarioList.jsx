import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function UsuarioList({ setCurrentPage }) {

   

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [listaUsuarios, setListaUsuarios] = useState([]);

    function setUsersList(){
         axios.get('http://localhost:3000/v1/users').then(response => {
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
        const body = {
            name: nome,
            email: email
        };
        setUsersList();
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
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                    </tr>))}
                </tbody>
            </table>
         </div>
         </div>
        </>
    )
}



export default UsuarioList