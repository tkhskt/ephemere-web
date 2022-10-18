import {Track} from 'types'
import React, {useContext} from "react";
import {disc1, disc2} from "./tracks";

export interface TrackState {
  disc1Tracks: Track[],
  disc2Tracks: Track[],
}

const initialState = {
  disc1Tracks: disc1,
  disc2Tracks: disc2,
}

type TrackContextType = {
  disc1Tracks: Track[],
  disc2Tracks: Track[],
}

export const TrackContext = React.createContext<TrackContextType>({
  disc1Tracks: initialState.disc1Tracks,
  disc2Tracks: initialState.disc2Tracks,
})

export const useTrackContext = (): TrackContextType =>
  useContext<TrackContextType>(TrackContext)

interface TrackContextProviderProps {
  children?: React.ReactNode
}

export const TrackContextProvider = (
  {
    children,
  }: TrackContextProviderProps
) => {

  return (
    <TrackContext.Provider value={
      {
        disc1Tracks: initialState.disc1Tracks,
        disc2Tracks: initialState.disc2Tracks
      }
    }>
      {children}
    </TrackContext.Provider>
  )
}
