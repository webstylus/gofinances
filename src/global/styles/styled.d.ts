import 'styled-components'
import theme from './theme'

/**
 * Reescrever tema do styled components usando inferência de dados
 * atribuindo um novo ThemeType como props usando o novo theme criando.
 * Assim ao usar os temas na construção dos estilos com styled-components
 */
declare module 'styled-components' {
  type ThemeType = typeof theme

  /**
   * Exporta o theme default do styled component
   * e agrega a estendendo theme que foi criado para a aplicação
   */
  export interface DefaultTheme extends ThemeType {}
}
