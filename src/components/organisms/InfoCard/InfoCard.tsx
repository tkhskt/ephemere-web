import {css} from "@emotion/react";
import {Colors} from "styles/theme";
import {clw, font} from "util/size";
import {Adobe} from "styles/font";

const Card = css`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  background: ${Colors.Black};
  padding: ${clw(42)} ${clw(64)};
  //width: ${clw(877)};
  width: 100%;
  height: ${clw(527)};
  justify-content: flex-end;
`

const Title = css`
  font-size: ${font(24)};
  letter-spacing: 0.064em;
  padding-bottom: ${clw(20)};
  ${Adobe}
`

const TableWrapper = css`
  line-height: 2.75em;
`

const InfoValue = css`
  padding-left: ${clw(20)};
`


const InfoCard = () => {
  type Info = {
    title: string,
    value: string,
  }

  const infoList: Info[] = [
    {
      title: 'Event',
      value: 'M3-50'
    },
    {
      title: 'Release',
      value: '2022-10-30'
    },
    {
      title: 'Booths',
      value: 'お-17a|b & ク-14a|b'
    },
    {
      title: 'Price',
      value: '￥2,500'
    },
  ]

  return (
    <div css={Card}>
      <div css={TableWrapper}>
        <table>
          <thead>
          <tr>
            <th><p css={Title}>Info</p></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {infoList.map((info, key) => (
            <tr key={key}>
              <td>{info.title}</td>
              <td css={InfoValue}>{info.value}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InfoCard
