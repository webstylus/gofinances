import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { StatusBar } from 'react-native'

import theme from './src/global/styles/theme'
import { AuthProvider, useAuth } from './src/hooks/auth'
import { Routes } from './src/routes'
import AppLoading from 'expo-app-loading/build/AppLoadingNativeWrapper'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  const { userStorageIsLoading } = useAuth()

  if (!fontsLoaded || userStorageIsLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={theme.colors.primary}
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
