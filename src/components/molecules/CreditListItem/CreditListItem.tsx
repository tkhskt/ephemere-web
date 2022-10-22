import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {useHover} from "hooks/hover";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";
import {memo, useEffect, useLayoutEffect} from "react";
import {sp} from "styles/mediaQuert";

const CreditsName = css`
  padding-left: ${clw(20)};
  ${
    sp(css`
      padding-left: 15px;
      line-height: 1.2em;
    `)
  }
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
  will-change: width;
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
  onHoverLink: (isHoverLink: boolean) => void
}

const CreditListItem = memo((prop: CreditListItemProps) => {

  const {name, role, url, linkText, onHoverLink} = prop

  const [linkHoverRef, isHoverLink] = useHover()

  useLayoutEffect(() => {
    onHoverLink(isHoverLink)
  }, [linkHoverRef, isHoverLink, onHoverLink])

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
