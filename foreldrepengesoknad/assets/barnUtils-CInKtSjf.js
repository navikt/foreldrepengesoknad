import{d as n,h as m,i as a,D as i,I as g}from"./Tidsperioden-BXZJ7Xx1.js";import"./jsx-runtime-DoxjgJx5.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{x as l,y as F,z as c}from"./index-BUeOcrf5.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";n.extend(m);const j=e=>l(e)||F(e)?e.fødselsdatoer[0]:c(e)?e.termindato:e.adopsjonsdato,k=(e,t)=>e!==void 0&&t!==void 0?e.find(s=>n(s).isSame(t))!==void 0:!1,I=(e,t)=>t.length>0&&!c(e)?t.filter(s=>{var r;return((r=e.fnr)==null?void 0:r.includes(s.fnr))||k(e.fødselsdatoer,s.fødselsdato)}):void 0,O=e=>l(e)||c(e)?e.termindato:void 0,_=e=>l(e)?e.fødselsdatoer[0]:void 0,E=e=>{const t=n(new Date).subtract(3,"month");return e.dødsdato!==void 0&&n.utc(e.dødsdato).isBefore(t,"day")},p=(e,t)=>e===1?a(t,"barn"):e===2?a(t,"tvillinger"):e===3?a(t,"trillinger"):a(t,"flerlinger"),U=e=>!e.dødsdato,$=(e,t,s)=>{const r=n.utc(t).subtract(1,"day"),d=n.utc(t).add(1,"day");return s.filter(o=>o.fnr!==e&&n.utc(o.fødselsdato).isSameOrAfter(r,"day")&&n.utc(o.fødselsdato).isSameOrBefore(d,"day"))},v=(e,t,s,r)=>{if(e!==void 0)return a(r,"velkommen.barnVelger.adoptertBarn",{adopsjonsdato:n(e).format(i)});{const d=h(t),o=p(s,r);return t!==void 0&&t.length>0?a(r,"velkommen.barnVelger.fødtBarn.barn",{barnTekst:o,fødselsdato:d}):""}},x=(e,t,s,r,d,o)=>{if(e===void 0||e.length===0||!r)return v(s,t,d,o);if(e.length>1){const f=e.slice(0,-1).join(", "),u=e[e.length-1];return`${f} og ${u}`}return`${e[0]}`},h=e=>{if(e===void 0)return;const t=[];if(e.forEach(s=>{if(t.find(d=>n(d).isSame(s,"day"))===void 0){const d=n(s).format(g);t.push(d)}}),t.length>1){const s=t.map(o=>n(o).format(i)),r=s.slice(0,-1).join(", "),d=s[s.length-1];return`${r} og ${d}`}return n(t[0]).format(i)};export{E as a,U as b,p as c,h as d,j as e,x as f,$ as g,O as h,I as i,_ as j,v as k};
