import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashbaord'
import { Register } from '../screens/Register'
import { useTheme } from 'styled-components'
import { Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Resume } from '../screens/Resume'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.regular
        }
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name={'format-list-bulleted'}
              size={size}
              color={color}
            />
          )
        }}
        name={'Listagem'}
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={'attach-money'} size={size} color={color} />
          )
        }}
        name={'Cadastrar'}
        component={Register}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={'pie-chart'} size={size} color={color} />
          )
        }}
        name={'Resumo'}
        component={Resume}
      />
    </Navigator>
  )
}
