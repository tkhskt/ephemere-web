import type {NextPage} from 'next'
import Head from 'next/head'
import {IndexPageTemplate, SplashScreenTemplate} from "components/templates";
import {usePageContext} from "contexts/PageContext/context";
import {memo, useEffect, useLayoutEffect, useMemo} from "react";

const description = "“éphémère”is a story of the delicate balance between happiness and sadness."
const url = "https://ephemere.blue"
const title = "éphémère"
const imageUrl = "/ogp.png"

const Home: NextPage = () => {

  const {setIsMobile} = usePageContext()
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 1025)
    })
  }, [setIsMobile])

  return useMemo(() => {
    return (
      <div>
        <Head>
          <title>éphémère</title>
          <meta name="description" content="Generated by create next app"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:width" content={String(1200)} />
          <meta property="og:image:height" content={String(630)} />
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content={description}/>
          <meta property="twitter:image:src" content={imageUrl}/>
          <meta property="twitter:image:src" content={imageUrl}/>
        </Head>
        <main>
          <IndexPageTemplate/>
          <SplashScreenTemplate/>
        </main>
      </div>
    )
  }, [])
}

export default Home
