import React, {useContext, useReducer} from "react";

export const SET_IS_HOVER_ON = 'SET_IS_HOVER_ON'

export const HoveredElement = {
  Top: 1,
  Link: 2,
  Track: 3,
  Others: 4,
} as const

type HoveredElement = typeof HoveredElement[keyof typeof HoveredElement];

export interface MouseStalkerState {
  hoveredElement: HoveredElement
}

const initialState = {
  hoveredElement: HoveredElement.Others
}

type MouseStalkerAction =
  | {
  type: 'SET_IS_HOVER_ON'
  payload: HoveredElement
}

const setIsHoverOn = (hoveredElement: HoveredElement, state: MouseStalkerState) => {
  return {
    hoveredElement,
  }
}

export const mouseStalkerReducer: React.Reducer<MouseStalkerState, MouseStalkerAction> = (
  state: MouseStalkerState,
  action: MouseStalkerAction,
) => {
  switch (action.type) {
    case SET_IS_HOVER_ON:
      return setIsHoverOn(action.payload, state)
    default:
      return state
  }
}

type MouseStalkerContextType = {
  mouseStalkerState: MouseStalkerState,
  setIsHoverOn: (hoverOn: HoveredElement) => void,
}

export const MouseStalkerContext = React.createContext<MouseStalkerContextType>({
  mouseStalkerState: initialState,
  setIsHoverOn: (hoverOn: HoveredElement) => {
  },
})

export const useMouseStalkerContext = (): MouseStalkerContextType =>
  useContext<MouseStalkerContextType>(MouseStalkerContext)

interface MouseStalkerContextProviderProps {
  children?: React.ReactNode
}

export const MouseStalkerContextProvider = (
  {
    children,
  }: MouseStalkerContextProviderProps
) => {
  const [mouseStalkerState, dispatch] = useReducer(mouseStalkerReducer, initialState)

  const setIsHoverOn = (hoverOn: HoveredElement) => {
    dispatch({type: SET_IS_HOVER_ON, payload: hoverOn})
  }

  return (
    <MouseStalkerContext.Provider value={
      {
        mouseStalkerState: mouseStalkerState,
        setIsHoverOn: setIsHoverOn
      }
    }>
      {children}
    </MouseStalkerContext.Provider>
  )
}
