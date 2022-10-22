import React, {createContext, Dispatch, useCallback, useContext, useReducer} from "react";
import {disc1} from "contexts/TrackContext/tracks";

export const SET_IS_OPENED = 'SET_IS_OPENED'
export const SET_CURRENT_TRACK_ID = 'SET_CURRENT_TRACK_ID'

export interface ModalState {
  isOpened: boolean,
  currentTrackId: number,
  currentDisc: Disc
}

export enum Disc {
  Disc1,
  Disc2,
}

const initialState = {
  isOpened: false,
  currentTrackId: 14,
  currentDisc: Disc.Disc1,
}

type ModalReducerAction =
  | {
  type: 'SET_IS_OPENED'
  payload: boolean
}
  | {
  type: 'SET_CURRENT_TRACK_ID'
  payload: number
}

const setIsOpened = (isOpened: boolean, state: ModalState) => {
  return {
    ...state,
    isOpened: isOpened
  }
}

const setCurrentTrackId = (trackId: number, state: ModalState) => {
  const isDisc1 = disc1.find((track) => track.id == trackId) != undefined
  return {
    ...state,
    currentTrackId: trackId,
    currentDisc: isDisc1 ? Disc.Disc1 : Disc.Disc2,
  }
}

export const modalReducer: React.Reducer<ModalState, ModalReducerAction> = (
  state: ModalState,
  action: ModalReducerAction,
) => {
  switch (action.type) {
    case SET_IS_OPENED:
      return setIsOpened(action.payload, state)
    case SET_CURRENT_TRACK_ID:
      return setCurrentTrackId(action.payload, state)
    default:
      return state
  }
}

type ModalContextType = {
  modalState: ModalState,
}

export const ModalContext = React.createContext<ModalContextType>({
  modalState: initialState,
})

const setIsOpenedContext = createContext<Dispatch<boolean>>(
  () => undefined
);

const setCurrentIdContext = createContext<Dispatch<number>>(
  () => undefined
);

export const useModalContext = (): ModalContextType =>
  useContext<ModalContextType>(ModalContext)

export const useIsOpenedContext = () => useContext(setIsOpenedContext)

export const useCurrentIdContext = () => useContext(setCurrentIdContext)

interface ModalContextProviderProps {
  children?: React.ReactNode
}

export const ModalContextProvider = (
  {
    children,
  }: ModalContextProviderProps
) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState)

  const setIsOpened = useCallback((isOpened: boolean) => {
    dispatch({type: SET_IS_OPENED, payload: isOpened})
  }, [])

  const setCurrentTrackId = useCallback((trackId: number) => {
    dispatch({type: SET_CURRENT_TRACK_ID, payload: trackId})
  }, [])

  return (
    <ModalContext.Provider value={
      {
        modalState: modalState,
      }
    }>
      <setIsOpenedContext.Provider value={setIsOpened}>
        <setCurrentIdContext.Provider value={setCurrentTrackId}>
          {children}
        </setCurrentIdContext.Provider>
      </setIsOpenedContext.Provider>
    </ModalContext.Provider>
  )
}
