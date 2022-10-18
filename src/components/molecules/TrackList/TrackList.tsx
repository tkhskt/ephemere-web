import {Track} from "types";
import {css, SerializedStyles} from "@emotion/react";
import {clw} from "util/size";
import {useHover} from "hooks/hover";
import TrackListItem from "../TrackListItem";

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

const TrackList = (props: TrackListProps) => {

  const {tracks, style} = props
  const [hoverRef, isHover] = useHover()
  return (
    <div css={[style, Container]}>
      <table css={Table}>
        <tbody>
        {tracks.map((track, index) => (
          <TrackListItem number={index + 1} track={track} key={track.id}/>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackList
