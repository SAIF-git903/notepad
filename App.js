import React from 'react'
import Home from './components/Home'
import ModalInput from './components/ModalInput'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
}

function App() {
  return (
    <NavigationContainer theme={myTheme} >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Modal' component={ModalInput} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App