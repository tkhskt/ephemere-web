import {MutableRefObject, useEffect, useRef, useState} from "react";

export const useHover = (): [MutableRefObject<null>, boolean] => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);
  useEffect(
    () => {
      if (ref.current) {
        const node = ref.current as HTMLElement;
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          node.removeEventListener("mouseenter", handleMouseEnter);
          node.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    [] // Recall only if ref changes
  );
  return [ref, value];
}
