import {css, keyframes} from "@emotion/react";
import {Colors} from "styles/theme";
import {usePageContext} from "contexts/PageContext/context";
import {ZIndex} from "values";
import {Serif} from "styles/font";
import {InView} from "react-intersection-observer";
import TrackLinePc from "assets/svg/track_line_pc.svg";
import {useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";
import pages from "pages";
import {useScrollLock} from "hooks/scrollLock";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

const Container = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Colors.Black};
  z-index: ${ZIndex.Splash};
  ${Serif}
`

const Text = css`
  user-select: none;
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;

    }
  `} 2s ease forwards;
`

const SplashScreenTemplate = () => {
  const splashRef = useRef<HTMLDivElement>(null)
  const {pageState} = usePageContext()

  useScrollLock(splashRef.current)
  useLayoutEffect(() => {
    gsap.context(() => {
      const splash = splashRef.current
      if (splash == null) return
      if (pageState.backgroundLoaded) {
        gsap.timeline()
          .to(splashRef.current, {
            delay: 2,
            duration: 0.5,
            css: {
              opacity: 0,
            },
            onStart() {
              disableBodyScroll(splash);
            },
            onComplete() {
              enableBodyScroll(splash);
              splash.style.display = 'none'
            },
          })
      }
    }, [splashRef]);
  }, [splashRef, pageState.backgroundLoaded]);

  return (
    <div ref={splashRef} css={[Container]}>
      <p css={Text}>Electronica will live forever.</p>
    </div>
  )
}

export default SplashScreenTemplate
