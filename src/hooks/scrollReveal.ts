import {MutableRefObject, useEffect, useRef} from "react";
import scrollReveal from "scrollreveal";

export const useScrollReveal = (animation: (ref: MutableRefObject<HTMLElement | null>) => void) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current)
      scrollReveal().reveal(ref.current, {
        reset: false,
        beforeReveal(domEl: HTMLElement | NodeListOf<Element>) {
          animation(ref)
          ref.current
        }
      });
  }, [animation, ref]);

  return ref
}
