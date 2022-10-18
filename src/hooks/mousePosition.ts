import React from 'react';

type MousePosition = {
  x: number | null
  y: number | null
}

export const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState<MousePosition>({x: null, y: null});
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({x: ev.clientX, y: ev.clientY});
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
