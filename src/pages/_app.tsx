import '@/styles/globals.css'
import { CoffeeStore } from '@/types'
import type { AppProps } from 'next/app'
import React, { createContext, useReducer } from 'react'

type StoreContextType = {
  state: {
    latLong: string
    coffeeStores: CoffeeStore[]
  }
  dsipatch?: any
  // setLatLong: () => void
  // setCoffeeStores: () => void
}
type StoreState = {
  latLong: string
  coffeeStores: CoffeeStore[]
}

enum ACTION_TYPES {
  SET_LAT_LONG = 'SET_LAT_LONG',
  SET_COFFEE_STORES = 'SET_COFFEE_STORES',
}

type StoreAction = {
  type: ACTION_TYPES
  payload: any
}

const storeReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload.latLong }
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, latLong: action.payload.coffeeStores }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StoreContext = createContext<StoreContextType>({
  state: {
    latLong: '',
    coffeeStores: [],
  },
})

const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const initialState = {
    latLong: '',
    coffeeStores: [] as CoffeeStore[],
  }
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
