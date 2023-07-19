import { CoffeeStore } from '@/types'

import React, { createContext, useReducer } from 'react'

type StoreState = {
  latLong: string
  coffeeStores: CoffeeStore[]
}

type StoreContextType = {
  state: StoreState
  dispatch?: any
}

export enum ACTION_TYPES {
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
      return { ...state, coffeeStores: action.payload.coffeeStores }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const StoreContext = createContext<StoreContextType>({
  state: {
    latLong: '',
    coffeeStores: [],
  },
})

const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const initialState = {
    latLong: '',
    coffeeStores: [],
  }
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
