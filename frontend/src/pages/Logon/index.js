import React, { useState } from 'react';
//Importando os icons
import {FiLogIn} from 'react-icons/fi'; //https://feathericons.com/ // componente pois é um pacote

//Importando a conexao com o back-end
import api from '../../services/api';

//Importando o componente link react-router-dom
import {Link, useHistory} from 'react-router-dom'

//Importando os style
import './style.css';

//Importar uma variavel

import herosImg  from '../../assets/heroes.png'; // {herosImg} variavel pois é uma foto
import logoImg  from '../../assets/logo.svg';

export default function Logon() {
  //definindo os estados
  const [id, setId]  = useState('');

  const history = useHistory();
  async function handleLogin(e){
    //e recebe um evento do submit e preventDefault não deixa o form ser carregado inteiro
    e.preventDefault();
     //  console.log({
  
    try{
      const response =  await api.post('session',{id});
      //Salvar no storage do navegador
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);   
      history.push("/profile");
    }catch{
      alert('Falha no login, tente novamente');
    }

  }
  return (
    <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be The Hero"></img>
            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input type="text"
                  value={id}
                  onChange={e =>setId(e.target.value)}                  
                placeholder="Sua Id"></input>
                <button className="button" type="submit">Entrar</button>
               
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro</Link>
            </form>
        </section>
        <img src={herosImg} alt="Heroes"></img>
    </div>
  );
}

 //export default App;