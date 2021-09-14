import React from 'react'
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryName,
  Date,
  Icon
} from './styles'
import { categories } from '../../utils/categories'

export interface CategoryProps {
  key: string
  name: string
  icon: string
  color: string
}

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter(
    (item: CategoryProps) => item.key === data.category
  )

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
