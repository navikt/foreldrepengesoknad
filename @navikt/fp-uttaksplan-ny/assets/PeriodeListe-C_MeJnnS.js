import{j as a}from"./jsx-runtime-CLpGMVip.js";import{T as g,f as n,i as h,e as x,g as E,h as F,j,k as U,l as f,n as y,u as k,c as A,A as S,P as c,m as T}from"./PeriodeListeItem-DIJdZX3j.js";import{r as I}from"./index-CR__hKHy.js";const O=(i,s,r)=>!s||!i?!1:!!(f(i.tidsperiode.tom).isBefore(r)&&f(s.tom).isBefore(r)),L=(i,s,r)=>!s||!i?!1:!!(f(i.tidsperiode.fom).isSameOrAfter(r)&&f(s.fom).isSameOrAfter(r)),v=(i,s,r)=>L(i,s,r)||O(i,s,r),D=(i,s)=>{const r=[];if(i.length===0)return r;let t,d,o=!1;return i.forEach((e,P)=>{const l=P+1;let m;if(o){o=!1;return}l<i.length?m=i[l]:m=void 0;const p=v(t,e,s);if(m!==void 0&&(o=g({fom:e.fom,tom:e.tom}).erLik({fom:m.fom,tom:m.tom})),o&&m!==void 0){t={perioder:[{...e},{...m}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)},samtidigUttak:!0},r.push(t),t=void 0,d=void 0,o=!0;return}if(h(e)||x(e)||E(e)){const u=e.forelder;t?d===e.forelder&&p?(t.perioder=[...t.perioder,{...e}],t.tidsperiode.tom=n(e.tom)):t={forelder:u,perioder:[{...e}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)}}:t={forelder:u,perioder:[{...e}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)},samtidigUttak:!!e.samtidigUttak},r.includes(t)||r.push(t),d=e.forelder;return}F(e)&&(t={perioder:[{...e}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)},erPeriodeUtenUttak:!0},r.push(t),d=void 0,t=void 0),j(e)&&(t={perioder:[{...e}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)},erUtsettelse:!0},r.push(t),d=void 0,t=void 0),U(e)&&(t={perioder:[{...e}],tidsperiode:{fom:n(e.fom),tom:n(e.tom)},erHull:!0},r.push(t),d=void 0,t=void 0)}),r},b=(i,s)=>i.findIndex(r=>T(r.tidsperiode)&&f(r.tidsperiode.fom).isSameOrAfter(s,"d")),H=({perioder:i,handleUpdatePeriode:s})=>{const r=y(k(A.FAMILIEHENDELSEDATO)),t=D(i,r),d=b(t,r);return a.jsx("div",{children:a.jsx(S,{children:t.map((o,e)=>a.jsxs(I.Fragment,{children:[d===e?a.jsx(c,{handleUpdatePeriode:s,permisjonsperiode:o,erFamiliehendelse:!0}):null,a.jsx(c,{handleUpdatePeriode:s,permisjonsperiode:o})]},`${o.tidsperiode.fom}-${o.tidsperiode.tom}`))})})};H.__docgenInfo={description:"",methods:[],displayName:"PeriodeListe",props:{perioder:{required:!0,tsType:{name:"Array",elements:[{name:"Planperiode"}],raw:"Planperiode[]"},description:""},handleUpdatePeriode:{required:!0,tsType:{name:"signature",type:"function",raw:"(oppdatertPeriode: Planperiode) => void",signature:{arguments:[{type:{name:"Planperiode"},name:"oppdatertPeriode"}],return:{name:"void"}}},description:""}}};export{H as P};
