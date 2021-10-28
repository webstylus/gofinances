import React, { useState } from 'react'

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'

import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Form/InputForm'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionsTypes
} from './styles'
import { COLLECTION_TRANSACTIONS } from '../../config/database'
import { useAuth } from '../../hooks/auth'

interface FormData {
  name: string
  amount: string
}

interface NavigationProps {
  navigate: (screen: string) => void
}

export function Register() {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationProps>()
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'list'
  })
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number()
      .typeError('Informe um valor numérico')
      .positive('O Valor não pode ser negativo')
      .required('O valor obrigatório')
  })
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Seleção obrigatória', 'Selecione o tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Seleção obrigatória', 'Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    try {
      const data = await AsyncStorage.getItem(
        `${COLLECTION_TRANSACTIONS}:${user.id}`
      )
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [...currentData, newTransaction]

      await AsyncStorage.setItem(
        `${COLLECTION_TRANSACTIONS}:${user.id}`,
        JSON.stringify(dataFormatted)
      )

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: 'list'
      })
      navigation.navigate('Listagem')
    } catch (e) {
      console.log(e)
      Alert.alert('Falha!', 'Não foi possível registrar as informações')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name={'name'}
              placeholder={'Nome'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name={'amount'}
              placeholder={'Preço'}
              keyboardType={'numeric'}
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title={'Entrada'}
                type={'up'}
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title={'Saída'}
                type={'down'}
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              testID={'category-button'}
              icon={category.icon}
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
            />
          </Fields>

          <Button title={'Enviar'} onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal testID={'modal-category'} visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
