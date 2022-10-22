import type {NextPage} from 'next'
import Head from 'next/head'
import {IndexPageTemplate, SplashScreenTemplate} from "components/templates";
import {usePageContext} from "contexts/PageContext/context";
import {useEffect, useLayoutEffect} from "react";

const Home: NextPage = () => {

  // const {setIsMobile} = usePageContext()
  // useLayoutEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setIsMobile(window.innerWidth < 1025)
  //   })
  // }, [window.innerWidth])
  return (
    <div>
      <Head>
        <title>éphémère</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <IndexPageTemplate/>
        <SplashScreenTemplate/>
      </main>
    </div>
  )
}

export default Home
