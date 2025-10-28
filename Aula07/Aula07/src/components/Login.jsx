import { useState } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import './Login.css'
import  images from '/logoIFCE.png'
function Login({onLogin}) {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    function handleClick() {
        const body = {
            email: login,
            password: senha
        };
        const user =  axios.post('http://localhost:3000/v1/login', body).then(response => {
            console.log('User data:', response.data);
            console.log(response.data);
            onLogin(response.data.user);
       
        }).catch(error => {
             alert('Login ou senha inválidos');

            if (error.code === 401) {
                alert('Login ou senha inválidos');
            } else {
                console.error('There was an error!', error.message);
            }
        });

    }    

    return (
        <>
            <div className='login-container'>
                <img src={images} alt="Logo" className="login-logo" style={{marginBottom:20}} />
               <TextField  style={{marginBottom:10}} id="login"  label="Login" variant="outlined"  value={login} onChange={(e) => setLogin(e.target.value)}/>
               <TextField  type="password" id="password" style={{marginBottom:20}} label="Senha" variant="outlined"  value={senha} onChange={(e) => setSenha(e.target.value)}/>
               <Button  variant="outlined" onClick={handleClick} >entrar</Button>
            </div>
        </>
    )
}



export default Login
