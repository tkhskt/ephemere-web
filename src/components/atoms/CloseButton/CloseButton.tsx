import {useModalContext} from "contexts/ModalContext/context";
import {css, keyframes, SerializedStyles} from "@emotion/react";
import {clw} from "util/size";
import {Colors} from "styles/theme";
import {useHover} from "hooks/hover";

interface CloseButtonProps {
  style: SerializedStyles
}

const StrokeContainer = css`
  display: inline-block;
  width: ${clw(35)};
  height: ${clw(35)};
`

const StrokeWrapper = css`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
  cursor: pointer;
`

const Stroke = css`
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 2px;
  background: ${Colors.White};
  top: calc(50% - 1px);

  &:first-of-type {
    top: calc(100% - 2px);
    left: calc(50% + 1px);

    transform: rotate(-90deg);
    transform-origin: left bottom;
  }
`

const strokeAnimation = keyframes`
  0% {
    opacity: 1;
    width: 100%;
  }
  30% {
    opacity: 0;
    width: 100%;
  }
  31% {
    opacity: 0;
    width: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    width: 100%;
  }
`

const StrokeHovered = (delayMs: number) => {
  return css`
    animation: ${strokeAnimation} 0.4s ease-out;
    animation-delay: ${delayMs}ms;
  `
}

const CloseButton = (prop: CloseButtonProps) => {

  const {setIsOpened} = useModalContext()

  const [ref, isHovered] = useHover()

  return (
    <div css={[StrokeContainer, prop.style]}>
      <div ref={ref} css={StrokeWrapper} onClick={() => {
        setIsOpened(false)
      }}>
        <span css={[Stroke, isHovered && StrokeHovered(40)]}/>
        <span css={[Stroke, isHovered && StrokeHovered(0)]}/>
      </div>
    </div>
  )
}

export default CloseButton
