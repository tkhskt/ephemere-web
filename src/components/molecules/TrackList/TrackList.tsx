import {Track} from "types";
import {css, SerializedStyles} from "@emotion/react";
import {clw} from "util/size";
import TrackListItem from "../TrackListItem";
import {memo, useCallback, useMemo} from "react";
import {useModalContext} from "contexts/ModalContext/context";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";

interface TrackListProps {
  tracks: Track[],
  color: string,
  style: SerializedStyles,
}

const Container = css`
    //width: ${clw(400)};
`

const Table = css`
  vertical-align: middle;
`

const TrackList = memo((props: TrackListProps) => {

  const {tracks, color, style} = props

  const {setIsOpened, setCurrentTrackId} = useModalContext()

  const {setIsHoverOn} = useMouseStalkerContext()

  const onClickTrack = useCallback((track: Track) => {
    if (track.lyrics) {
      setCurrentTrackId(track.id)
      setIsOpened(true)
    }
  }, [setCurrentTrackId, setIsOpened])

  const onHoverLink = useCallback(() => {
    setIsHoverOn(HoveredElement.Link)
  }, [setIsHoverOn])

  const onHoverTrack = useCallback(() => {
    setIsHoverOn(HoveredElement.Track)
  }, [setIsHoverOn])

  const onHoverOthers = useCallback(() => {
    setIsHoverOn(HoveredElement.Others)
  }, [setIsHoverOn])

  return (
    <div css={[style, Container]}>
      <table css={Table}>
        <tbody>
        {tracks.map((track, index) => (
          <TrackListItem
            number={index + 1}
            track={track}
            key={track.id}
            color={color}
            onClickTrack={onClickTrack}
            onHoverTrack={onHoverTrack}
            onHoverLink={onHoverLink}
            onHoverOthers={onHoverOthers}
          />
        ))}
        </tbody>
      </table>
    </div>
  )
})

TrackList.displayName = "TrackList"

export default TrackList
