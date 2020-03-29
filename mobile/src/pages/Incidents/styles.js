import React from 'react';

import { StyleSheet } from 'react-native';

import Constants from 'expo-constants' ; /*instala o pacote expo install expo-constants   */

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText:{
      fontSize: 15,
      color: '#737380'
    },
    headerTextBold:{
        fontWeight: 'bold'
    },
    title:{
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },
   
    description:{
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    incidentsList:{
        marginTop: 32,
    }   ,
   
    incidents:{
       padding: 24,
       borderRadius: 8,
       backgroundColor: '#FFF',
       marginBottom: 10

    },

    incidentProperty:{
        fontSize: 14,
        color: '#41414D',
        fontWeight: 'bold'
 
     },  

     incidentValue:{
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
 
     },

     detailsButon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        
     },

     detailsButonText:{
         color: "#E02041",
         fontSize: 15,
         fontWeight: "bold"
     }

});
/*

paddingTop: Constants.statusBarHeight + 20, tamanho da statusBar e desce o campo

*/