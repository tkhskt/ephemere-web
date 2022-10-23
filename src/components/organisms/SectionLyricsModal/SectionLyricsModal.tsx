import {Track} from "types";
import {css} from "@emotion/react";
import {clw, font} from "util/size";
import {Serif} from "styles/font";
import disc1BgPc from '/public/img/modal_disc1_bg_pc.png'
import disc2BgPc from '/public/img/modal_disc2_bg_pc.png'
import disc1BgSp from '/public/img/modal_disc1_bg_sp.png'
import disc2BgSp from '/public/img/modal_disc2_bg_sp.png'
import {Colors} from "styles/theme";
import CloseButton from "components/atoms/CloseButton";
import Image from "next/image";
import {memo, useRef, useState} from "react";
import {useScrollLock} from "hooks/scrollLock";
import {sp} from "styles/mediaQuert";
import ModalTrackTitle from "components/atoms/ModalTrackTitle";
import {usePageContext} from "contexts/PageContext/context";

export const Disc = {
  Disc1: {
    color: Colors.Blue,
    imagePc: disc1BgPc,
    imageSp: disc1BgSp,
  },
  Disc2: {
    color: Colors.Yellow,
    imagePc: disc2BgPc,
    imageSp: disc2BgSp,
  },
} as const

type Disc = typeof Disc[keyof typeof Disc];

interface LyricsModalTemplateProps {
  disc: Disc,
  track: Track,
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
  ${
    sp(css`
      display: block;
      padding: 0;
    `)
  }
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
  z-index: 5;
  ${
    sp(css`
      right: 24px;
      top: 24px;
    `)
  }
`

const TrackNameContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  padding: 0 ${clw(24)};
  z-index: 1;
`

const LeftWrapper = css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  ${
    sp(css`
      display: none;
    `)
  }
`

const RightWrapper = css`
  position: absolute;
  display: flex;
  width: 100%;
  z-index: 1;
  padding: 0 ${clw(24)};
`

const LyricsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: ${font(14)};
  line-height: 1.57em;

  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  scrollbar-height: none;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  ${
    sp(css`
      display: block;
    `)
  }
`

const LyricsWrapper = css`
  max-height: 100vh;
`

const Lyrics = css`
  display: flex;
  justify-content: center;
  padding: ${clw(130)} 0;
  ${
    sp(css`
      width: 100%;
      max-width: 350px;
      margin: 56px auto 0;
      padding: 0 0 100px;
      justify-content: flex-start;
    `)
  }
`

const TrackNameWrapperSp = css`
  display: none;
  ${
    sp(css`
      display: inline;
    `)
  }
`


const SectionLyricsModal = memo((prop: LyricsModalTemplateProps) => {
  const {disc, track} = prop

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const {pageState} = usePageContext()

  const lyricRef = useRef(null)
  useScrollLock(lyricRef.current)

  return (
    <section>
      <div css={Section}>
        <div css={BackgroundImage(isImageLoaded)}>
          {pageState.isMobile ?
            <Image
              layout='fill'
              objectFit='cover'
              src={disc.imageSp}
              alt=''
              priority={true}
              onLoadingComplete={() => setIsImageLoaded(true)}
            /> : <Image
              layout='fill'
              objectFit='cover'
              src={disc.imagePc}
              alt=''
              priority={true}
              onLoadingComplete={() => setIsImageLoaded(true)}
            />
          }
        </div>
        <CloseButton style={CloseButtonStyle}/>
        <div css={LeftWrapper}>
          <div css={TrackNameContainer}>
            <ModalTrackTitle track={track} titleColor={disc.color}/>
          </div>
        </div>
        <div css={RightWrapper}>
          <div ref={lyricRef} css={LyricsContainer}>
            <div css={css`width: 50%;
              z-index: -1`}/>
            <div css={LyricsWrapper}>
              <div css={TrackNameWrapperSp}>
                <div css={css`
                  justify-content: flex-start;
                  max-width: 350px;
                  width: 100%;
                  margin: 0 auto;
                  padding-top: 150px;
                  overflow: hidden;
                  `
                }>
                  <ModalTrackTitle track={track} titleColor={disc.color}/>
                </div>
              </div>
              <p css={Lyrics}>{track.lyrics}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

SectionLyricsModal.displayName = "SectionLyricsModal"

export default SectionLyricsModal
