import BackgroundCanvas from "components/atoms/BackgroundCanvas";
import Logo from "components/atoms/Logo";
import {SectionInfoCredits, SectionTop, SectionTracks} from "components/organisms";
import {css} from "@emotion/react";
import {Serif} from "styles/font";
import {Colors} from "styles/theme";
import MouseStalker from "components/atoms/MouseStalker/MouseStalker";
import {memo, useRef} from "react";
import LyricsModal from "components/organisms/LyricsModal";

const IndexPage = css`
  width: 100%;
  height: 100vh;
`

const CanvasStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Colors.Blue};
  z-index: -1;
`

const LogoStyle = css`
  display: inline-flex;
  position: fixed;
  top: min(120px, 11.1vh);
  left: min(7.44vw, 143px);
  z-index: 999999;
  width: 296.83px;
`

const Content = css`
  z-index: 50;
  ${Serif}
`


const IndexPageTemplate = memo(() => {

  return (
    <div css={IndexPage}>
      <BackgroundCanvas style={CanvasStyle}/>
      <Logo style={LogoStyle}/>
      <LyricsModal/>
      <div css={Content}>
        <SectionTop/>
        <SectionTracks/>
        <SectionInfoCredits/>
      </div>
      <MouseStalker/>
    </div>
  )
})

IndexPageTemplate.displayName = "IndexPageTemplate"

export default IndexPageTemplate
