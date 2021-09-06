import React from 'react'
import {
  Container,
  Category,
  Icon,
  CategorySelected,
  IconFeather
} from './styles'

interface Props {
  title: string
  icon: string | null
  onPress: () => void
}

export function CategorySelectButton({ title, icon, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <CategorySelected>
        {icon && <IconFeather name={icon} />}
        <Category>{title}</Category>
      </CategorySelected>
      <Icon name={'keyboard-arrow-down'} />
    </Container>
  )
}
