import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { FlatList } from 'react-native'
import {
  getBottomSpace,
  getStatusBarHeight
} from 'react-native-iphone-x-helper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { BorderlessButton } from 'react-native-gesture-handler'
import { DataListProps } from '.'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  flex-direction: row;

  align-items: flex-start;
`
export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(getStatusBarHeight())}px;
`
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`
export const User = styled.View`
  margin-left: ${RFValue(17)}px;
`
export const UserGreeting = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`
export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;
`
export const TransactionsList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``

export const LogoutButton = styled(BorderlessButton)``
export const SubHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TrashButton = styled(BorderlessButton)``
export const TrashIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`
