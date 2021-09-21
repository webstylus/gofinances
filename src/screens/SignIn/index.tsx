import React, { useContext, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'
import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'
import { Alert, Platform } from 'react-native'
import { Loading } from '../../components/Loading'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (e) {
      console.log(e)
      Alert.alert(
        'Falha de autenticação',
        'Não foi possível conectar com a conta do Google'
      )
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (e) {
      console.log(e)
      Alert.alert(
        'Falha de autenticação',
        'Não foi possível conectar com a conta Apple'
      )
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title={'Entrar com Google'}
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title={'Entrar com Apple'}
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && <Loading />}
      </Footer>
    </Container>
  )
}
