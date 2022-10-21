import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {memo, useEffect, useLayoutEffect, useRef} from "react";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {is} from "@babel/types";


const TopContainer = css`
  position: relative;
  height: 100vh;
  width: 100%;
`

const Concept = css`
  position: absolute;
  left: min(7.44vw, 143px);
  bottom: min(6.7vh, 73px);
  color: ${Colors.Black};
  font-size: 24px;
  display: inline-block;
  background: ${Colors.White};
  line-height: 1em;
`

const SectionTop = memo(() => {

  const [topRef, isHoverLink] = useHover()
  const {setIsHoverOn} = useMouseStalkerContext()

  useLayoutEffect(() => {
    if (isHoverLink) {
      setIsHoverOn(HoveredElement.Top)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [topRef, isHoverLink])

  return (
    <section ref={topRef}>
      <div css={TopContainer}>
        <p css={Concept}>“éphémère”is a story of the delicate balance between happiness and sadness.</p>
      </div>
    </section>
  )
})

SectionTop.displayName = "SectionTop"

export default SectionTop
