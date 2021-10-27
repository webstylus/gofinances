import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

export function Profile() {
  return (
    <View>
      <Text testID={'text-title'}>Perfil</Text>

      <TextInput
        testID={'input-name'}
        placeholder={'Nome'}
        autoCorrect={false}
        value={'Rafael'}
      />
      <TextInput
        testID={'input-surname'}
        placeholder={'Sobrenome'}
        value={'Pacífico'}
      />

      <Button title={'Salvar'} onPress={() => {}} />
    </View>
  )
}
