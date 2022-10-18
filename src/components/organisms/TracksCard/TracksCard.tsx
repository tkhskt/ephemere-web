import type {Track} from 'types'
import TrackList from "components/molecules/TrackList";
import {css, SerializedStyles} from "@emotion/react";
import {Colors} from "styles/theme";
import {Adobe} from "styles/font";
import {clw} from "util/size";

interface TracksCardProps {
  title: string
  color: string
  tracks: Track[]
  style?: SerializedStyles,
}

const Card = css`
  display: inline-block;
  position: relative;
  background: ${Colors.Black};
  padding: ${clw(42)} ${clw(64)};
    // width: ${clw(877)};
  width: 100%;
`

const TitleContainer = css`
  position: relative;
  display: inline-block;
`

const TitleStyle = css`
  position: relative;
  font-size: 1.625rem;
  font-weight: bold;
  z-index: 1;
  line-height: 1em;
  letter-spacing: 0.064em;
  ${Adobe}
`

const TrackListStyle = css`
  margin-top: ${clw(65)};
`

const TracksCard = (props: TracksCardProps) => {
  const {title, color, tracks, style} = props

  const TitleBackground = css`
    position: absolute;
    width: 105%;
    height: 55%;
    left: 15px;
    bottom: -10%;
    content: '';
    background: ${color};
  `

  return (
    <div css={[Card, style]}>
      <div css={TitleContainer}>
        <p css={TitleStyle}>{title}</p>
        <span css={TitleBackground}/>
      </div>
      <TrackList tracks={tracks} style={TrackListStyle}/>
    </div>
  )
}

export default TracksCard
