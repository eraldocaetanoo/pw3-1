import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
import Usuario from './Usuario'
import UsuarioList from './UsuarioList'


function Home() {
   
    const [page,setPage]  = useState('home');

    function renderContent() {
        if (page === 'home') { 
            return <h1>Bem-vindo à página Home!</h1>;
        }
        if (page === 'usuario') {
            return <UsuarioList setCurrentPage={setPage} />;
        } 
        if (page === 'newusuario') {
            return <Usuario setCurrentPage={setPage}/>;
        } 
        
    }

    return (
        <>
        <div style={{display:'flex', flexDirection:'row' }}>
         <MenuLateral setCurrentPage={setPage} />
         <div  className="conteudo">
           {renderContent()}
         </div>
         </div>
        </>
    )
}



export default Home
