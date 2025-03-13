import{j as t}from"./jsx-runtime-CLpGMVip.js";import{u as Y,a as Z,b as c,C as u,c as ee}from"./usePlanleggerNavigator-DoSe4uGw.js";import{r as l}from"./index-CR__hKHy.js";import{M as g,u as te,m as ne,j,H as re,n as ae}from"./VeiviserPage-CwIKt0kk.js";import{b as se,h as oe,p as le,q as ie}from"./HvemPlanleggerUtils-Cqv6rjI4.js";import{u as de,h as ue,a as ge}from"./hvemHarRettUtils-CdMeQXRE.js";import{g as me,h as x,i as R}from"./uttakUtils-BjFDIM7q.js";import{U as pe,K as ce,S as fe,F as U,c as ke}from"./KvoteOppsummering-O6ls62CJ.js";import{u as Te}from"./useScrollBehaviour-Dvq8pEsj.js";import{U as Ee}from"./UttaksplanKalender-ChXOGUXB.js";import{n as k}from"./validation-DYlyn1BB.js";import"./dateFormValidation-BkjHqxMu.js";import{C as ve}from"./CalendarLabels-C_c5yWp5.js";import{P as je}from"./PlanleggerStepPage-A3ZacTbk.js";import{T as P}from"./ToggleGroup-DbddDmhW.js";import{u as L,V as S,H as Se}from"./VStack-2apmvZh_.js";import{S as he}from"./Responsive-B-Uwxu87.js";import{g as ye,m as D}from"./barnetUtils-DRwiTi7P.js";import{b as be}from"./BarnehageplassSteg-BDxn48O1.js";import{H as xe}from"./HvaErMulig-CrGq9_El.js";import{M as _}from"./StepButtonsHookForm-DUlXGW5Q.js";var Re=function(e,s){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&s.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};const Pe=l.forwardRef((e,s)=>{var{title:r,titleId:n}=e,a=Re(e,["title","titleId"]);let o=L();return o=r?n||"title-"+o:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},a),r?l.createElement("title",{id:o},r):null,l.createElement("path",{fill:"currentColor",d:"M16.03 3.97a.75.75 0 1 0-1.06 1.06l3.22 3.22H8a5.75 5.75 0 0 0 0 11.5h1.5a.75.75 0 0 0 0-1.5H8a4.25 4.25 0 0 1 0-8.5h10.19l-3.22 3.22a.75.75 0 0 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06z"}))});var _e=function(e,s){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&s.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};const Ae=l.forwardRef((e,s)=>{var{title:r,titleId:n}=e,a=_e(e,["title","titleId"]);let o=L();return o=r?n||"title-"+o:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},a),r?l.createElement("title",{id:o},r):null,l.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var h=(e=>(e.ÅTTI_PROSENT="80",e.HUNDRE_PROSENT="100",e))(h||{}),B=(e=>(e.UttakFellesperiodeAnnenForelder="FELLESPERIODE_ANNEN_FORELDER",e.UttakFedrekvoteAnnenForelder="FEDREKVOTE_ANNEN_FORELDER",e.UttakMødrekvoteAnnenForelder="MØDREKVOTE_ANNEN_FORELDER",e.UttakForeldrepengerAnnenForelder="FORELDREPENGER_ANNEN_FORELDER",e.Ingen="INGEN",e))(B||{}),y=(e=>(e.BARE_SØKER_RETT="BARE_SØKER_RETT",e.ALENEOMSORG="ALENEOMSORG",e.BEGGE_RETT="BEGGE_RETT",e))(y||{});const K=({setVisningsmodus:e})=>{const s=r=>{e(r)};return t.jsxs(P,{defaultValue:"liste",variant:"neutral",onChange:r=>s(r),children:[t.jsxs(P.Item,{value:"liste",children:[t.jsx(Ae,{"aria-hidden":!0}),t.jsx(g,{id:"Liste"})]}),t.jsxs(P.Item,{value:"kalender",children:[t.jsx(he,{"aria-hidden":!0}),t.jsx(g,{id:"Kalender"})]})]})};K.__docgenInfo={description:"",methods:[],displayName:"PlanvisningToggle",props:{setVisningsmodus:{required:!0,tsType:{name:"Dispatch",elements:[{name:"SetStateAction",elements:[{name:"union",raw:"'liste' | 'kalender'",elements:[{name:"literal",value:"'liste'"},{name:"literal",value:"'kalender'"}]}],raw:"SetStateAction<Visningsmodus>"}],raw:"Dispatch<SetStateAction<Visningsmodus>>"},description:""}}};const Ne="_calendar_wfn3i_1",Oe={calendar:Ne},Fe=({locale:e,stønadskontoer:s})=>{const[r,n]=l.useState(!1),a=te(),o=Y(e),H=Z(),[A,C]=l.useState("liste");Te();const d=k(c(u.HVEM_PLANLEGGER)),m=k(c(u.OM_BARNET)),G=k(c(u.HVOR_LANG_PERIODE)),N=k(c(u.ARBEIDSSITUASJON)),q=c(u.FORDELING),E=k(c(u.UTTAKSPLAN),"Uttaksplan ikke oppgitt"),V=k(c(u.ORIGINAL_UTTAKSPLAN),"Uttaksplan ikke oppgitt"),z=s[h.HUNDRE_PROSENT],J=s[h.ÅTTI_PROSENT],O=G.dekningsgrad===h.HUNDRE_PROSENT?z:J,$=be(m),f=E.length>0?E[E.length-1]:[],b=ee(u.UTTAKSPLAN),F=ye(m),v=de(N),Q=me(m),w=se(d),M=ue(v,d)||ge(v,d),i=oe(d,v),p=q!==void 0,W=()=>p?y.BEGGE_RETT:w?y.ALENEOMSORG:y.BARE_SØKER_RETT,X=T=>{const I=[...E];I.push(T),b(I)};return t.jsxs(je,{steps:H,goToStep:o.goToNextStep,children:[t.jsxs(_,{open:r,onClose:()=>n(!1),header:{heading:a.formatMessage({id:"TilpassPlanenSteg.FjernAlt.Modal.Tittel"}),size:"small",closeButton:!1},width:"small",children:[t.jsx(_.Body,{children:t.jsx(ne,{children:t.jsx(g,{id:"TilpassPlanenSteg.FjernAlt.Modal.Body"})})}),t.jsxs(_.Footer,{children:[t.jsx(j,{type:"button",variant:"danger",onClick:()=>{b([]),n(!1)},children:t.jsx(g,{id:"TilpassPlanenSteg.FjernAlt.Modal.Knapp.Bekreft"})}),t.jsx(j,{type:"button",variant:"secondary",onClick:()=>n(!1),children:t.jsx(g,{id:"TilpassPlanenSteg.FjernAlt.Modal.Knapp.Avbryt"})})]})]}),t.jsxs(S,{gap:"6",children:[t.jsx(re,{size:"medium",spacing:!0,level:"2",children:t.jsx(g,{id:"TilpassPlanenSteg.Tittel",values:{erAleneforsørger:w}})}),t.jsxs(S,{gap:"5",children:[t.jsx(xe,{hvemPlanlegger:d,arbeidssituasjon:N,barnet:m}),t.jsx(S,{gap:"10",children:t.jsx(K,{setVisningsmodus:C})}),A==="liste"&&t.jsxs(t.Fragment,{children:[t.jsx(pe,{familiehendelsedato:Q,bareFarHarRett:M,erFarEllerMedmor:i,familiesituasjon:F,gjelderAdopsjon:F==="adopsjon",navnPåForeldre:{farMedmor:le(d,a)||"Annen forelder",mor:ie(d,a)},førsteUttaksdagNesteBarnsSak:void 0,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:x(p,f,i),annenPartsPerioder:R(p,f,i),barn:D(m),handleOnPlanChange:X,modus:"planlegger",valgtStønadskonto:O}),t.jsx(ce,{visStatusIkoner:!0,konto:O,perioder:[...x(p,f,i),...R(p,f,i).map(T=>T.kontoType===fe.Fellesperiode?{...T,kontoType:void 0,oppholdÅrsak:B.UttakFellesperiodeAnnenForelder}:T)],rettighetType:W(),forelder:i?U.farMedmor:U.mor})]})]}),t.jsxs(S,{gap:"5",children:[A==="kalender"&&t.jsx("div",{className:Oe.calendar,children:t.jsx(Ee,{bareFarHarRett:M,erFarEllerMedmor:i,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:x(p,f,i),annenPartsPerioder:R(p,f,i),navnAnnenPart:"Test",barn:D(m),planleggerLegend:t.jsx(ve,{hvemPlanlegger:d,barnet:m,hvemHarRett:v}),barnehagestartdato:$})}),t.jsxs(Se,{gap:"4",children:[t.jsx(j,{size:"xsmall",variant:"secondary",icon:t.jsx(Pe,{"aria-hidden":!0,height:24,width:24}),onClick:()=>{b([V])},children:t.jsx(g,{id:"TilpassPlanenSteg.Tilbakestill"})}),t.jsx(j,{size:"xsmall",variant:"secondary",icon:t.jsx(ke,{"aria-hidden":!0,height:24,width:24}),onClick:()=>n(!0),children:t.jsx(g,{id:"TilpassPlanenSteg.FjernAlt"})})]})]}),t.jsx(ae,{goToPreviousStep:o.goToPreviousDefaultStep,nextButtonOnClick:o.goToNextDefaultStep,useSimplifiedTexts:!0})]})]})};Fe.__docgenInfo={description:"",methods:[],displayName:"TilpassPlanenSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{Fe as T};
