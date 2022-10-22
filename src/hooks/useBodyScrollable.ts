import {useEffect, useState} from "react";

export const useBodyScrollable = () => {
  const [bodyScrollable, setBodyScrollable] = useState(true)
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setBodyScrollable(document.body.scrollHeight > window.innerHeight)
    })
    resizeObserver.observe(document.body)
    return () => {
      resizeObserver.unobserve(document.body)
    }
  }, [])
  return bodyScrollable
}
