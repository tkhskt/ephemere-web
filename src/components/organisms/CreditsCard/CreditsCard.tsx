import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {Adobe} from "styles/font";
import {credits} from "values";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {memo, useCallback, useEffect, useLayoutEffect} from "react";
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

const CreditsCard = memo(() => {

  const {setIsHoverOn} = useMouseStalkerContext()

  const onHover = useCallback((isHover: boolean) => {
    if(isHover) {
      setIsHoverOn(HoveredElement.Link)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [])


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
                            key={index} onHoverLink={onHover}/>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

CreditsCard.displayName = "CreditsCard"

export default CreditsCard
