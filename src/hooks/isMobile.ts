import {useLayoutEffect, useState} from "react";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 1025);
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 1025);
    };
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};
