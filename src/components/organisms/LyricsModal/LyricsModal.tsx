import {useModalContext} from "contexts/ModalContext/context";
import {useTrackContext} from "contexts/TrackContext/context";
import {css} from "@emotion/react";
import {CSSTransition} from "react-transition-group";
import {SectionLyricsModal} from "components/organisms/index";
import {Disc} from "components/organisms/SectionLyricsModal/SectionLyricsModal";
import {ZIndex} from "values";

const reactTransitionGroupWindow = css`
  position: fixed;
  z-index: ${ZIndex.Modal};

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

const LyricsModal = () => {

  const {modalState} = useModalContext()
  const {disc1Tracks, disc2Tracks} = useTrackContext()

  const currentTrackDisc1 = disc1Tracks.find((track) => (track.id == modalState.currentTrackId))
  const currentTrackDisc2 = disc2Tracks.find((track) => (track.id == modalState.currentTrackId))

  const currentDisc = currentTrackDisc1 ? Disc.Disc1 : Disc.Disc2
  const currentTrack = currentTrackDisc1 ? currentTrackDisc1 : currentTrackDisc2

  return (
    <CSSTransition
      in={currentTrack && modalState.isOpened}
      timeout={200}
      classNames="react-transition-group"
      unmountOnExit
    >
      <div css={reactTransitionGroupWindow}>
        <SectionLyricsModal disc={currentDisc} track={currentTrack!}/>
      </div>
    </CSSTransition>
  )
}

export default LyricsModal
