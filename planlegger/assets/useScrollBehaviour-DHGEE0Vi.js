import{r as o}from"./index-CTjT7uj6.js";const l=()=>{const r=o.useRef(null),[e,t]=o.useState(0),s=()=>t(e+1);return o.useEffect(()=>{window.scrollTo(0,0)},[]),o.useEffect(()=>{r.current&&e>0&&r.current.scrollIntoView({behavior:"smooth",block:"nearest"})},[e]),{ref:r,scrollToBottom:s}};export{l as u};
