import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashbaord'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name={'Listagem'} component={Dashboard} />
      <Screen name={'Cadastrar'} component={Register} />
      {/*<Screen name={'Resumo'} component={Resumo} />*/}
    </Navigator>
  )
}
