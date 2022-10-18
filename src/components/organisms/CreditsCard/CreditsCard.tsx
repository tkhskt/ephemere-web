import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {Adobe} from "styles/font";
import {credits} from "values";

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

const CreditsCard = () => {


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
            <tr key={index}>
              <td>{credits.role}</td>
              <td css={CreditsName}>{credits.name} {credits.url &&
                <a css={Link} href={credits.url} target="_blank" rel="noreferrer">({credits.linkText})</a>}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreditsCard
