import React, {useContext, useReducer} from "react";

export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_IS_BACKGROUND_LOADED = 'SET_IS_BACKGROUND_LOADED'

export interface PageState {
  isMobile: boolean,
  backgroundLoaded: boolean
}

const initialState = {
  isMobile: false,
  backgroundLoaded: false
}

type PageReducerAction =
  | {
  type: 'SET_IS_MOBILE'
  payload: boolean
} | {
  type: 'SET_IS_BACKGROUND_LOADED'
  payload: boolean
}

const setIsMobile = (isMobile: boolean, state: PageState) => {
  return {
    ...state,
    isMobile: isMobile
  }
}

const setIsBackgroundLoaded = (isLoaded: boolean, state: PageState) => {
  return {
    ...state,
    backgroundLoaded: isLoaded
  }
}

export const pageReducer: React.Reducer<PageState, PageReducerAction> = (
  state: PageState,
  action: PageReducerAction,
) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return setIsMobile(action.payload, state)
    case SET_IS_BACKGROUND_LOADED:
      return setIsBackgroundLoaded(action.payload, state)
    default:
      return state
  }
}

type PageContextType = {
  pageState: PageState,
  setIsMobile: (isMobile: boolean) => void,
  setIsBackgroundLoaded: (isLoaded: boolean) => void,
}

export const PageContext = React.createContext<PageContextType>({
  pageState: initialState,
  setIsMobile: (isMobile: boolean) => {
  },
  setIsBackgroundLoaded: (isLoaded: boolean) => {
  },
})

export const usePageContext = (): PageContextType =>
  useContext<PageContextType>(PageContext)

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

  const setIsBackgroundLoaded = (isLoaded: boolean) => {
    dispatch({type: SET_IS_BACKGROUND_LOADED, payload: isLoaded})
  }

  return (
    <PageContext.Provider value={
      {
        pageState: pageState,
        setIsMobile: setIsMobile,
        setIsBackgroundLoaded: setIsBackgroundLoaded,
      }
    }>
      {children}
    </PageContext.Provider>
  )
}
