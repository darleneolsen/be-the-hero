import React from 'react';

import { Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

//Import icons
import { Feather } from '@expo/vector-icons';

//Import o composer do email
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { FaceAnchorProp } from 'expo/build/AR';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const msg = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL' }).format(incident.value)}`;
 
    function navigateToIncidents(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['darlene_santos_goncalves@hotmail.com'],
            body: msg
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${msg}`)
     }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity style={styles.detailsButon}
                                     onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={16} color="#E02041" />
                    </TouchableOpacity>   
            </View>
            <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>     
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}  </Text>   

                    <Text style={styles.incidentProperty}>Caso: {incident.title}</Text>     
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>     
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>   
                               
                </View> 
                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                    <Text style={styles.heroDescription}>Entre em contato</Text>
                    <View style={styles.actions}>
                   
                        <TouchableOpacity style={styles.action}
                                        onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>                      
                       
                        </TouchableOpacity>       

                        <TouchableOpacity style={styles.action}
                                        onPress={sendEmail}>
                        <Text style={styles.actionText}>Email</Text>                      
                      
                        </TouchableOpacity>                                 
                    </View>
                </View>
                    
        </View>


    );

}