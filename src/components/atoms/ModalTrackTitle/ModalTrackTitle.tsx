import {css} from "@emotion/react";
import {clw, font} from "util/size";
import {Track} from "types";
import {sp} from "styles/mediaQuert";

const ModalTrackTitleStyle = css`
  display: inline;
  ${
    sp(css`
      display: inline-flex;
      flex-direction: column;
    `)
  }
`

const TrackNameWrapper = css`
  position: relative;
  display: block;
  ${
    sp(css`
      display: inline;
      flex-direction: column;
    `)
  }
`

const TrackName = css`
  position: relative;
  font-size: ${font(36)};
  line-height: 1em;
  z-index: 2;
  ${
    sp(css`
      font-size: 28px;
      display: inline;
    `)
  }
`

const ArtistName = css`
  font-size: ${font(14)};
  line-height: 1em;
  text-align: right;
  margin-top: ${clw(8)};
  ${
    sp(css`
      display: inline;
    `)
  }
`

const TitleBackground = css`
  position: absolute;
  width: 90%;
  height: 40%;
  left: calc(${clw(20)} + 10%);
  bottom: -10%;
`

interface ModalTrackTitleProps {
  track: Track
  titleColor: string
}

const ModalTrackTitle = (prop: ModalTrackTitleProps) => {

  const {track, titleColor} = prop

  return (
    <div css={ModalTrackTitleStyle}>
      <div css={TrackNameWrapper}>
        <p css={TrackName}>{track.name} {track.featuredArtist && `feat. ${track.featuredArtist.name}`}</p>
        <span
          css={[TitleBackground, css`background: ${titleColor}`]}/>
      </div>
      <p css={ArtistName}>by {track.artist.name}</p>
    </div>
  )
}

export default ModalTrackTitle
