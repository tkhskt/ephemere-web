import {css, SerializedStyles} from "@emotion/react";
import {memo, useLayoutEffect, useMemo, useRef} from "react";
import Sketch from './sketch';
import mainSp from '/public/img/main_sp.png';
import {usePageContext} from "contexts/PageContext/context";
import {useIsMobile} from "hooks/isMobile";
import Image from "next/image";
import * as THREE from 'three'


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

async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

const BackgroundCanvas = memo((prop: BackgroundCanvasProps) => {

  const mountRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  const {setIsBackgroundLoaded} = usePageContext()

  useLayoutEffect(() => {
    const elm = mountRef.current
    if (!elm) return
    let sketch: Sketch | null = null

    if (!elm || window.innerWidth < 1025) return
    const texLoader = new THREE.TextureLoader();
    (async () => {
      if (await supportsWebp()) {
        texLoader.load("/img/main.webp",
          (texture) => {
            setIsBackgroundLoaded(true)
            sketch = new Sketch({
              dom: elm,
              texture: texture,
            })
          }
        )
      } else {
        texLoader.load("/img/main.png",
          (texture) => {
            setIsBackgroundLoaded(true)
            sketch = new Sketch({
              dom: elm,
              texture: texture,
            })
          }
        )
      }
    })();
    return () => {
      if (sketch) {
        elm?.removeChild(sketch.renderer.domElement)
      }
    }
  }, [isMobile])

  return useMemo(() => {
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
            </div> :
            <div css={prop.style}>
              <Image layout='fill' objectFit='cover' src={mainSp} alt='' onLoadingComplete={() => {
                setIsBackgroundLoaded(true)
              }}/>
            </div>
        }
      </>
    )
  }, [isMobile, prop.style, setIsBackgroundLoaded])
})

BackgroundCanvas.displayName = "BackgroundCanvas"

export default BackgroundCanvas
