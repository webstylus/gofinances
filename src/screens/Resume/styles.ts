import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`
export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
`
export const MonthSelectButton = styled(BorderlessButton)``
export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
`
export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`
