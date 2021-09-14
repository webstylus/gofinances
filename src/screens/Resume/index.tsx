import React, { useEffect, useState } from 'react'
import { TransactionCardProps } from '../../components/TransactionCard'
import { HistoryCard } from '../../components/HistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_TRANSACTIONS } from '../../config/database'
import { Container, Title, Header, Content } from './styles'
import { categories } from '../../utils/categories'

interface Props extends TransactionCardProps {}
interface CategoryName {
  key: string
  name: string
  total: string
  color: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryName[]>([])
  async function loadData() {
    const response = await AsyncStorage.getItem(COLLECTION_TRANSACTIONS)
    const responseFormatted = response ? JSON.parse(response) : []
    const totalByCategory: CategoryName[] = []

    const expensives = responseFormatted.filter(
      (expensive: Props) => expensive.type === 'positive'
    )
    categories.forEach((category) => {
      let categorySum = 0
      expensives.forEach((expensive: Props) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })
      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          color: category.color
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData().then()
  }, [])
  return (
    <Container>
      <Header>
        <Title>Resume</Title>
      </Header>

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  )
}
