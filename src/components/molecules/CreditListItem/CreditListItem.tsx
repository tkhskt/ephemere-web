import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {memo, useLayoutEffect} from "react";

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

interface CreditListItemProps {
  name: string
  role: string
  url?: string
  linkText?: string
}

const CreditListItem = memo((prop: CreditListItemProps) => {

  const {name, role, url, linkText} = prop

  const [linkHoverRef, isHoverLink] = useHover()

  const {setIsHoverOn} = useMouseStalkerContext()

  useLayoutEffect(() => {
    if (isHoverLink) {
      setIsHoverOn(HoveredElement.Link)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [linkHoverRef, isHoverLink])

  return (
    <tr>
      <td><p css={css`white-space: nowrap`}>{role}</p></td>
      <td css={CreditsName}>
        <p css={LinkWrapper}>{name}</p> {url &&
        <p css={[LinkWrapper, Link]}>
          (<a ref={linkHoverRef} css={css`position: relative`} href={url} target="_blank"
              rel="noreferrer">{linkText}<span css={[LinkStroke, isHoverLink && LinkStrokeHover]}/></a>)
        </p>
      }
      </td>
    </tr>
  )
})

CreditListItem.displayName = "CreditsCard"

export default CreditListItem
