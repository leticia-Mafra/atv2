import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import CadastrarListaScreen from './src/CadastrarListaScreen';
import CadastrarItemScreen from './src/CadastrarItemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastrar Lista" component={CadastrarListaScreen} />
        <Stack.Screen name="Cadastrar Item" component={CadastrarItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
