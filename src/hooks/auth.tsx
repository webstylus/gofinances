import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env
import * as AuthSession from 'expo-auth-session'
import * as AppleAuthentication from 'expo-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_USER } from '../config/database'

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: UserProps
  userStorageIsLoading: boolean

  signInWithGoogle(): Promise<void>

  signInWithApple(): Promise<void>

  signOut(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [userStorageIsLoading, setUserStorageIsLoading] = useState(true)

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )
        const userInfo = await response.json()
        const name = userInfo.name
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1&bold=true&background=ffffff`
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name,
          photo: userInfo.picture ?? photo
        }
        setUser(userLogged)
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged))
      }
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential) {
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1&bold=true&background=ffffff`
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }

        setUser(userLogged)
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged))
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  async function signOut() {
    setUser({} as UserProps)
    await AsyncStorage.removeItem(COLLECTION_USER)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(COLLECTION_USER)

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as UserProps
        setUser(userLogged)
      }
      setUserStorageIsLoading(false)
    }

    loadUserStorageData().then()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
