import{d as r,b as m,c as u,e as a}from"./Uttaksdagen-CHlL4_FN.js";import{I as g}from"./Tidsperioden-CRlAJzBJ.js";import"./tslib.es6-BMc9PpVS.js";import{i,h as F,j as f}from"./FpDataContext-wT6-gpAc.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";r.extend(m);const k=e=>i(e)||F(e)?e.fødselsdatoer[0]:f(e)?e.termindato:e.adopsjonsdato,j=e=>{const t=k(e);return g(t)},v=(e,t)=>e!==void 0&&t!==void 0?e.find(s=>r(s).isSame(t))!==void 0:!1,E=(e,t)=>t.length>0&&!f(e)?t.filter(s=>{var d;return((d=e.fnr)==null?void 0:d.includes(s.fnr))||v(e.fødselsdatoer,s.fødselsdato)}):void 0,I=e=>i(e)||f(e)?e.termindato:void 0,_=e=>i(e)?e.fødselsdatoer[0]:void 0,$=e=>{const t=r(new Date).subtract(3,"month");return e.dødsdato!==void 0&&r.utc(e.dødsdato).isBefore(t,"day")},M=(e,t)=>e===1?t.formatMessage({id:"barn"}):e===2?t.formatMessage({id:"tvillinger"}):e===3?t.formatMessage({id:"trillinger"}):t.formatMessage({id:"flerlinger"}),N=e=>!e.dødsdato,R=(e,t,s)=>{const d=r.utc(t).subtract(1,"day"),o=r.utc(t).add(1,"day");return s.filter(n=>n.fnr!==e&&r.utc(n.fødselsdato).isSameOrAfter(d,"day")&&r.utc(n.fødselsdato).isSameOrBefore(o,"day"))},h=(e,t,s,d)=>{if(e!==void 0)return d.formatMessage({id:"velkommen.barnVelger.adoptertBarn"},{adopsjonsdato:r(e).format(a)});{const o=p(t),n=M(s,d);return t!==void 0&&t.length>0?d.formatMessage({id:"velkommen.barnVelger.fødtBarn.barn"},{barnTekst:n,fødselsdato:o}):""}},U=(e,t,s,d,o,n)=>{if(e===void 0||e.length===0||!d)return h(s,t,o,n);if(e.length>1){const l=e.slice(0,-1).join(", "),c=e[e.length-1];return`${l} og ${c}`}return`${e[0]}`},p=e=>{if(e===void 0)return;const t=[];if(e.forEach(s=>{if(t.find(o=>r(o).isSame(s,"day"))===void 0){const o=r(s).format(u);t.push(o)}}),t.length>1){const s=t.map(n=>r(n).format(a)),d=s.slice(0,-1).join(", "),o=s[s.length-1];return`${d} og ${o}`}return r(t[0]).format(a)},V=(e,t)=>r(e.fødselsdato).isAfter(t.fødselsdato,"d")?1:r(e.fødselsdato).isBefore(t.fødselsdato,"d")||e.fornavn<t.fornavn?-1:1;export{M as a,p as b,R as c,$ as d,N as e,U as f,k as g,_ as h,I as i,E as j,h as k,j as l,V as s};
