import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as C,a as H,b as y,C as k,c as N}from"./usePlanleggerNavigator-bfolbdq0.js";import{P as G}from"./PlanleggerStepPage-B-k2kdCS.js";import{u as U,F as z,c as V,f as K,S as L}from"./StepButtonsHookForm-Dttpjjrm.js";import{u as M,M as l,B as b,H as J}from"./Label-ne8aFYav.js";import{D as W}from"./Dekningsgrad-Bg_cIyqc.js";import{e as x,c as Q,g as X,S as Y,a as Z,f as $}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as ee}from"./hvemHarRettUtils-uG_MphPR.js";import{d as re,f as O}from"./uttakUtils-N7tKg55S.js";import{r as j}from"./index-CTjT7uj6.js";import{d as R,B as te}from"./Infobox-CtPDPZ_e.js";import{u as ne,i as ae}from"./useScrollBehaviour-CuUH4c1L.js";import{n as F}from"./validation-4HO0J-zV.js";import{e as oe}from"./barnetUtils-Dtg6gkcN.js";import{S as se}from"./Calendar-CAm_Wfei.js";import{u as ie,V as D}from"./useId-Dvu9sbXS.js";import{S as le}from"./Spacer-BW3tgveW.js";var de=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(r);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(r,a[s])&&(n[a[s]]=r[a[s]]);return n};const ue=j.forwardRef((r,t)=>{var{title:n,titleId:a}=r,s=de(r,["title","titleId"]);let o=ie();return o=n?a||"title-"+o:void 0,j.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},s),n?j.createElement("title",{id:o},n):null,j.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),_=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:s})=>{const o=M(),i=r.antallBarn,g=r.erFødsel,u=oe(r),{startdatoPeriode1:f,sluttdatoPeriode1:v,startdatoPeriode2:S,sluttdatoPeriode2:m,familiehendelsedato:h}=n,p=o.formatDate(h,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(R,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(se,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(b,{children:[g&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:u,dato:p,erMorDelAvSøknaden:x(t),erFlereBarn:i!=="1"}}),!g&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:i,dato:p,erMorDelAvSøknaden:x(t)}})]}),e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:a,fom:o.formatDate(f,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})}),s&&m&&e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:s,fom:o.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(m,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]})};_.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},uttaksdata:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ge=r=>{const t=[];for(let n=0;n<=r.uker;n++){const a=r.uker-n>=n,s=a?r.dager:0,o=a?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-n,dager:a?r.dager:0,totaltAntallDager:(r.uker-n)*5+s},antallUkerOgDagerSøker2:{uker:n,dager:a?0:r.dager,totaltAntallDager:n*5+o}})}return t},w=(r,t,n,a,s,o)=>{const i=n.type===Y.FAR_OG_FAR,g=i&&a?a:Z(r,n),u=i&&s?s:$(r,n);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:g,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:g,hvem2:u,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},me=({stønadskontoer:r})=>{const t=M(),n=C(),a=H(),s=y(k.FORDELING),{dekningsgrad:o}=F(y(k.HVOR_LANG_PERIODE)),i=F(y(k.HVEM_PLANLEGGER)),g=F(y(k.ARBEIDSSITUASJON)),u=F(y(k.OM_BARNET)),f=N(k.FORDELING),v=U({defaultValues:s}),S=v.watch("antallDagerSøker1"),m=S?parseInt(S.toString(),10):void 0,h=c=>{f(c),n.goToNextDefaultStep()},p=r[o],d=re(p),T=ee(g),A=O(T,i,p,u,m),B=O(T,i,p,u,m),P=Q(i,t),q=X(i,t),{ref:E,scrollToBottom:I}=ne();return e.jsx(G,{ref:E,steps:a,goToStep:n.goToNextStep,children:e.jsx(z,{formMethods:v,onSubmit:h,shouldUseFlexbox:!0,children:e.jsxs(D,{gap:"10",style:{flex:1},children:[e.jsxs(D,{gap:"8",children:[e.jsx(J,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(R,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(ue,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(b,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:d.uker,dager:d.dager,prosent:o}})})}),e.jsx(te,{isDarkBlue:s===void 0,children:e.jsx(V,{name:"antallDagerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:d.uker,dager:d.dager}}),autofocusWhenEmpty:!0,validate:[ae(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:K,onChange:I,children:ge(d).map(c=>e.jsx("option",{value:c.antallUkerOgDagerSøker1.totaltAntallDager,children:w(t,c,i,P,q)},c.antallUkerOgDagerSøker1.totaltAntallDager))})}),m!==void 0&&e.jsx(_,{barnet:u,hvemPlanlegger:i,fornavnSøker1:P,fornavnSøker2:q,uttaksdata:o===W.HUNDRE_PROSENT?A:B},m)]}),e.jsx(le,{}),e.jsx(L,{saveDataOnPreviousClick:f,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};w.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};me.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{me as F,w as f,ge as g};
