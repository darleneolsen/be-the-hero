import React, {useState} from 'react';
//Importando os icons
import {FiArrowLeft} from 'react-icons/fi'; //https://feathericons.com/ // componente pois é um pacote

//Importando o componente link react-router-dom
import {Link, useHistory} from 'react-router-dom'

//Importando os style
import './style.css';

//Importando a conexao com o back-end
import api from '../../services/api';

//Importar uma variavel

import logoImg  from '../../assets/logo.svg';// {herosImg} variavel pois é uma foto

export default function NewIncident() {
  const history = useHistory();
  
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue]           = useState('');
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncidents(e){
    //e recebe um evento do submit e preventDefault não deixa o form ser carregado inteiro
    e.preventDefault();
     //  console.log({
    const data = {   
      title,
      description,
      value,
    };
  
    try{
      const response = await api.post('incidents',data,{
        headers:{
          Authorization : ongId,
          }
      });
      //alert(`Id do seu caso: ${response.data.id}`);
      history.push("/profile");
    }catch{
      alert('Erro ao cadastrar o caso, tente novamente');
    }

  }  

  return (
    <div className="new-incident-container">
      <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"></img>
          <h1>Cadastrar Novo Caso</h1>
           <p>Faça seu cadastro, e entre na plataforma e ajude as pessoas a encontrarem os casos da sua ong.</p>
             <Link className="back-link" to="/profile">
                      <FiArrowLeft size={16} color="#E02041" />
                      Voltar para Home</Link>   
      </section>                         
              <form onSubmit={handleNewIncidents}>
                  <input type="text" 
                  value={title}
                  onChange={e =>setTitle(e.target.value)}                    
                  placeholder="Titulo do Caso"></input>
                  
                  <textarea 
                  value={description}
                  onChange={e =>setDescription(e.target.value)}                    
                  placeholder="Descricao"></textarea>
                 
                  <input type="text" 
                  value={value}
                  onChange={e =>setValue(e.target.value)}                    
                  placeholder="Valor em Reais"></input>
                 
                  <button className="button" type="submit">Cadastrar</button>
                

              </form>

      </div>
    </div>
  );
}
