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
import {PageContextProvider} from "contexts/PageContext";
import {sp} from "styles/mediaQuert";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: LoadScript
        }}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
            ${
              sp(css`
                font-size: 16px;
              `)
            }
          }
        `}
      />
      <MouseStalkerContextProvider>
        <ModalContextProvider>
          <TrackContextProvider>
            <PageContextProvider>
              <Component {...pageProps} />
            </PageContextProvider>
          </TrackContextProvider>
        </ModalContextProvider>
      </MouseStalkerContextProvider>
    </>
  )
}

export default MyApp
