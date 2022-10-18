import React, {useReducer} from "react";

export const SET_IS_MOBILE = 'SET_IS_MOBILE'

export interface PageState {
  isMobile: boolean,
}

const initialState = {
  isMobile: false,
}

type PageReducerAction =
  | {
  type: 'SET_IS_MOBILE'
  payload: boolean
}

const setIsMobile = (isMobile: boolean, state: PageState) => {
  return {
    ...state,
    isMobile: isMobile
  }
}

export const pageReducer: React.Reducer<PageState, PageReducerAction> = (
  state: PageState,
  action: PageReducerAction,
) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return setIsMobile(action.payload, state)
    default:
      return state
  }
}

type PageContextType = {
  pageState: PageState,
  setIsMobile: (isMobile: boolean) => void,
}

export const PageContext = React.createContext<PageContextType>({
  pageState: initialState,
  setIsMobile: (isMobile: boolean) => {
  },
})

interface PageContextProviderProps {
  children?: React.ReactNode
}

export const PageContextProvider = (
  {
    children,
  }: PageContextProviderProps
) => {
  const [pageState, dispatch] = useReducer(pageReducer, initialState)

  const setIsMobile = (isMobile: boolean) => {
    dispatch({type: SET_IS_MOBILE, payload: isMobile})
  }

  return (
    <PageContext.Provider value={
      {
        pageState: pageState,
        setIsMobile: setIsMobile,
      }
    }>
      {children}
    </PageContext.Provider>
  )
}
