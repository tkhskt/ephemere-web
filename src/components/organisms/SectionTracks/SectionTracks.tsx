import TracksCard from "components/organisms/TracksCard";
import {useTrackContext} from "contexts/TrackContext/context";
import TrackLinePc from 'assets/svg/track_line_pc.svg'
import {Colors} from "styles/theme";
import {css, keyframes} from "@emotion/react";
import {clh, clw} from "util/size";
import {InView} from "react-intersection-observer";
import {memo} from "react";

const Section = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${clh(250)} 0 0 0;
`

const Container = css`
  position: relative;
  display: inline-flex;
  justify-content: center;
  padding: ${clw(48)} 0;
  width: 100%;
  max-width: ${clw(1754)};
`

const BlueBackground = (inView: boolean) => {
  const animation = keyframes`
    from {
      height: 0;
    }
    to {
      height: ${clw(300)};
    }
  `
  return css`
    position: absolute;
    top: 0;
    background: ${Colors.Navy};
    width: 100%;
    max-width: ${clw(1309)};
    height: 0;
    ${inView && css`animation: ${animation} 1s cubic-bezier(0.5, 0, 0, 1) forwards `}
  `
}


const BlueBackgroundBottom = (inView: boolean) => {
  const animation = keyframes`
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  `
  return css`
    position: absolute;
    bottom: ${clw(150)};
    left: ${clw(135)};
    background: ${Colors.Navy};
    width: 0;
    max-width: ${clw(784)};
    height: ${clw(200)};
    ${
      inView && css`animation: ${animation} 1.5s cubic-bezier(0.5, 0, 0, 1) forwards`
    }
  `
}

const GreenBackground = (inView: boolean) => {
  const animation = keyframes`
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  `
  return css`
    position: absolute;
    top: ${clw(114)};
    right: ${clw(130)};;
    background: ${Colors.Green};
    width: 0;
    max-width: ${clw(800)};
    height: ${clw(400)};
    ${
      inView && css`animation: ${animation} 1.5s cubic-bezier(0.5, 0, 0, 1) forwards`
    }
  `
}

const TrackLinePcStyle = (inView: boolean) => {
  return css`
    position: absolute;
    opacity: 0;
    z-index: 2;
    width: 90% !important;
    pointer-events: none;
    transition: opacity 2.5s ease;
    ${inView && css`opacity: 1`}
  `
}

const CardWrapper = (inView: boolean) => {
  const animation = keyframes`
    from {
      opacity: 0;
      transform: translateY(10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `
  return css`
    opacity: 0;
    width: 50%;
    ${inView && css`
      animation: ${animation} 0.5s ease forwards;
    `}
  `
}

const TrackCardStyle = css`
  transition: opacity 0.5s ease;

`

const Disc2TrackCardStyle = css`
  margin-top: ${clw(162)};
  ${TrackCardStyle};
`

const SectionTracks = memo(() => {

  const {disc1Tracks, disc2Tracks} = useTrackContext()

  return (
    <section>
      <div css={Section}>
        <div css={Container}>
          <InView triggerOnce={true} delay={200}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={[BlueBackground(inView)]}/>
            )}
          </InView>
          <InView triggerOnce={true} delay={200}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={[GreenBackground(inView)]}/>
            )}
          </InView>
          <InView triggerOnce={true} delay={200}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={[BlueBackgroundBottom(inView)]}/>
            )}
          </InView>
          <InView triggerOnce={true} delay={500}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={TrackLinePcStyle(inView)}>
                <TrackLinePc/>
              </div>
            )}
          </InView>
          <InView triggerOnce={true} delay={500}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={CardWrapper(inView)}>
                <TracksCard title={'Disc 1 (melancholy)'} color={Colors.Blue} tracks={disc1Tracks}/>
              </div>
            )}
          </InView>
          <InView triggerOnce={true} delay={700}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={CardWrapper(inView)}>
                <TracksCard title={'Disc 2 (perseverance)'} color={Colors.Yellow} tracks={disc2Tracks}
                            style={Disc2TrackCardStyle}/>
              </div>
            )}
          </InView>
        </div>
      </div>
    </section>
  )
})

SectionTracks.displayName = "SectionTracks"

export default SectionTracks
