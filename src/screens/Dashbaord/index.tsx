import React, { useCallback, useEffect, useState } from 'react'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { useFocusEffect } from '@react-navigation/native'
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  SubHeader,
  TrashButton,
  TrashIcon,
  LoadContainer
} from './styles'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_TRANSACTIONS } from '../../config/database'
import { Alert, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighLightProps {
  amount: string
  lastTransaction: string
}

interface HighLightData {
  entries: HighLightProps
  expensive: HighLightProps
  total: HighLightProps
}

export function Dashboard() {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  )

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    )

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`
  }
  async function loadTransactions() {
    const response = await AsyncStorage.getItem(COLLECTION_TRANSACTIONS)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      }
    )

    setData(transactionFormatted)

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive'
    )
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      'negative'
    )
    const totalInterval = `${lastTransactionEntries} à ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },

      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  async function handleClearTransactions() {
    return Alert.alert(
      'Limpar lista',
      'Tem certeza que você deseja limpar todas as transações da lista?',
      [
        {
          style: 'cancel',
          text: 'Não'
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            AsyncStorage.removeItem(COLLECTION_TRANSACTIONS)
            loadTransactions().then((r) => {})
          }
        }
      ]
    )
  }

  useEffect(() => {
    loadTransactions().then((r) => {})
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions().then((r) => {})
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size={50} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/61922352?v=4'
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Rafael</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name={'power'} />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type={'up'}
              title={'Entradas'}
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
            />
            <HighlightCard
              type={'down'}
              title={'Saídas'}
              amount={highLightData.expensive.amount}
              lastTransaction={highLightData.expensive.lastTransaction}
            />
            <HighlightCard
              type={'total'}
              title={'Total'}
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <SubHeader>
              <Title>Listagem</Title>
              {data.length > 0 && (
                <TrashButton onPress={handleClearTransactions}>
                  <TrashIcon name={'trash'} />
                </TrashButton>
              )}
            </SubHeader>

            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
