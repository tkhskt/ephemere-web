export const clh = (pxValue: number, baseHeight: number = 1080) => {
  return `max(${pxValue}px, ${(pxValue / baseHeight) * 100}vh)`
}

export const clw = (pxValue: number, baseWidth: number = 1920) => {
  return `max(${pxValue}px, ${(pxValue / baseWidth) * 100}vw)`
}

export const font = (pxValue: number) => {
  const defaultSize = 16;
  return `${pxValue / defaultSize}em`
}
