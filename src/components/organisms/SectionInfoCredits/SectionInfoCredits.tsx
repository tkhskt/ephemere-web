import InfoCard from "components/organisms/InfoCard";
import CreditsCard from "components/organisms/CreditsCard";
import {css, keyframes} from "@emotion/react";
import {clh, clw} from "util/size";
import InfoLinePc from 'assets/svg/info_line_pc.svg'
import {InView} from "react-intersection-observer";
import {memo} from "react";
import {sp} from "styles/mediaQuert";

const Section = css`
  min-height: 100vh;
  padding: ${clh(250)} 0 ${clh(100)};
  ${
    sp(css`
      display: flex;
      flex-direction: column;
      padding: 0;
    `)
  }
`

const Container = css`
  position: relative;
  width: 100%;
  height: ${clw(718)};
  max-width: ${clw(1452)};
  margin: 0 auto;
  ${
    sp(css`
      display: flex;
      flex-direction: column;
      padding: 87px 0 100px;
      height: auto;
    `)
  }
`

const InfoCardWrapper = (inView: boolean) => {
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
    position: absolute;
    width: 60.3%;
    z-index: 1;
    top: 0;
    left: 0;
    opacity: 0;
    ${inView && css`
      animation: ${animation} 0.5s ease forwards;
    `}
    ${
      sp(
        css`
          position: relative;
          top: auto;
          left: auto;
          width: 100%;
        `)
    }
  `
}

const CreditsCardWrapper = (inView: boolean) => {
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
    position: absolute;
    width: 77%;
    bottom: 0;
    right: 0;
    opacity: 0;
    ${inView && css`
      animation: ${animation} 0.5s ease forwards;
    `}
    ${
      sp(
        css`
          position: relative;
          top: auto;
          left: auto;
          width: 100%;
          margin-top: 48px;
        `)
    }
  `
}

const InfoLinePcStyle = (inView: boolean) => {
  return css`
    position: absolute;
    z-index: 2;
    top: ${clw(50)};
    left: ${clw(50)};
    width: 90% !important;
    pointer-events: none;
    opacity: 0;
    transition: opacity 2.5s ease;
    ${inView && css`opacity: 1`}
    ${
      sp(css`
        display: none;
      `)
    }
  `
}

const SectionInfoCredits = memo(() => {
  return (
    <section>
      <div css={Section}>
        <div css={Container}>
          <InView triggerOnce={true} delay={500}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={InfoLinePcStyle(inView)}>
                <InfoLinePc/>
              </div>
            )}
          </InView>

          <InView triggerOnce={true} delay={500}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={InfoCardWrapper(inView)}>
                <InfoCard/>
              </div>
            )}
          </InView>
          <InView triggerOnce={true} delay={700}>
            {({inView, ref, entry}) => (
              <div ref={ref} css={CreditsCardWrapper(inView)}>
                <CreditsCard/>
              </div>
            )}
          </InView>
        </div>
      </div>
    </section>
  )
})

SectionInfoCredits.displayName = "SectionInfoCredits"

export default SectionInfoCredits
