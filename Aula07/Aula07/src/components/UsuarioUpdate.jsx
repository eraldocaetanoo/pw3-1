import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function UsuarioUpdate({ setCurrentPage, idUser }) {

    

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [senha,setSenha]  = useState('');
    const [ende,setEnde]  = useState('');
    const [id, setId] = useState(idUser);

    useEffect(() => {
        console.log('ID do usuário para atualizar (useEffect):', idUser);

        axios.get(`http://localhost:3000/v1/users/${idUser}`).then(response => {
            setNome(response.data.name);
            setEmail(response.data.email);
            setSenha(response.data.password);
            setEnde(response.data.endereco);
            setId(response.data.id);
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
    }, [idUser]);


    function handleBack() {
        setCurrentPage('usuario');
    }

    function handleSave() {
        const body = {
            name: nome,
            email: email,
            password: senha,
            endereco: ende
        };
        axios.put(`http://localhost:3000/v1/users/${id}`, body).then(response => {
         //   console.log('User data:', response.data);
          //s  console.log(response.data);
            alert('Usuário atualizado com sucesso!');
       
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
      
    
    }

    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Updade de Usuário</h1>
            <TextField label="Nome" variant="outlined" value={nome} fullWidth margin="normal" onChange={(e) => setNome(e.target.value)} />
            <TextField label="Email" variant="outlined" value={email} fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Senha" type="password"  value={senha} variant="outlined" fullWidth margin="normal" onChange={(e) => setSenha(e.target.value)} />
            <TextField label="Endereço" variant="outlined"  value={ende} fullWidth margin="normal" onChange={(e) => setEnde(e.target.value)} />
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleSave} >Cadastrar</Button>
            <div style={{width:20}}>

            </div>
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleBack} >Voltar</Button>
         </div>
         </div>
        </>
    )
}



export default UsuarioUpdate