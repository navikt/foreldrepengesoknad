import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as g,H as S,M as a,B as x}from"./Label-DlDsESPM.js";import{U as N,b as h}from"./Uttaksdagen-Uuolrvsk.js";import"./index-CTjT7uj6.js";import{n as j,o as T}from"./Uttaksplan-BNLrPXqp.js";import{u as l,C as m}from"./FpDataContext-DbGuQRR8.js";import{g as u,a as v,f as n}from"./barnUtils-D91UoMPO.js";import{H as b,V as y}from"./VStack-CrTlUGgl.js";import{S as M}from"./BabyWrapped-BOgBzqLZ.js";const O=({minsterettUkerToTette:o})=>{const c=g(),i=h("infoOmNesteBarn"),f=j(l(m.OM_BARNET)),t=l(m.BARN_FRA_NESTE_SAK),s=t!==void 0?t.startdatoFørsteStønadsperiode:void 0,k=t!==void 0?t.familiehendelsesdato:void 0,p=u(f),r=v(p,k),B=[o,c.formatMessage({id:"uker"})].join(" "),d=s!==void 0?N(s).forrige():void 0;return e.jsx(T,{padding:"4",background:"surface-alt-3-subtle",className:i.block,children:e.jsxs(b,{justify:"space-between",align:"start",children:[e.jsxs(y,{gap:"2",style:{width:"85%"},children:[e.jsx(S,{size:"xsmall",children:r?e.jsx(a,{id:"infoOmSøknaden.toTette.finnesBarnMedNesteSak.tittel",values:{antallUkerToTette:o}}):e.jsx(a,{id:"infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak.tittel",values:{sisteUttaksdagDetteBarnet:n(d)}})}),e.jsx(x,{children:r?e.jsx(a,{id:"infoOmSøknaden.toTette.finnesBarnMedNesteSak",values:{startStønadsperiodeNyttBarn:n(s),minsterettAntallUker:e.jsx("strong",{children:B})}}):e.jsx(a,{id:"infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak",values:{startStønadsperiodeNyttBarn:n(s),sisteUttaksdagDetteBarnet:n(d)}})})]}),e.jsx("div",{className:i.element("ikon"),children:e.jsx(M,{height:24,width:24,color:"#005B82"})})]})})};O.__docgenInfo={description:"",methods:[],displayName:"InfoOmNesteBarn"};export{O as I};
