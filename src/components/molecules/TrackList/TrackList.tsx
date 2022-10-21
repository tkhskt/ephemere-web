import {Track} from "types";
import {css, SerializedStyles} from "@emotion/react";
import {clw} from "util/size";
import TrackListItem from "../TrackListItem";
import {memo, useCallback} from "react";
import {useModalContext} from "contexts/ModalContext/context";

interface TrackListProps {
  tracks: Track[],
  style: SerializedStyles,
}

const Container = css`
    //width: ${clw(400)};
`

const Table = css`
  vertical-align: middle;
`

const TrackList = memo((props: TrackListProps) => {

  const {tracks, style} = props

  const {setIsOpened, setCurrentTrackId} = useModalContext()

  const onClickTrack = useCallback((track: Track) => {
    if (track.lyrics) {
      setCurrentTrackId(track.id)
      setIsOpened(true)
    }
  }, [])

  return (
    <div css={[style, Container]}>
      <table css={Table}>
        <tbody>
        {tracks.map((track, index) => (
          <TrackListItem number={index + 1} track={track} key={track.id} onClickTrack={onClickTrack}/>
        ))}
        </tbody>
      </table>
    </div>
  )
})

TrackList.displayName = "TrackList"

export default TrackList
