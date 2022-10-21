import {useMousePosition} from "hooks/mousePosition";
import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {ZIndex} from "values";
import {memo, useEffect, useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {Canto} from "styles/font";

const MouseWrapper = css`
  width: 0;
  height: 0;
  position: fixed;
  z-index: ${ZIndex.MouseStalker};
  pointer-events: none;
`

const Mouse = css`
  pointer-events: none;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  color: ${Colors.White};
  background: ${Colors.White};
  border-radius: 50% 50%;
  font-size: 20px;
  will-change: transform, width, height;
`

const Text = css`
  color: ${Colors.Black};
  display: none;
  opacity: 0;
  font-size: 16px;
  line-height: 1em;
  will-change: display, opacity;
  ${Canto}
`

type Position = {
  x: number,
  y: number,
}

const MouseStalker = memo(() => {

    const position = useMousePosition();

    const cursorRef = useRef(null);
    const textRef = useRef(null);

    const {mouseStalkerState} = useMouseStalkerContext();

    useLayoutEffect(() => {
      gsap.context(() => {
        gsap.timeline().to(cursorRef.current, {
          duration: 0.2,
          transform: `translate3d(calc(${position.x ? position.x : 0}px - 50%), calc(${position.y ? position.y : 0}px - 50%), 0)`
        })

      }, [cursorRef]);// <- Scope!
    }, [position, cursorRef]);


    useLayoutEffect(() => {
      gsap.context(() => {
        const hoveredElement = mouseStalkerState.hoveredElement
        gsap.killTweensOf(textRef.current)
        switch (hoveredElement) {
          case HoveredElement.Top:
            gsap.timeline()
              .to(cursorRef.current, {
                duration: 0.2,
                css: {
                  width: "54px",
                  height: "54px"
                }
              }).set(textRef.current, {
              css: {
                display: "inline",
                opacity: 0,
              }
            })
              .to(textRef.current, {
                duration: 0.1,
                css: {
                  opacity: 1,
                }
              })
            break;
          case HoveredElement.Link:
            gsap.timeline()
              .set(textRef.current, {
                css: {
                  display: "none",
                  opacity: 0,
                }
              })
              .to(cursorRef.current, {
                duration: 0.2,
                css: {
                  background: "transparent",
                  width: "50px",
                  height: "50px",
                  border: `solid 1px ${Colors.White}`,
                }
              })

            break;
          case HoveredElement.Track:
            gsap.timeline()
              .to(cursorRef.current, {
                duration: 0.2,
                css: {
                  width: "50px",
                  height: "50px",
                  background: `${Colors.White}`,
                }
              })
              .set(textRef.current, {
                css: {
                  display: "inline",
                  opacity: 0,
                }
              })
              .to(textRef.current, {
                duration: 0.1,
                css: {
                  opacity: 1,
                }
              })
            break;
          case HoveredElement.Others:
            gsap.timeline()
              .set(textRef.current, {
                css: {
                  display: "none",
                  opacity: 0,
                }
              })
              .to(cursorRef.current, {
                duration: 0.2,
                css: {
                  width: "10px",
                  height: "10px",
                  background: `${Colors.White}`,
                }
              })
            break;
        }
      }, [cursorRef, textRef])

    }, [mouseStalkerState, cursorRef, textRef]);

    return (
      <div css={MouseWrapper}>
        <div ref={cursorRef} className="cursor" css={Mouse}>
          <span ref={textRef}
                css={Text}> {mouseStalkerState.hoveredElement == HoveredElement.Track ? "Lyrics" : "Scroll"}</span>
        </div>
      </div>
    )
  }
)

MouseStalker.displayName = "MouseStalker"

export default MouseStalker
