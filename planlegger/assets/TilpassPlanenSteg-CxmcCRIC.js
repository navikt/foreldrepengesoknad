import{r as y,$ as U,a0 as E,j as e,X as m,ah as B,a9 as G,aa as d,aH as C,a2 as H,aT as z,ab as b,aq as $,aU as J,aV as X,aW as W,aI as Q,aX as Y,aO as Z}from"./iframe-DZpxDa0l.js";import{c as ee,e as te,u,g as ae,f as re,C as l,h as ne}from"./usePlanleggerNavigator-Bh1hlAp6.js";import{l as se,e as le,j as oe,m as ie}from"./HvemPlanleggerUtils-BRcLn0pn.js";import{m as ue}from"./barnetUtils-D07ITfCX.js";import{u as me,a as de,b as ge}from"./hvemHarRettUtils-BlA4wVQ-.js";import{u as pe}from"./useLagUttaksplanForslag-DcKPXJfX.js";import{u as Ee}from"./useScrollBehaviour-TpySfiis.js";import{P as ce}from"./PlanleggerStepPage-B-T8zz3R.js";import{T as c}from"./ToggleGroup-CLbOoDh8.js";import{b as ve}from"./BarnehageplassSteg-AT1gixR-.js";import{H as Te}from"./HvaErMulig-B5WG3PwR.js";var ke=function(t,s){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&s.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)s.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(a[r[n]]=t[r[n]]);return a};const Re=y.forwardRef((t,s)=>{var{title:a,titleId:r}=t,n=ke(t,["title","titleId"]);let i=U();return i=a?r||"title-"+i:void 0,E.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":i},n),a?E.createElement("title",{id:i},a):null,E.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),D=({setVisningsmodus:t})=>{const s=a=>{t(a)};return e.jsxs(c,{defaultValue:"liste",variant:"neutral",onChange:a=>s(a),label:e.jsx(m,{id:"PlanvisningToggle.velgVisningsmodus"}),children:[e.jsxs(c.Item,{value:"liste",children:[e.jsx(Re,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.liste"})]}),e.jsxs(c.Item,{value:"kalender",children:[e.jsx(B,{"aria-hidden":!0}),e.jsx(m,{id:"PlanvisningToggle.kalender"})]})]})};D.__docgenInfo={description:"",methods:[],displayName:"PlanvisningToggle",props:{setVisningsmodus:{required:!0,tsType:{name:"Dispatch",elements:[{name:"SetStateAction",elements:[{name:"union",raw:"'liste' | 'kalender'",elements:[{name:"literal",value:"'liste'"},{name:"literal",value:"'kalender'"}]}],raw:"SetStateAction<Visningsmodus>"}],raw:"Dispatch<SetStateAction<Visningsmodus>>"},description:""}}};const Se=({stønadskontoer:t})=>{const s=G(),a=ee(),r=te(),[n,i]=y.useState("liste");Ee();const o=d(u(l.HVEM_PLANLEGGER)),g=d(u(l.OM_BARNET)),O=d(u(l.HVOR_LANG_PERIODE)),v=d(u(l.ARBEIDSSITUASJON)),h=u(l.FORDELING),T=u(l.UTTAKSPLAN),P=ae(),j=re(l.UTTAKSPLAN),x=t[100],F=t[80],k=O.dekningsgrad==="100"?x:F,I=ve(g),K=se(o),p=me(v),R=le(o),L=de(p,o)||ge(p,o),A=oe(o,p),_=h!==void 0,w=ie(o,s),M=f=>{j(f);const N={...P,[l.UTTAKSPLAN]:f},V=ne(JSON.stringify(N)),q=`${globalThis.location.pathname}?data=${V}`;globalThis.history.replaceState(null,"",q)},S=pe(k);return e.jsx(ce,{steps:r,goToStep:a.goToNextStep,children:e.jsx(C,{barn:ue(g),erFarEllerMedmor:A,navnPåForeldre:w,modus:"planlegger",valgtStønadskonto:k,aleneOmOmsorg:R,erMedmorDelAvSøknaden:K,bareFarMedmorHarRett:L,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:_,saksperioder:T??[...S.søker1,...S.søker2],children:e.jsxs(H,{gap:"space-24",children:[e.jsxs(z,{variant:"info",children:[e.jsx(b,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tittel"})}),e.jsx($,{children:e.jsx(m,{id:"TilpassPlanenSteg.SavnerDuNoe.Tekst"})})]}),e.jsx(b,{size:"medium",spacing:!0,level:"2",children:e.jsx(m,{id:"TilpassPlanenSteg.Tittel",values:{erAleneforsørger:R}})}),e.jsx(Te,{hvemPlanlegger:o,arbeidssituasjon:v,barnet:g}),e.jsx(D,{setVisningsmodus:i}),e.jsxs(J,{oppdaterUttaksplan:M,harEndretPlan:T!==void 0,children:[e.jsx(X,{}),n==="liste"&&e.jsx(W,{}),n==="kalender"&&e.jsx(Q,{readOnly:!1,barnehagestartdato:I})]}),e.jsx(Y,{visStatusIkoner:!0}),e.jsx(Z,{goToPreviousStep:a.goToPreviousDefaultStep,nextButtonOnClick:a.goToNextDefaultStep,useSimplifiedTexts:!0})]})})})};Se.__docgenInfo={description:"",methods:[],displayName:"TilpassPlanenSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
