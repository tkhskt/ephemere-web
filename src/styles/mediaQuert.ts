import {css, SerializedStyles} from "@emotion/react";

export const breakpoints = [576, 768, 992, 1200]

export const sp = (style: SerializedStyles) => css`@media (max-width: 1024px) {
  ${style}
}`
