import{j as e}from"./tslib.es6-D_L490Ab.js";import{r as o}from"./index-CTjT7uj6.js";import{u as v,H as b,M as r,B as d,a as y}from"./Button-B1PUoZR5.js";import{V as l,G as C,l as i,H as S,j as N}from"./Uttaksdagen-BvdO4nAB.js";import{b as M,L as I,A as E}from"./CalendarLabel-Ckvd77Xp.js";import{b as P,C as R,a as A}from"./routes-DqIFKQUo.js";import{C as F}from"./ConfirmationPanel-7qx-JVBg.js";const z=({mellomlagreSøknadOgNaviger:c,setHarGodkjentVilkår:m,harGodkjentVilkår:x,locale:f,onChangeLocale:j})=>{const t=v(),a=N("forside"),p=P(R.APP_ROUTE),[g,h]=o.useState(!1),[n,u]=o.useState(x),k=()=>{n?(m(!0),p(A.BARNET),c()):h(!0)};return e.jsx(M,{children:e.jsxs(l,{gap:"10",children:[e.jsx(I,{locale:f,availableLocales:["nb","nn"],toggleLanguage:s=>j(s)}),e.jsxs(l,{gap:"8",children:[e.jsx(b,{size:"xlarge",className:`${a.element("tittel")}`,children:e.jsx(r,{id:"forside.tittel"})}),e.jsxs(C,{poster:!0,children:[e.jsx(d,{size:"medium",children:e.jsx(r,{id:"forside.guidepanel"})}),e.jsxs("ul",{className:`${a.element("liste")}`,children:[e.jsx("li",{children:e.jsx(r,{id:"forside.guidepanel.punkt1"})}),e.jsx("li",{children:e.jsx(r,{id:"forside.guidepanel.punkt2"})}),e.jsx("li",{children:e.jsx(r,{id:"forside.guidepanel.punkt3"})})]}),e.jsx(r,{id:"forside.guidepanel.lesMer",values:{a:s=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:i.svangerskapspenger,children:s})}})]}),e.jsx(E,{variant:"info",children:e.jsxs(l,{gap:"4",children:[e.jsx("div",{children:e.jsx(r,{id:"forside.tilrettelegging.info.del1",values:{a:s=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:i.tilretteleggingsskjema,children:s})}})}),e.jsx("div",{children:e.jsx(r,{id:"forside.tilrettelegging.info.del2",values:{a:s=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:i.slikSøkerDuSvp,children:s})}})})]})}),e.jsxs(F,{label:t.formatMessage({id:"forside.samtykke"}),onChange:()=>u(s=>!s),checked:n,error:g&&!n&&t.formatMessage({id:"forside.valideringsfeil.harForståttRettigheterOgPlikter"}),children:[e.jsx(d,{size:"medium",children:t.formatMessage({id:"forside.samtykkeIntro"})}),e.jsxs("ul",{className:`${a.element("liste")}`,children:[e.jsx("li",{children:e.jsx(r,{id:"forside.samtykkeIntro.punkt1"})}),e.jsx("li",{children:e.jsx(r,{id:"forside.samtykkeIntro.punkt2",values:{a:s=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:i.rettOgPlikt,children:s})}})})]})]}),e.jsx(S,{justify:"center",children:e.jsx(y,{type:"button",onClick:k,children:e.jsx(r,{id:"forside.begynnMedSøknad"})})})]})]})})};z.__docgenInfo={description:"",methods:[],displayName:"Forside"};export{z as F};
