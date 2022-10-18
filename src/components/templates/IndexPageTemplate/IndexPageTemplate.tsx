import BackgroundCanvas from "components/atoms/BackgroundCanvas";
import Logo from "components/atoms/Logo";
import {SectionInfoCredits, SectionTop, SectionTracks} from "components/organisms";
import {css} from "@emotion/react";
import {Serif} from "styles/font";
import {Colors} from "styles/theme";
import {LyricsModalTemplate} from "components/templates/index";
import {useModalContext} from "contexts/ModalContext/context";
import {useTrackContext} from "contexts/TrackContext/context";
import {Disc} from "components/templates/LyricsModalTemplate/LyricsModalTemplate";
import {CSSTransition} from "react-transition-group";

const IndexPage = css`
  width: 100%;
  height: 100vh;
`

const CanvasStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Colors.Blue};
  z-index: -1;
`

const LogoStyle = css`
  display: inline-flex;
  position: fixed;
  top: min(120px, 11.1vh);
  left: min(7.44vw, 143px);
  z-index: 999999;
  width: 296.83px;
`

const reactTransitionGroupWindow = css`
  position: fixed;
  z-index: 1500;
  &.react-transition-group-enter {
    opacity: 0;
  }

  &.react-transition-group-enter-active {
    opacity: 1;
    transition-duration: 300ms;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  &.react-transition-group-exit {
    opacity: 1;
  }

  &.react-transition-group-exit-active {
    opacity: 0;
    transition-duration: 150ms;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
`

const LyricsModalStyle = css`

`

const Content = css`
  z-index: 50;
  ${Serif}
`


const IndexPageTemplate = () => {

  const {modalState} = useModalContext()
  const {disc1Tracks, disc2Tracks} = useTrackContext()

  const currentTrackDisc1 = disc1Tracks.find((track) => (track.id == modalState.currentTrackId))
  const currentTrackDisc2 = disc2Tracks.find((track) => (track.id == modalState.currentTrackId))

  const currentDisc = currentTrackDisc1 ? Disc.Disc1 : Disc.Disc2
  const currentTrack = currentTrackDisc1 ? currentTrackDisc1 : currentTrackDisc2

  return (
    <div css={IndexPage}>
      <BackgroundCanvas style={CanvasStyle}/>
      <Logo style={LogoStyle}/>
      <CSSTransition
        in={currentTrack && modalState.isOpened}
        timeout={200}
        classNames="react-transition-group"
        unmountOnExit
      >
        <div css={reactTransitionGroupWindow}>
          <LyricsModalTemplate disc={currentDisc} track={currentTrack!} style={LyricsModalStyle}/>
        </div>
      </CSSTransition>
      <div css={Content}>
        <SectionTop/>
        <SectionTracks/>
        <SectionInfoCredits/>
      </div>
    </div>
  )
}

export default IndexPageTemplate
