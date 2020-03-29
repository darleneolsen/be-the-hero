import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

//importa os componentes
 import Incidents from './pages/Incidents';
 import Detail from './pages/Details';


export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
  }

  //<AppStack.Navigator screenOptions={{headerShown:false}}> o nome do cabeçalho não será o que foi definido no name
  // <AppStack.Screen name="Incidents" component={Incidents} /> //CABECALHO NOME
  