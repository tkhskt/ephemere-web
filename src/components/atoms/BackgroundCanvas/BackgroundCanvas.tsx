import {css, SerializedStyles} from "@emotion/react";
import {useLayoutEffect, useRef} from "react";
import Sketch from './sketch';

interface BackgroundCanvasProps {
  style: SerializedStyles
}

const Canvas = css`
  width: 100%;
  height: 100%;
`

const BackgroundCanvas = (prop: BackgroundCanvasProps) => {
  // useEffect(() => {
  //   const layout = new Layout(document.getElementById('canvas')! as HTMLCanvasElement);
  //   layout.start()
  // }, [])

  const mountRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const elm = mountRef.current
    const img = imgRef.current

    if (!elm || !img) return

    const sketch = new Sketch({
      dom: elm,
      img: img,
    })
    return () => {
      elm?.removeChild(sketch.renderer.domElement)
    }
  }, [])


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
