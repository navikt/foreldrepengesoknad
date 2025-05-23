import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as C,a as N,b as y,C as k,c as G}from"./usePlanleggerNavigator-CE_6AcPv.js";import{P as U}from"./PlanleggerStepPage-ChY5fp_x.js";import{u as z,R as V,f as K,S as L}from"./StepButtonsHookForm-DAulkPa7.js";import{u as R,h as _,B as h,M as l,H as J,a as W}from"./VeiviserPage-CHSQEW6u.js";import{D as Q}from"./Dekningsgrad-Bg_cIyqc.js";import{e as O,g as X,c as Y,H as Z,f as $,a as ee}from"./HvemPlanleggerUtils-BYHEAsy1.js";import{f as re}from"./customErrorFormatter-AuWeTsWn.js";import{u as te}from"./hvemHarRettUtils-C8lIuyXR.js";import{d as ne,f as D}from"./uttakUtils-T6Bng2AV.js";import{r as F}from"./index-DQLiH3RP.js";import{u as ae}from"./useScrollBehaviour-CPpBIkgK.js";import{n as j}from"./validation-Dy1ue2_T.js";import{i as oe}from"./dateFormValidation-DphE57k6.js";import{e as se}from"./barnetUtils-DYBBskKi.js";import{c as M}from"./stringUtils-DApHD7Y2.js";import{u as ie,V as T}from"./VStack-05Ww9A8B.js";import{S as le}from"./Responsive-CnWLTDCQ.js";import{S as de}from"./Spacer-C5GDfzOr.js";var ue=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(r);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(r,a[s])&&(n[a[s]]=r[a[s]]);return n};const ge=F.forwardRef((r,t)=>{var{title:n,titleId:a}=r,s=ue(r,["title","titleId"]);let o=ie();return o=n?a||"title-"+o:void 0,F.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},s),n?F.createElement("title",{id:o},n):null,F.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),w=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:s})=>{const o=R(),i=r.antallBarn,g=r.erFødsel,u=se(r),{startdatoPeriode1:f,sluttdatoPeriode1:v,startdatoPeriode2:S,sluttdatoPeriode2:m,familiehendelsedato:b}=n,p=o.formatDate(b,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(_,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(le,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(T,{gap:"2",children:[e.jsxs(h,{children:[g&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:u,dato:p,erMorDelAvSøknaden:O(t),erFlereBarn:i!=="1"}}),!g&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:i,dato:p,erMorDelAvSøknaden:O(t)}})]}),e.jsx(h,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:M(a),fom:o.formatDate(f,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]}),s&&m&&e.jsx(h,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:M(s),fom:o.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(m,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]})};w.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},uttaksdata:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const me=r=>{const t=[];for(let n=0;n<=r.uker;n++){const a=r.uker-n>=n,s=a?r.dager:0,o=a?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-n,dager:a?r.dager:0,totaltAntallDager:(r.uker-n)*5+s},antallUkerOgDagerSøker2:{uker:n,dager:a?0:r.dager,totaltAntallDager:n*5+o}})}return t},A=(r,t,n,a,s,o)=>{const i=n.type===Z.FAR_OG_FAR,g=i&&a?a:$(r,n),u=i&&s?s:ee(r,n);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:g,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:g,hvem2:u,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},pe=({stønadskontoer:r})=>{const t=R(),n=C(),a=N(),s=y(k.FORDELING),{dekningsgrad:o}=j(y(k.HVOR_LANG_PERIODE)),i=j(y(k.HVEM_PLANLEGGER)),g=j(y(k.ARBEIDSSITUASJON)),u=j(y(k.OM_BARNET)),f=G(k.FORDELING),v=z({defaultValues:s}),S=v.watch("antallDagerSøker1"),m=S?parseInt(S.toString(),10):void 0,b=c=>{f(c),n.goToNextDefaultStep()},p=r[o],d=ne(p),P=te(g),B=D(P,i,p,u,m),E=D(P,i,p,u,m),x=X(i,t),q=Y(i,t),{ref:H,scrollToBottom:I}=ae();return e.jsx(U,{ref:H,steps:a,goToStep:n.goToNextStep,children:e.jsx(V,{formMethods:v,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(T,{gap:"10",style:{flex:1},children:[e.jsxs(T,{gap:"8",children:[e.jsx(J,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(_,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(ge,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:d.uker,dager:d.dager,prosent:o}})})}),e.jsx(W,{isDarkBlue:s===void 0,children:e.jsx(K,{name:"antallDagerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:d.uker,dager:d.dager}}),autofocusWhenEmpty:!0,validate:[oe(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:re,onChange:I,children:me(d).map(c=>e.jsx("option",{value:c.antallUkerOgDagerSøker1.totaltAntallDager,children:A(t,c,i,x,q)},c.antallUkerOgDagerSøker1.totaltAntallDager))})}),m!==void 0&&e.jsx(w,{barnet:u,hvemPlanlegger:i,fornavnSøker1:x,fornavnSøker2:q,uttaksdata:o===Q.HUNDRE_PROSENT?B:E},m)]}),e.jsx(de,{}),e.jsx(L,{saveDataOnPreviousClick:f,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};A.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};pe.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{pe as F,A as f,me as g};
