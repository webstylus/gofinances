import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Dashboard } from './src/screens/Dashbaord'

import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading/build/AppLoadingNativeWrapper'
import { StatusBar } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#5636D3'} />
      <Dashboard />
    </ThemeProvider>
  )
}
