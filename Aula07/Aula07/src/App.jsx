import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

function App() {
 
  const [user, setUser] = useState(null);  

  function renderContent() {
    if (user) {

      return <Home />;

    } else {

      return <Login onLogin={setUser} />;

    }
  }

  return (
    <>
      {renderContent()}
    </>
  )
}

export default App
