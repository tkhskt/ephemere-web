import {BodyScrollOptions, clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll,} from "body-scroll-lock"
import {useLayoutEffect} from "react";

export const useScrollLock = (
  targetElement?: HTMLElement | Element | null | false,
  bodyScrollOption?: BodyScrollOptions
) => {
  useLayoutEffect(() => {
    if (!targetElement) {
      return;
    }
    disableBodyScroll(targetElement, bodyScrollOption);
    return () => {
      // enableBodyScroll(targetElement);
      clearAllBodyScrollLocks();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [targetElement]);
};
