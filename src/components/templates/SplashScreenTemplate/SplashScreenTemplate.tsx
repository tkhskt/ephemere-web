import {css, keyframes} from "@emotion/react";
import {Colors} from "styles/theme";
import {usePageContext} from "contexts/PageContext/context";
import {ZIndex} from "values";
import {Serif} from "styles/font";
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {useScrollLock} from "hooks/scrollLock";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import {clw, font} from "util/size";
import {getScrollbarWidth} from "styles/getScrollBarWidth";
import {sp} from "styles/mediaQuert";

const Container = css`
  position: fixed;
  display: flex;
  flex-direction: column;
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
  position: relative;
  user-select: none;
  cursor: default;
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;

    }
  `} 2s ease forwards;
`

const LoadingWrapper = css`
  position: absolute;
  bottom: ${clw(200)};
  ${sp(css`
    bottom: 100px;
  `)}
`

const LoadingText = css`
  width: 200px;
  position: relative;
  font-size: ${font(12)};
  text-align: center;
  user-select: none;
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;

    }
  `} 2s ease forwards;

  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    background: ${Colors.White};
    content: '';

    animation: ${keyframes`
      0% {
        width: 0;
      }
      50% {
        left: 40%;
        width: 60%;
      }
      51% {
        left: auto;
        right: 0;
      }
      99% {
        width: 0;
        left: auto;
        right: 0;
      }
      100% {
        right: auto;
        left: 0;
      }
    `} 1.5s linear infinite;
  }
`

const SplashScreenTemplate = () => {
  const splashRef = useRef<HTMLDivElement>(null)
  const {pageState} = usePageContext()

  useScrollLock(splashRef.current)
  useLayoutEffect(() => {
    gsap.context(() => {
      const splash = splashRef.current
      if (splash == null) return
      disableBodyScroll(splash);
      document.body.style.paddingRight = `${getScrollbarWidth()}px`
      if (pageState.backgroundLoaded) {
        gsap.timeline()
          .to(splashRef.current, {
            delay: 2,
            duration: 0.5,
            css: {
              opacity: 0,
            },
            onComplete() {
              enableBodyScroll(splash);
              splash.style.display = 'none'
              document.body.style.paddingRight = `${0}px`
            },
          })
      }
    }, [splashRef]);
  }, [splashRef, pageState.backgroundLoaded]);

  return (
    <div ref={splashRef} css={[Container]}>
      <p css={Text}>Electronica will live forever.</p>
      <div css={LoadingWrapper}>
        <p css={LoadingText}>Loading</p>
      </div>
    </div>
  )
}

export default SplashScreenTemplate
