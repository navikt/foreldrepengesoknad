import{R as o,r as a}from"./index-DVXBtNgz.js";function i(t,e){return Object.entries(t).filter(([s])=>!e.includes(s)).reduce((s,[n,r])=>Object.assign(Object.assign({},s),{[n]:r}),{})}let u=0;function d(t){const[e,s]=a.useState(t),n=t||e;return a.useEffect(()=>{e==null&&(u+=1,s(`aksel-id-${u}`))},[e]),n}const c=o.useId;function f(t){var e;return c!==void 0?c().replace(/(:)/g,""):(e=d(t))!==null&&e!==void 0?e:""}export{i as o,f as u};
