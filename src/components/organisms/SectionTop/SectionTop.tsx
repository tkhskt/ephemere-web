import {css} from "@emotion/react";
import {Colors} from "styles/theme";


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

const SectionTop = () => {
  return (
    <section>
      <div css={TopContainer}>
        <p css={Concept}>“éphémère”is a story of the delicate balance between happiness and sadness.</p>
      </div>
    </section>
  )
}

export default SectionTop
