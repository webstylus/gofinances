import React, { useCallback, useEffect, useState } from 'react'
import { HistoryCard } from '../../components/HistoryCard'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { TransactionCardProps } from '../../components/TransactionCard'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_TRANSACTIONS } from '../../config/database'
import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month
} from './styles'
import { categories } from '../../utils/categories'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loading } from '../../components/Loading'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

interface Props extends TransactionCardProps {}
interface CategoryName {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryName[]>([])
  const theme = useTheme()
  const { user } = useAuth()

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }
  async function loadData() {
    setIsLoading(true)
    const response = await AsyncStorage.getItem(
      `${COLLECTION_TRANSACTIONS}:${user.id}`
    )
    const responseFormatted = response ? JSON.parse(response) : []
    const totalByCategory: CategoryName[] = []

    const expensives = responseFormatted.filter(
      (expensive: Props) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )
    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionCardProps) => {
        return accumulator + Number(expensive.amount)
      },
      0
    )

    categories.forEach((category) => {
      let categorySum = 0
      expensives.forEach((expensive: Props) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })
      if (categorySum > 0) {
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          total: categorySum,
          percent
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData().then()
    }, [selectedDate])
  )

  return (
    <Container>
      <Header>
        <Title>Resumo de saídas</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name={'chevron-left'} />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name={'chevron-right'} />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              y={'total'}
              x={'percent'}
              colorScale={totalByCategories.map((category) => category.color)}
              labelRadius={100}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}
