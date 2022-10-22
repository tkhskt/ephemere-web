import {BodyScrollOptions, clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll,} from "body-scroll-lock"
import {useLayoutEffect} from "react";
import {getScrollbarWidth} from "styles/getScrollBarWidth";

export const useScrollLock = (
  targetElement?: HTMLElement | Element | null | false,
  bodyScrollOption?: BodyScrollOptions
) => {
  useLayoutEffect(() => {
    if (!targetElement) {
      return;
    }
    disableBodyScroll(targetElement, bodyScrollOption);
    document.body.style.paddingRight = `${getScrollbarWidth()}px`
    return () => {
      clearAllBodyScrollLocks();
      document.body.style.paddingRight = '0px'
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [targetElement]);
};
