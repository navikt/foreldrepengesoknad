import{i as l}from"./barnUtils-42471e8d.js";import{D as n}from"./Periodene-93f75033.js";import{b as a}from"./Perioden-756f4214.js";import{f as u}from"./uttaksPlanStatus-931b1d24.js";const E=(r,e)=>l(r)&&e?!!r.erUfør:!1,k=r=>l(r)&&!!r.harRettPåForeldrepengerIEØS,f=(r,e)=>e===2?r===n.HUNDRE_PROSENT?17:21:r===n.HUNDRE_PROSENT?46:56,R=(r,e,o)=>r.slice().filter(t=>a(t)&&t.ønskerFlerbarnsdager===!0).reduce((t,s)=>a(s)?u(s)+t:t,0)>f(e,o)*5;export{f as a,E as g,k as h,R as u};
