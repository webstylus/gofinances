import styled from 'styled-components/native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  width: 100%;
  padding: 16px;
`
export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`
export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`
export const IconFeather = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
  margin-right: 10px;
`

export const CategorySelected = styled.View`
  align-items: center;
  flex-direction: row;
`
