import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface ContainerProps {
  color: string
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  padding: ${RFValue(13)}px ${RFValue(24)}px;
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  margin-bottom: 8px;
`
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`
export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`
