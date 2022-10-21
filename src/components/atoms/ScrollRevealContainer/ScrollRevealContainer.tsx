import React, {CSSProperties, useEffect, useRef} from "react";
// @ts-ignore
import scrollReveal from "scrollreveal";

interface ScrollRevealProps {
  style: CSSProperties;
  children?: React.ReactNode,
}

const ScrollRevealContainer = (prop: ScrollRevealProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: false,
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={prop.style}
      className="container scroll-section"
      data-testid="section"
    >
      {prop.children}
    </section>
  );
};

export default ScrollRevealContainer
