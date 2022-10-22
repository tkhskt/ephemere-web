import {css, SerializedStyles} from "@emotion/react";
import {memo, useLayoutEffect, useRef} from "react";
import Sketch from './sketch';
import mainSp from '/public/img/main_sp.png';
import {usePageContext} from "contexts/PageContext/context";
import {useIsMobile} from "hooks/isMobile";
import Image from "next/image";


interface BackgroundCanvasProps {
  style: SerializedStyles
}

const Canvas = css`
  width: 100%;
  height: 100%;
`

const SpBackground = css`
  width: 100%;
  height: 100%;
`

const BackgroundCanvas = memo((prop: BackgroundCanvasProps) => {

  const mountRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const isMobile = useIsMobile()

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  useLayoutEffect(() => {
    const elm = mountRef.current
    const img = imgRef.current

    if (!elm || !img || window.innerWidth < 1025) return

    if (img.complete) {
      setIsBackgroundLoaded(true)
    } else {
      img.onload = () => {
        setIsBackgroundLoaded(true)
      }
    }

    const sketch = new Sketch({
      dom: elm,
      img: img,
    })
    return () => {
      elm?.removeChild(sketch.renderer.domElement)
    }
  }, [isMobile])

  const {setIsBackgroundLoaded} = usePageContext()

  return (
    <>
      {
        !isMobile ?
          <div css={prop.style}>
            <div ref={mountRef}
                 id='canvas'
                 css={Canvas}
                 data-grid="90"
                 data-mouse="0.02"
                 data-strength="0.0"/>
            <img ref={imgRef} src="/img/main.png" alt=""/>
          </div> :
          <div css={prop.style}>
            <Image layout='fill' objectFit='cover' src={mainSp} alt='' onLoadingComplete={() => {
              setIsBackgroundLoaded(true)
            }}/>
          </div>
      }
    </>
  )
})

BackgroundCanvas.displayName = "BackgroundCanvas"

export default BackgroundCanvas
