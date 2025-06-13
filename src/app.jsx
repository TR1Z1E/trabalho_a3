import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './assets/components/Login';

import Home from './assets/components/Home';

import Erro from './assets/components/Erro';

import Contato from './assets/components/Contato';

import Cadastro from './assets/components/Cadastro';

import Agendar from './assets/components/Agendar';

import './App.css';

function App() {

return (

<Router>

<div className="App">

<Routes>

<Route path="/" element={<Login />} />

<Route path="/home" element={<Home />} />

<Route path="/cadastro" element={<Cadastro />} />

<Route path="/contato" element={<Contato />} />

<Route path="/erro" element={<Erro />} />

<Route path="/agendar" element={<Agendar />} />

</Routes>

</div>

</Router>

);

}

export default App;