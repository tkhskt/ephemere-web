import {css} from "@emotion/react";

export const LoadScript = `
  (function(d) {
    var config = {
      kitId: 'zsi6gvf',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
`

export const Serif = css`
  font-family: yu-mincho-pr6n, canto, sans-serif;
  font-weight: 400;
  font-style: normal;
`

export const Mincho = css`
  font-family: yu-mincho-pr6n, sans-serif;
  font-weight: 400;
  font-style: normal;
`

export const Canto = css`
  font-family: canto, serif;
  font-weight: 400;
  font-style: normal;
`

export const Adobe = css`
  font-family: adobe-text-pro, serif;
  font-weight: 600;
  font-style: normal;
`