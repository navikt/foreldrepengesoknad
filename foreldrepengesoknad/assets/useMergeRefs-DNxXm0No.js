import{a,r as s}from"./index-BP8_t0zE.js";function b(t,e){const n=Object.entries(t).filter(([u])=>!e.includes(u));return Object.fromEntries(n)}let c=0;function r(t){const[e,n]=s.useState(t),u=t||e;return s.useEffect(()=>{e==null&&(c+=1,n(`aksel-id-${c}`))},[e]),u}const l=a.useId;function m(t){var e;if(l!==void 0){const n=l();return t??n.replace(/(:)/g,"")}return(e=r(t))!==null&&e!==void 0?e:""}let o=0;function d(t){const[e,n]=s.useState(t),u=t||e;return s.useEffect(()=>{e==null&&(o+=1,n(`aksel-icon-${o}`))},[e]),u}const f=a.useId;function g(t){var e;return f!==void 0?f().replace(/(:)/g,""):(e=d(t))!==null&&e!==void 0?e:""}function i(t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}function p(...t){return a.useCallback(i(t),t)}export{m as a,p as b,i as m,b as o,g as u};
