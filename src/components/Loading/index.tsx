import React from 'react'
import { LoadContainer } from './styles'

import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

export function Loading() {
  const theme = useTheme()
  return (
    <LoadContainer>
      <ActivityIndicator color={theme.colors.primary} size={34} />
    </LoadContainer>
  )
}
