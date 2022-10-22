import type {Track} from 'types'
import TrackList from "components/molecules/TrackList";
import {css, SerializedStyles} from "@emotion/react";
import {Colors} from "styles/theme";
import {Adobe} from "styles/font";
import {clw} from "util/size";
import {sp} from "styles/mediaQuert";
import {spWidth} from "values";

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

  ${
    sp(css`
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: ${clw(39, spWidth)} ${clw(24, spWidth)};
    `)
  }
`

const TitleContainer = css`
  position: relative;
  display: inline-block;
  ${
    sp(css`
      align-self: flex-start;
      max-width: 400px;
    `)
  }
`

const TitleStyle = css`
  position: relative;
  font-size: 1.625rem;
  font-weight: bold;
  z-index: 1;
  line-height: 1em;
  letter-spacing: 0.064em;
  ${Adobe}
  ${
    sp(css`
      font-size: 1.125em;
    `)
  }
`

const TrackListStyle = css`
  margin-top: ${clw(65)};
  ${
    sp(css`
      max-width: 400px;
      margin-top: 47px;
    `)
  }
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
        <div>
          <p css={TitleStyle}>{title}</p>
          <span css={TitleBackground}/>
        </div>
      </div>
      <TrackList tracks={tracks} color={color} style={TrackListStyle}/>
    </div>
  )
}

export default TracksCard
