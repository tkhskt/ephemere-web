import EphemereLogo from 'assets/svg/ephemere_logo.svg'
import {css, SerializedStyles} from "@emotion/react";
import {usePageContext} from "contexts/PageContext/context";
import {Colors} from "styles/theme";
import {useModalContext} from "contexts/ModalContext/context";
import {useCallback} from "react";
import {animateScroll as scroll} from "react-scroll";

interface LogoProps {
  style: SerializedStyles
}

const LogoStyle = (color: string, cursor: string) => {
  return css`
    cursor: ${cursor};
    fill: ${color};
    transition: fill 0.2s ease;
  `
}

const Logo = (prop: LogoProps) => {
  const {pageState} = usePageContext();
  const {modalState} = useModalContext();

  const color = (pageState.onTrack || pageState.onInfoCredits || modalState.isOpened) ? Colors.White : Colors.Navy

  const onClickLogo = useCallback(() => {
    if (modalState.isOpened) return
    scroll.scrollToTop()
  }, [modalState.isOpened])

  return (
    <EphemereLogo onClick={onClickLogo} css={[prop.style, LogoStyle(color, modalState.isOpened ? 'default' : 'pointer')]}/>
  )
}

export default Logo
