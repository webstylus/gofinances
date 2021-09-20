import React from 'react'
import { Title, Button, ImageContainer } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

interface Props extends RectButtonProps {
  title: string
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  )
}
