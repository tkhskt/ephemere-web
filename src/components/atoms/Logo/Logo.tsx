import EphemereLogo from 'assets/svg/ephemere_logo.svg'
import {SerializedStyles} from "@emotion/react";

interface LogoProps {
  style: SerializedStyles
}

const Logo = (prop: LogoProps) => {
  return (
    <EphemereLogo css={prop.style}/>
  )
}

export default Logo
