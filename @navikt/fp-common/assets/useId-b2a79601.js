import{R as o,r as u}from"./index-f1f749bf.js";let n=0;function c(t){const[e,a]=u.useState(t),l=t||e;return u.useEffect(()=>{e==null&&(n+=1,a(`aksel-id-${n}`))},[e]),l}const s=o["useId"];function I(t){var e;if(s!==void 0){const a=s();return t??a.replace(/(:)/g,"")}return(e=c(t))!==null&&e!==void 0?e:""}export{I as u};
//# sourceMappingURL=useId-b2a79601.js.map
