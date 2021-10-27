import { renderHook } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from './auth'

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })
    result.current.signInWithGoogle()

    expect(result.current.user).toBeTruthy()
  })
})
