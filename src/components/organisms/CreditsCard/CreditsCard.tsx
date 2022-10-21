import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {Adobe} from "styles/font";
import {credits} from "values";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {memo, useEffect} from "react";
import CreditListItem from "components/molecules/CreditListItem";

const Card = css`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  background: ${Colors.Navy};
  padding: ${clw(42)} ${clw(64)};
    //width: ${clw(1129)};
  height: ${clw(550)};
  width: 100%;
  justify-content: flex-end;
`

const Title = css`
  width: 100%;
  font-size: ${font(24)};
  letter-spacing: 0.064em;
  text-align: left;
  padding-bottom: ${clw(20)};
  ${Adobe}
`

const TableWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: ${clw(20)};
  line-height: 2.75em;
`

const CreditsName = css`
  padding-left: ${clw(20)};
`

const Link = css`
  font-size: ${font(12)};
`

const LinkWrapper = css`
  display: inline;
`

const LinkStroke = css`
  position: absolute;
  width: 0;
  height: 1px;
  left: 0;
  bottom: 0;
  background: ${Colors.White};
  transition: width 0.2s ease;
`

const LinkStrokeHover = css`
  width: 100%;
  transition: width 0.2s ease;
`

const CreditsCard = memo(() => {

  const [linkHoverRef, isHoverLink] = useHover()

  const {setIsHoverOn} = useMouseStalkerContext()

  useEffect(() => {
    if (isHoverLink) {
      setIsHoverOn(HoveredElement.Link)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [linkHoverRef, isHoverLink])

  return (
    <div css={Card}>
      <div css={TableWrapper}>
        <table>
          <thead>
          <tr>
            <th><p css={Title}>Credits</p></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {credits.map((credits, index) => (
            <CreditListItem name={credits.name} role={credits.role} url={credits.url} linkText={credits.linkText}
                            key={index}/>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

CreditsCard.displayName = "CreditsCard"

export default CreditsCard
