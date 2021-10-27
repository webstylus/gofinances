import React from 'react'
import { Container } from './styles'
import { TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  active?: boolean
}

export function Input({ active = false, ...rest }: Props) {
  return <Container active={active} {...rest} />
}
