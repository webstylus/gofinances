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
  TrashIcon
} from './styles'

import { Loading } from '../../components/Loading'
import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard'
import { Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_TRANSACTIONS } from '../../config/database'
import { useAuth } from '../../hooks/auth'

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
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  )
  const { user, signOut } = useAuth()

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection.filter(
      (transaction) => transaction.type === type
    )

    if (collectionFiltered.length === 0) return 0

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    )

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`
  }
  async function loadTransactions() {
    const response = await AsyncStorage.getItem(
      `${COLLECTION_TRANSACTIONS}:${user.id}`
    )
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
    const totalInterval =
      lastTransactionExpensive === 0
        ? 'Não há transações'
        : `01 à ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? 'Não há transações'
            : `Última entrada dia ${lastTransactionEntries}`
      },

      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? 'Não há transações'
            : `Última saída dia ${lastTransactionExpensive}`
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
            AsyncStorage.removeItem(`${COLLECTION_TRANSACTIONS}:${user.id}`)
            loadTransactions().then((r) => {})
          }
        }
      ]
    )
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions().then((r) => {})
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
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
