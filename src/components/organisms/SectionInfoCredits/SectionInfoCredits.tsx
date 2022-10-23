import InfoCard from "components/organisms/InfoCard";
import CreditsCard from "components/organisms/CreditsCard";
import {css, keyframes} from "@emotion/react";
import {clh, clw} from "util/size";
import InfoLinePc from 'assets/svg/info_line_pc.svg'
import InfoLineSp from 'assets/svg/info_line_sp.svg'
import CreditsLineSp from 'assets/svg/credits_line_sp.svg'
import {InView} from "react-intersection-observer";
import {memo, useLayoutEffect, useMemo, useRef} from "react";
import {sp} from "styles/mediaQuert";
import {useOffsetTop} from "hooks/position";
import {useOnInfoCreditsContext, usePageContext} from "contexts/PageContext/context";

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

const InfoLineSpStyle = css`
  position: absolute;
  display: none;
  overflow: hidden;
  ${
    sp(css`
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px 0;
    `)
  }
`

const CreditsLineSpStyle = css`
  position: absolute;
  display: none;
  overflow: hidden;
  pointer-events: none;
  ${
    sp(css`
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px 0;
    `)
  }
`

const SectionInfoCredits = memo(() => {
  const sectionRef = useRef(null)

  const {viewportTop} = useOffsetTop(sectionRef);

  const {pageState} = usePageContext()

  const onInfoCreditsContext = useOnInfoCreditsContext()

  useLayoutEffect(() => {
    const node = sectionRef.current
    if (node != null && viewportTop) {
      const elm = node as HTMLElement
      const bottom = viewportTop + elm.clientHeight

      let onDark
      if (pageState.isMobile) {
        onDark = bottom > 24 && bottom < elm.clientHeight - 40
      } else {
        const logoTop = Math.min(window.innerHeight * 0.111, 120)
        onDark = bottom > (logoTop + 58) && bottom < elm.clientHeight + logoTop + 58
      }
      onInfoCreditsContext(onDark)
    }
  }, [onInfoCreditsContext, pageState.isMobile, viewportTop])

  return useMemo(() => {
    return (
      <section>
        <div css={Section}>
          <div ref={sectionRef} css={Container}>
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
                  <div css={InfoLineSpStyle}>
                    <InfoLineSp css={css`max-width: 100%; max-height: 100%`}/>
                  </div>
                </div>
              )}
            </InView>
            <InView triggerOnce={true} delay={700}>
              {({inView, ref, entry}) => (
                <div ref={ref} css={CreditsCardWrapper(inView)}>
                  <CreditsCard/>
                  <div css={CreditsLineSpStyle}>
                    <CreditsLineSp css={css`max-width: 100%; max-height: 100%`}/>
                  </div>
                </div>
              )}
            </InView>
          </div>
        </div>
      </section>
    )
  }, [])
})

SectionInfoCredits.displayName = "SectionInfoCredits"

export default SectionInfoCredits
