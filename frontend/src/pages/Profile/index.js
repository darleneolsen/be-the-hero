import React, { useState, useEffect} from 'react';
//useEffect serve para disparar uma funcao assim que a pagina é carregada
//Importando os icons
import {FiPower, FiTrash2} from 'react-icons/fi'; //https://feathericons.com/ // componente pois é um pacote

//Importando o componente link react-router-dom
import {Link, useHistory} from 'react-router-dom'

//Importando os style
import './style.css';

//Importando a conexao com o back-end
import api from '../../services/api';

//Importar uma variavel

import logoImg  from '../../assets/logo.svg';// {herosImg} variavel pois é uma foto

export default function Profile() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]); //comeca com um array vazio

   useEffect(() => {
    api.get('profile',{
      headers:{
        Authorization : ongId,       
      }
    }).then(response => {
      setIncidents(response.data);

    })  
   },[ongId]);
   //[ongId] se mudar ele chama o effect novamente

    //function logout
    function handleLogout(){
      //Limpa os storage
      localStorage.clear();
      history.push("/");
    }

   //deleta
   async function handleDeleteIncidents(id){
    
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      //varre o array de incidents e seta novamente no estado
      setIncidents(incidents.filter(caso => caso.id !== id));

    }catch{
      alert("Erro ao deletar, tente novamente");
    }


   }

  return (
    <div className="profile-container">
      <header>      
        <img src={logoImg} alt="Be The Hero"></img>

        <span>Bem Vinda, {ongName}</span>
        <Link className="button" to="/incidents/new" >Cadastrar Novo Caso</Link>
        <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(dados =>(
         <li key={dados.id}>
            <strong>Caso:</strong>
            <p>{dados.title}</p>
          
            <strong>Descrição:</strong>
            <p>{dados.description}</p>    

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL' }).format(dados.value)}
              </p>    
              
            <button onClick={()=>handleDeleteIncidents(dados.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>

          </li>
        ))}


                          
      </ul>

        
                  
    </div>
  );
}
/*
//Ele esta chamando a funcao direto e passando o retorno para o onclick
//isso quando passa parametro
quandon não passa parametro pode ser assim:
 onClick={handleDeleteIncidents} 
<button onClick={handleDeleteIncidents(dados.id)} type="button">
 <FiTrash2 size={20} color="#a8a8b3" /></button>


*/