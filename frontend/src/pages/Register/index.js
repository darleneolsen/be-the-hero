import React, { useState }  from 'react';
//Importando os icons
import {FiArrowLeft} from 'react-icons/fi'; //https://feathericons.com/ // componente pois é um pacote

//Importando a conexao com o back-end
import api from '../../services/api';

//Importando o componente link react-router-dom
import {Link, useHistory} from 'react-router-dom'

//Importando os style
import './style.css';

//Importar uma variavel

import logoImg  from '../../assets/logo.svg';// {herosImg} variavel pois é uma foto

export default function Register() {
  //crias as variaveis do tipo estado
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity]         = useState('');
  const [uf, setUf]             = useState('');

  const history = useHistory();
  async function handleRegister(e){
    //e recebe um evento do submit e preventDefault não deixa o form ser carregado inteiro
    e.preventDefault();
     //  console.log({
    const data = {   
      name,
      email,
      whatsapp,
      city,
      uf,
    };
  
    try{
      const response = await api.post('ongs',data);
      alert(`Seu id de acesso: ${response.data.id}`);
      history.push("/");
    }catch{
      alert('Erro no cadastro, tente novamente');
    }

  }

  return (
    <div className="register-container">
      <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"></img>
          <h1>Cadastro</h1>
           <p>Faça seu cadastro, e entre na plataforma e ajude as pessoas a encontrarem os casos da sua ong.</p>
             <Link className="back-link" to="/">
                      <FiArrowLeft size={16} color="#E02041" />
                      Voltar para Logon</Link>   
      </section>                         
              <form onSubmit={handleRegister}>
                  <input type="text" 
                  value={name}
                  onChange={e =>setName(e.target.value)}                  
                  placeholder="Nome da ong"></input>
                 
                  <input type="email" 
                  value={email}
                  onChange={e =>setEmail(e.target.value)}    
                  placeholder="E-mail"></input>
                 
                  <input type="text" 
                   value={whatsapp}
                   onChange={e =>setWhatsapp(e.target.value)}                  
                  placeholder="WhatsApp"></input>

                  <div className="input-group">
                    <input type="text" 
                     value={city}
                    onChange={e =>setCity(e.target.value)}                                                           
                    placeholder="Cidade"></input>

                    <input type="text" 
                      value={uf}
                      onChange={e =>setUf(e.target.value)}                         
                    placeholder="Uf"></input>
                    
                  </div>
                  <button className="button" type="submit">Cadastrar</button>
                

              </form>

      </div>
    </div>
  );
}
