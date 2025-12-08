import{r as T,a0 as G,a1 as E,j as e,Y as m,ai as C,aa as H,ab as d,aI as z,a3 as J,aY as $,ac as O,ar as Y,aZ as Z,a_ as Q,a$ as W,aJ as X,b0 as ee,aT as te}from"./iframe-DN35LVIV.js";import{c as re,e as ae,u,g as ne,f as se,C as l,h as le}from"./usePlanleggerNavigator-L6Xh66-e.js";import{l as oe,e as ie,j as ue,m as me}from"./HvemPlanleggerUtils-DRYgFI_s.js";import{m as de}from"./barnetUtils-CR2x_0yo.js";import{u as ge,a as pe,b as ce}from"./hvemHarRettUtils-D_8Mk0gQ.js";import{u as Ee}from"./useLagUttaksplanForslag-D731izpo.js";import{u as ve}from"./useScrollBehaviour-CSaQ_eYz.js";import{P as Te}from"./PlanleggerStepPage-BpUw_6uF.js";import{T as v}from"./ToggleGroup-Do6XzpXa.js";import{b as ke}from"./BarnehageplassSteg-BoYGF9rk.js";import{H as Re}from"./HvaErMulig-mUwPm_17.js";var fe=function(t,s){var r={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&s.indexOf(a)<0&&(r[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(t);n<a.length;n++)s.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(t,a[n])&&(r[a[n]]=t[a[n]]);return r};const be=T.forwardRef((t,s)=>{var{title:r,titleId:a}=t,n=fe(t,["title","titleId"]);let i=G();return i=r?a||"title-"+i:void 0,E.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":i},n),r?E.createElement("title",{id:i},r):null,E.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),D=({setVisningsmodus:t})=>{const s=r=>{t(r)};return e.jsxs(v,{defaultValue:"liste",variant:"neutral",onChange:r=>s(r),label:e.jsx(m,{id:"PlanvisningToggle.velgVisningsmodus"}),children:[e.jsxs(v.Item,{value:"liste",children:[e.jsx(be,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.liste"})]}),e.jsxs(v.Item,{value:"kalender",children:[e.jsx(C,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.kalender"})]})]})};D.__docgenInfo={description:"",methods:[],displayName:"PlanvisningToggle",props:{setVisningsmodus:{required:!0,tsType:{name:"Dispatch",elements:[{name:"SetStateAction",elements:[{name:"union",raw:"'liste' | 'kalender'",elements:[{name:"literal",value:"'liste'"},{name:"literal",value:"'kalender'"}]}],raw:"SetStateAction<Visningsmodus>"}],raw:"Dispatch<SetStateAction<Visningsmodus>>"},description:""}}};const Se=({stønadskontoer:t})=>{const s=H(),r=re(),a=ae(),[n,i]=T.useState("liste");ve();const o=d(u(l.HVEM_PLANLEGGER)),g=d(u(l.OM_BARNET)),h=d(u(l.HVOR_LANG_PERIODE)),k=d(u(l.ARBEIDSSITUASJON)),j=u(l.FORDELING),R=u(l.UTTAKSPLAN),P=ne(),x=se(l.UTTAKSPLAN),F=t[100],I=t[80],f=h.dekningsgrad==="100"?F:I,K=ke(g),L=oe(o),p=ge(k),b=ie(o),A=pe(p,o)||ce(p,o),_=ue(o,p),w=j!==void 0,M=me(o,s),N=y=>{x(y);const q={...P,[l.UTTAKSPLAN]:y},U=le(JSON.stringify(q)),B=`${globalThis.location.pathname}?data=${U}`;globalThis.history.replaceState(null,"",B)},S=Ee(f),c=T.useRef(null),V=()=>{c.current&&c.current.scrollIntoView({behavior:"smooth",block:"start"})};return e.jsx(Te,{steps:a,goToStep:r.goToNextStep,children:e.jsx(z,{barn:de(g),erFarEllerMedmor:_,navnPåForeldre:M,modus:"planlegger",valgtStønadskonto:f,aleneOmOmsorg:b,erMedmorDelAvSøknaden:L,bareFarMedmorHarRett:A,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:w,saksperioder:R??[...S.søker1,...S.søker2],children:e.jsxs(J,{gap:"space-24",children:[e.jsxs($,{variant:"info",children:[e.jsx(O,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tittel"})}),e.jsx(Y,{children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tekst"})})]}),e.jsx(O,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.Tittel",values:{erAleneforsørger:b}})}),e.jsx(Re,{hvemPlanlegger:o,arbeidssituasjon:k,barnet:g}),e.jsx(D,{setVisningsmodus:i}),e.jsxs(Z,{oppdaterUttaksplan:N,harEndretPlan:R!==void 0,children:[e.jsx(Q,{}),n==="liste"&&e.jsx(W,{}),n==="kalender"&&e.jsx(X,{readOnly:!1,barnehagestartdato:K,scrollToKvoteOppsummering:V})]}),e.jsx("div",{ref:c,children:e.jsx(ee,{visStatusIkoner:!0})}),e.jsx(te,{goToPreviousStep:r.goToPreviousDefaultStep,nextButtonOnClick:r.goToNextDefaultStep,useSimplifiedTexts:!0})]})})})};Se.__docgenInfo={description:"",methods:[],displayName:"TilpassPlanenSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    80: KontoBeregningDto;
    100: KontoBeregningDto;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{Se as T};
