import React from 'react'
import {
  Container,
  Category,
  Icon,
  CategorySelected,
  IconFeather
} from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
  title: string
  icon: string | null
  onPress: () => void
}

export function CategorySelectButton({ title, icon, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <CategorySelected>
        {icon && <IconFeather name={icon} />}
        <Category>{title}</Category>
      </CategorySelected>
      <Icon name={'keyboard-arrow-down'} />
    </Container>
  )
}
