import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {memo, useLayoutEffect, useState} from "react";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {sp} from "styles/mediaQuert";
import {clw} from "util/size";
import {spWidth} from "values";
import {useIsMobile} from "hooks/isMobile";


const TopContainer = (vh: number) => {
  return css`
    position: relative;
    //height: 100vh;
    height: ${vh}px;
    width: 100%;
  `
}

const Concept = css`
  position: absolute;
  left: min(7.44vw, 143px);
  bottom: min(6.7vh, 73px);
  color: ${Colors.Black};
  font-size: 24px;
  display: inline-block;
  background: ${Colors.White};
  line-height: 1em;
  ${
    sp(css`
      font-size: 16px;
      left: 0;
      margin: 0 24px;
      bottom: ${clw(50, spWidth)};
    `)
  }
`

const SectionTop = memo(() => {

  const [vh, setVh] = useState(0)
  const [topRef, isHoverLink] = useHover()
  const {setIsHoverOn} = useMouseStalkerContext()
  const isMobile = useIsMobile()

  useLayoutEffect(() => {
    if (isHoverLink) {
      setIsHoverOn(HoveredElement.Top)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [topRef, isHoverLink])

  useLayoutEffect(() => {
    setVh(window.innerHeight)
  }, [isMobile])

  return (
    <section ref={topRef}>
      <div css={TopContainer(vh)}>
        <p css={Concept}>“éphémère”is a story of the delicate balance between happiness and sadness.</p>
      </div>
    </section>
  )
})

SectionTop.displayName = "SectionTop"

export default SectionTop
