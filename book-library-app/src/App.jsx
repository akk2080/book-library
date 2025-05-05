import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import store from './store/store'
import { Provider } from 'react-redux'

function App() {
 

  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book/:id' element={<Details/>}/>


      </Routes>
      </Provider>
      
    </>
  )
}

export default App
