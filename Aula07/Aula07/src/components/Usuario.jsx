import { useState } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function Usuario() {
    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Cadastro de Usuário</h1>
            <input type="text" placeholder="Nome" /><br/>
            <input type="text" placeholder="Email" /><br/>
            <input type="password" placeholder="Senha" /><br/>
            <button>Cadastrar</button>
         </div>
         </div>
        </>
    )
}



export default Usuario