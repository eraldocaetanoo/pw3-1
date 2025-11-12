import { useState, useEffect, use } from 'react'

function MenuLateral( { setCurrentPage }) {
   
    return (
        <>
           <div class="menu-lateral">
            <ul>
                <li><a href="#" onClick={() => setCurrentPage('home')}>Home</a> </li>
                <li><a href="#" onClick={() => setCurrentPage('usuario')} >Usuário</a> </li>
                <li><a href="#" onClick={() => setCurrentPage('cliente')}  >Cliente</a> </li>
                <li><a href="#" onClick={() => setCurrentPage('produto')} > Produtos</a> </li>
                <li><a href="#" onClick={() => setCurrentPage('vendas')} >Vendas</a> </li>
            </ul>

        </div>
        </>
    )
}



export default MenuLateral
