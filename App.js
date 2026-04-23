import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import Calculos from './screens/TelaCalculos'

export const TravelContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [travelData, setTravelData] = useState(null);

  return (
    <TravelContext.Provider value={{ travelData, setTravelData }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Tela 1: Entrada de dados */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'RotaLeve - Planejador de Viagens' }}
          />

          {/* Tela 2: Calculos */}
          <Stack.Screen
          name='TelaCalculos'
          component={Calculos}
          options={{ title: 'Resultado dos valores inclusos' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TravelContext.Provider>
  );
}