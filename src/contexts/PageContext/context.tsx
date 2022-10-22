import React, {createContext, Dispatch, useCallback, useContext, useReducer} from "react";

export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_IS_BACKGROUND_LOADED = 'SET_IS_BACKGROUND_LOADED'
export const SET_ON_TRACK = 'SET_ON_TRACK'
export const SET_ON_INFO_CREDITS = 'SET_ON_INFO_CREDITS'

export interface PageState {
  isMobile: boolean,
  backgroundLoaded: boolean,
  onTrack: boolean,
  onInfoCredits: boolean
}

const initialState = {
  isMobile: false,
  backgroundLoaded: false,
  onTrack: false,
  onInfoCredits: false
}

type PageReducerAction =
  | {
  type: 'SET_IS_MOBILE'
  payload: boolean
} | {
  type: 'SET_IS_BACKGROUND_LOADED'
  payload: boolean
} | {
  type: 'SET_ON_TRACK'
  payload: boolean
} | {
  type: 'SET_ON_INFO_CREDITS'
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

const setOnTrack = (onTrack: boolean, state: PageState) => {
  return {
    ...state,
    onTrack: onTrack
  }
}

const setOnInfoCredits = (onInfoCredits: boolean, state: PageState) => {
  return {
    ...state,
    onInfoCredits: onInfoCredits
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
    case SET_ON_TRACK:
      return setOnTrack(action.payload, state)
    case SET_ON_INFO_CREDITS:
      return setOnInfoCredits(action.payload, state)
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

export const setOnTracksContext = createContext<Dispatch<boolean>>(
  () => undefined
)

export const setOnInfoCreditsContext = createContext<Dispatch<boolean>>(
  () => undefined
)

export const usePageContext = (): PageContextType =>
  useContext<PageContextType>(PageContext)

export const useOnTracksContextContext = () => useContext(setOnTracksContext)

export const useOnInfoCreditsContext= () => useContext(setOnInfoCreditsContext)

interface PageContextProviderProps {
  children?: React.ReactNode
}

export const PageContextProvider = (
  {
    children,
  }: PageContextProviderProps
) => {
  const [pageState, dispatch] = useReducer(pageReducer, initialState)

  const setIsMobile = useCallback((isMobile: boolean) => {
    dispatch({type: SET_IS_MOBILE, payload: isMobile})
  }, [])

  const setIsBackgroundLoaded = useCallback((isLoaded: boolean) => {
    dispatch({type: SET_IS_BACKGROUND_LOADED, payload: isLoaded})
  }, [])

  const setOnTrack = useCallback((onTrack: boolean) => {
    dispatch({type: SET_ON_TRACK, payload: onTrack})
  }, [])

  const setOnInfoCredits = useCallback((onInfoCredits: boolean) => {
    dispatch({type: SET_ON_INFO_CREDITS, payload: onInfoCredits})
  }, [])

  return (
    <PageContext.Provider value={
      {
        pageState: pageState,
        setIsMobile: setIsMobile,
        setIsBackgroundLoaded: setIsBackgroundLoaded,
      }
    }>
      <setOnTracksContext.Provider
        value={setOnTrack}
      >
        <setOnInfoCreditsContext.Provider
          value={setOnInfoCredits}
        >
          {children}
        </setOnInfoCreditsContext.Provider>
      </setOnTracksContext.Provider>
    </PageContext.Provider>
  )
}
