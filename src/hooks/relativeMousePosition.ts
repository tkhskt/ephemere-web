import React from "react";

type RelativeMousePosition = {
  relativeDistanceX: number
  relativeDistanceY: number
}

export const useRelativeMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState<RelativeMousePosition>({relativeDistanceX: 0, relativeDistanceY: 0});
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height / 2

      const relX = ev.clientX > centerX ? (ev.clientX - centerX) / centerX * 100 : -((centerX - ev.clientX) / centerX * 100)
      const relY = ev.clientY > centerY ? (ev.clientY - centerY) / centerY * 100 : -((centerY - ev.clientY) / centerY * 100)

      setMousePosition({relativeDistanceX: relX, relativeDistanceY: relY});
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
