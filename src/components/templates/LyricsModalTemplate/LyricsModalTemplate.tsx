import {Track} from "types";
import {css, SerializedStyles} from "@emotion/react";
import {clw, font} from "util/size";
import {Serif} from "styles/font";
import disc1BgPc from '/public/img/modal_disc1_bg_pc.png'
import disc2BgPc from '/public/img/modal_disc2_bg_pc.png'
import {Colors} from "styles/theme";
import CloseButton from "components/atoms/CloseButton";
import Image from "next/image";
import {useState} from "react";

export const Disc = {
  Disc1: {
    color: Colors.Blue,
    imagePc: disc1BgPc,
  },
  Disc2: {
    color: Colors.Yellow,
    imagePc: disc2BgPc,
  },
} as const

type Disc = typeof Disc[keyof typeof Disc];

interface LyricsModalTemplateProps {
  disc: Disc,
  track: Track,
  style: SerializedStyles,
}

const Section = css`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 ${clw(119)};
  background: ${Colors.Black};
  ${Serif}
`

const BackgroundImage = (isLoaded: boolean) => {
  const opacity = isLoaded ? 1 : 0
  return css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${opacity};
    transition: opacity 0.3s ease;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(21, 24, 33, 0.7);
      content: '';
    }
  `
}


const CloseButtonStyle = css`
  position: absolute;
  right: ${clw(60)};
  top: ${clw(60)};
`

const TrackNameContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0 ${clw(24)};
  z-index: 1;
`

const TrackName = css`
  position: relative;
  font-size: ${font(36)};
  line-height: 1em;
  z-index: 2;
`

const ArtistName = css`
  font-size: ${font(14)};
  line-height: 1em;
  text-align: right;
  margin-top: ${clw(8)};
`

const LyricsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: ${font(14)};
  line-height: 1.57em;
  padding: 0 ${clw(24)};
  z-index: 1;
`

const LyricsWrapper = css`
  padding: ${clw(80)} 0;
  max-height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  scrollbar-height: none;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Lyrics = css`
  display: flex;
  justify-content: center;
`

const TitleBackground = css`
  position: absolute;
  width: 90%;
  height: 40%;
  left: calc(${clw(20)} + 10%);
  bottom: -10%;
`

const LyricsModalTemplate = (prop: LyricsModalTemplateProps) => {
  const {disc, track, style} = prop

  const titleBackgroundColor = css`
    background: ${disc.color}
  `

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <section>
      <div css={[Section, style]}>
        <div css={BackgroundImage(isImageLoaded)}>
          <Image layout='fill' objectFit='cover' src={disc.imagePc} alt=''
                 onLoadingComplete={() => setIsImageLoaded(true)}/>
        </div>
        <CloseButton style={CloseButtonStyle}/>
        <div css={TrackNameContainer}>
          <div>
            <div css={css`position: relative`}>
              <p css={TrackName}>{track.name} {track.featuredArtist && `feat. ${track.featuredArtist.name}`}</p>
              <span
                css={[TitleBackground, titleBackgroundColor]}/>
            </div>
            <p css={ArtistName}>by {track.artist.name}</p>
          </div>
        </div>
        <div css={LyricsContainer}>
          <div css={LyricsWrapper}>
            <p css={Lyrics}>{track.lyrics}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LyricsModalTemplate
