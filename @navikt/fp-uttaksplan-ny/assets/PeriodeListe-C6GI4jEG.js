import{j as m}from"./jsx-runtime-CLpGMVip.js";import{T as h,f as o,i as p,e as x,g as E,h as F,j,k as U,l as a,n as k,u as A,c as S,A as y,P as c,m as I}from"./PeriodeListeItem-BoVluzuw.js";import{r as O}from"./index-9yPe82QC.js";const T=(s,i,t)=>!i||!s?!1:!!(a(s.tidsperiode.tom).isBefore(t)&&a(i.tom).isBefore(t)),L=(s,i,t)=>!i||!s?!1:!!(a(s.tidsperiode.fom).isSameOrAfter(t)&&a(i.fom).isSameOrAfter(t)),D=(s,i,t)=>L(s,i,t)||T(s,i,t),b=(s,i)=>{const t=[];if(s.length===0)return t;let r,n,d=!1;return s.forEach((e,P)=>{const l=P+1;let f;if(d){d=!1;return}l<s.length?f=s[l]:f=void 0;const g=D(r,e,i);if(f!==void 0&&(d=h({fom:e.fom,tom:e.tom}).erLik({fom:f.fom,tom:f.tom})),d&&f!==void 0){r={perioder:[{...e},{...f}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)},samtidigUttak:!0},t.push(r),r=void 0,n=void 0,d=!0;return}if(p(e)||x(e)||E(e)){const u=e.forelder;r?n===e.forelder&&g?(r.perioder=[...r.perioder,{...e}],r.tidsperiode.tom=o(e.tom)):r={forelder:u,perioder:[{...e}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)}}:r={forelder:u,perioder:[{...e}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)},samtidigUttak:!!e.samtidigUttak},t.includes(r)||t.push(r),n=e.forelder;return}F(e)&&(r={perioder:[{...e}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)},erPeriodeUtenUttak:!0},t.push(r),n=void 0,r=void 0),j(e)&&(r={perioder:[{...e}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)},erUtsettelse:!0},t.push(r),n=void 0,r=void 0),U(e)&&(r={perioder:[{...e}],tidsperiode:{fom:o(e.fom),tom:o(e.tom)},erHull:!0},t.push(r),n=void 0,r=void 0)}),t},v=(s,i)=>s.findIndex(t=>I(t.tidsperiode)&&a(t.tidsperiode.fom).isSameOrAfter(i,"d")),H=({perioder:s})=>{const i=k(A(S.FAMILIEHENDELSEDATO)),t=b(s,i),r=v(t,i);return m.jsx("div",{children:m.jsx(y,{children:t.map((n,d)=>m.jsxs(O.Fragment,{children:[r===d?m.jsx(c,{permisjonsperiode:n,erFamiliehendelse:!0}):null,m.jsx(c,{permisjonsperiode:n})]},`${n.tidsperiode.fom}-${n.tidsperiode.tom}`))})})};H.__docgenInfo={description:"",methods:[],displayName:"PeriodeListe",props:{perioder:{required:!0,tsType:{name:"Array",elements:[{name:"Planperiode"}],raw:"Planperiode[]"},description:""}}};export{H as P};
