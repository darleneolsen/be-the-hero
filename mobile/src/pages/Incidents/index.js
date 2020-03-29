import React, {useEffect, useState} from 'react';

import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import {useNavigation} from '@react-navigation/native';

//Import api de conexao com o back

import api from '../../services/api';

//Import icons
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { FaceAnchorProp } from 'expo/build/AR';



export default function Incidents(){
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]); //inicia com um array vazio
    const [totalCaso, setTotalCaso] = useState(0); //inicia com um array vazio
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(totalCaso > 0  && incidents.length == totalCaso){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });
       // setIncidents(response.data);
       //anexar dois vetores
       setIncidents([... incidents, ... response.data]);
        setTotalCaso(response.headers['total']);
        setPage(page+1);
        setLoading(false);
    }   

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {totalCaso} Casos</Text>
                </Text> 
            </View>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo, e salve o dia:</Text>
            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached ={loadIncidents}
                onEndReachedThreshold = {0.2}
                renderItem={({item: incident})=>(
                    <View style={styles.incidents}>
                    <Text style={styles.incidentProperty}>ONG:</Text>     
                <Text style={styles.incidentValue}>{incident.name}</Text>   

                    <Text style={styles.incidentProperty}>Caso: {incident.title}</Text>     
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>     
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>   
                    <TouchableOpacity style={styles.detailsButon}
                                     onPress={()=>navigateToDetail(incident)}>
                     <Text style={styles.detailsButonText}>Ver mais detalhes</Text>                      
                    <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>                             
                </View> 

                )

                }
            />
                    
        </View>


    );

}