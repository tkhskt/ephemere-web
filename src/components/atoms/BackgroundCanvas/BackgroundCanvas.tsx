import {css, SerializedStyles} from "@emotion/react";
import {useLayoutEffect, useRef} from "react";
import Sketch from './sketch';
import Image from "next/image";
import {usePageContext} from "contexts/PageContext/context";

interface BackgroundCanvasProps {
  style: SerializedStyles
}

const Canvas = css`
  width: 100%;
  height: 100%;
`

const BackgroundCanvas = (prop: BackgroundCanvasProps) => {

  const mountRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const elm = mountRef.current
    const img = imgRef.current

    if (!elm || !img) return

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
  }, [])

  const {setIsBackgroundLoaded} = usePageContext()

  return (
    <div css={[prop.style]}>
      <div ref={mountRef}
           id='canvas'
           css={Canvas}
           data-grid="90"
           data-mouse="0.02"
           data-strength="0.0"/>
      <img ref={imgRef} src="/img/main.png" alt=""/>
    </div>
  )
}

export default BackgroundCanvas
