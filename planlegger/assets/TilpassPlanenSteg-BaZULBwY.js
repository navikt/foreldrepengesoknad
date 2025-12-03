import{r as T,$ as G,a0 as E,j as e,X as m,ah as C,a9 as H,aa as d,aH as z,a2 as $,aX as J,ab as O,aq as X,aY as Y,aZ as Z,a_ as Q,aI as W,a$ as ee,aS as te}from"./iframe-DQW4fLSv.js";import{c as ae,e as re,u,g as ne,f as se,C as l,h as le}from"./usePlanleggerNavigator-C2_RByF1.js";import{l as oe,e as ie,j as ue,m as me}from"./HvemPlanleggerUtils-AYK1kYYu.js";import{m as de}from"./barnetUtils-BYFd3jIs.js";import{u as ge,a as pe,b as ce}from"./hvemHarRettUtils-7JTBnPyp.js";import{u as Ee}from"./useLagUttaksplanForslag-oLZO3pJD.js";import{u as ve}from"./useScrollBehaviour-xX9W-mIF.js";import{P as Te}from"./PlanleggerStepPage-BtnhxELg.js";import{T as v}from"./ToggleGroup-C0C9PYSW.js";import{b as ke}from"./BarnehageplassSteg-Zw86qFYE.js";import{H as Re}from"./HvaErMulig-DrR8W9pE.js";var fe=function(t,s){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&s.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)s.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(a[r[n]]=t[r[n]]);return a};const Se=T.forwardRef((t,s)=>{var{title:a,titleId:r}=t,n=fe(t,["title","titleId"]);let i=G();return i=a?r||"title-"+i:void 0,E.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":i},n),a?E.createElement("title",{id:i},a):null,E.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),D=({setVisningsmodus:t})=>{const s=a=>{t(a)};return e.jsxs(v,{defaultValue:"liste",variant:"neutral",onChange:a=>s(a),label:e.jsx(m,{id:"PlanvisningToggle.velgVisningsmodus"}),children:[e.jsxs(v.Item,{value:"liste",children:[e.jsx(Se,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.liste"})]}),e.jsxs(v.Item,{value:"kalender",children:[e.jsx(C,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.kalender"})]})]})};D.__docgenInfo={description:"",methods:[],displayName:"PlanvisningToggle",props:{setVisningsmodus:{required:!0,tsType:{name:"Dispatch",elements:[{name:"SetStateAction",elements:[{name:"union",raw:"'liste' | 'kalender'",elements:[{name:"literal",value:"'liste'"},{name:"literal",value:"'kalender'"}]}],raw:"SetStateAction<Visningsmodus>"}],raw:"Dispatch<SetStateAction<Visningsmodus>>"},description:""}}};const be=({stønadskontoer:t})=>{const s=H(),a=ae(),r=re(),[n,i]=T.useState("liste");ve();const o=d(u(l.HVEM_PLANLEGGER)),g=d(u(l.OM_BARNET)),h=d(u(l.HVOR_LANG_PERIODE)),k=d(u(l.ARBEIDSSITUASJON)),j=u(l.FORDELING),R=u(l.UTTAKSPLAN),P=ne(),x=se(l.UTTAKSPLAN),F=t[100],I=t[80],f=h.dekningsgrad==="100"?F:I,K=ke(g),L=oe(o),p=ge(k),S=ie(o),A=pe(p,o)||ce(p,o),_=ue(o,p),w=j!==void 0,M=me(o,s),N=y=>{x(y);const q={...P,[l.UTTAKSPLAN]:y},U=le(JSON.stringify(q)),B=`${globalThis.location.pathname}?data=${U}`;globalThis.history.replaceState(null,"",B)},b=Ee(f),c=T.useRef(null),V=()=>{c.current&&c.current.scrollIntoView({behavior:"smooth",block:"start"})};return e.jsx(Te,{steps:r,goToStep:a.goToNextStep,children:e.jsx(z,{barn:de(g),erFarEllerMedmor:_,navnPåForeldre:M,modus:"planlegger",valgtStønadskonto:f,aleneOmOmsorg:S,erMedmorDelAvSøknaden:L,bareFarMedmorHarRett:A,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:w,saksperioder:R??[...b.søker1,...b.søker2],children:e.jsxs($,{gap:"space-24",children:[e.jsxs(J,{variant:"info",children:[e.jsx(O,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tittel"})}),e.jsx(X,{children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tekst"})})]}),e.jsx(O,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.Tittel",values:{erAleneforsørger:S}})}),e.jsx(Re,{hvemPlanlegger:o,arbeidssituasjon:k,barnet:g}),e.jsx(D,{setVisningsmodus:i}),e.jsxs(Y,{oppdaterUttaksplan:N,harEndretPlan:R!==void 0,children:[e.jsx(Z,{}),n==="liste"&&e.jsx(Q,{}),n==="kalender"&&e.jsx(W,{readOnly:!1,barnehagestartdato:K,scrollToKvoteOppsummering:V})]}),e.jsx("div",{ref:c,children:e.jsx(ee,{visStatusIkoner:!0})}),e.jsx(te,{goToPreviousStep:a.goToPreviousDefaultStep,nextButtonOnClick:a.goToNextDefaultStep,useSimplifiedTexts:!0})]})})})};be.__docgenInfo={description:"",methods:[],displayName:"TilpassPlanenSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{be as T};
