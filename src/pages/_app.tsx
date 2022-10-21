import '../styles/globals.css'
import '../styles/reset.css'
import type {AppProps} from 'next/app'
import {TrackContextProvider} from "contexts/TrackContext/context";
import {ModalContextProvider} from "contexts/ModalContext/context";
import {css, Global} from "@emotion/react";
import {Colors} from "styles/theme";
import {LoadScript, Mincho} from "styles/font";
import Head from "next/head";
import {clw} from "util/size";
import {MouseStalkerContextProvider} from "contexts/MouseStalkerContext";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: LoadScript
        }}/>
        <title>ephemere</title>
      </Head>
      <Global
        styles={css`
          html {
            color: ${Colors.White};
            font-size: ${clw(16)};
            letter-spacing: 0.02em;
            background: ${Colors.Black};
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            ${Mincho}
          }
        `}
      />
      <MouseStalkerContextProvider>
        <ModalContextProvider>
          <TrackContextProvider>
            <Component {...pageProps} />
          </TrackContextProvider>
        </ModalContextProvider>
      </MouseStalkerContextProvider>
    </>
  )
}

export default MyApp
