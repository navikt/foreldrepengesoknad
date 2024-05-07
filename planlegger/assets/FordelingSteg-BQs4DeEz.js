import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as U,a as C,b as y,C as p,n as S,c as G,i as H}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{G as N}from"./GreenPanel-CEPEejtT.js";import{I as R}from"./Infobox-2dY1MjSC.js";import{P as V}from"./PlanleggerStepPage-CgQnGAng.js";import{u as L,F as Z,c as z,f as J,S as W}from"./StepButtonsHookForm-DUdbmqm8.js";import{u as _,F as i}from"./index-e2vXP8VC.js";import{D as K}from"./Dekningsgrad-Bg_cIyqc.js";import{e as P,h as Q,i as X,S as Y,a as $,f as ee}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as re}from"./hvemHarRettUtils-Dvw973AZ.js";import{d as te,f as T}from"./uttakUtils-CrBM_WY2.js";import{u as ne}from"./useScrollBehaviour-BhOrFi8k.js";import{r as j}from"./index-Dl6G-zuu.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./dateUtils-C_C2kvi-.js";import"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{e as ae}from"./barnetUtils-Dtg6gkcN.js";import{C as oe}from"./Calendar-In9Ft7th.js";import{B as h,H as se}from"./Label-DKKZxAV5.js";import{V as M}from"./VStack-C-EA7mzX.js";import{S as ie}from"./Spacer-DYbme5k_.js";import{u as le}from"./useId-BnKOV0D5.js";var de=function(t,a){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&a.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(t);o<n.length;o++)a.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]]);return r};const ue=j.forwardRef((t,a)=>{var{title:r,titleId:n}=t,o=de(t,["title","titleId"]);let s=le();return s=r?n||"title-"+s:void 0,j.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},o),r?j.createElement("title",{id:s},r):null,j.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.758 9.758 0 0 0-7.992-7.991Zm.626 7.365V4.06a8.268 8.268 0 0 1 5.69 5.69h-5.69Zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167ZM9.75 4.06a8.254 8.254 0 0 0 0 15.88V4.06Zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.758 9.758 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74V13.5Zm1.5.75v5.69a8.268 8.268 0 0 0 5.69-5.69h-5.69Z",fill:"currentColor"}))}),me=ue,w=({barnet:t,hvemPlanlegger:a,uttaksdata:r,fornavnSøker1:n,fornavnSøker2:o})=>{const s=_(),d=t.antallBarn,l=t.erFødsel,f=ae(t),{startdatoPeriode1:k,sluttdatoPeriode1:v,startdatoPeriode2:F,sluttdatoPeriode2:u,familiehendelsedato:b}=r,m=s.formatDate(b,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(R,{header:e.jsx(i,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(oe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(h,{children:[l&&e.jsx(e.Fragment,{children:d!=="1"?e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnetFlereBarn",values:{erFødt:f,dato:m,erMorDelAvSøknaden:P(a)}}):e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:f,dato:m,erMorDelAvSøknaden:P(a)}})}),!l&&e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:d,dato:m,erMorDelAvSøknaden:P(a)}})]}),e.jsx(h,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:n,fom:s.formatDate(k,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})}),o&&u&&e.jsx(h,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:o,fom:s.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(u,{day:"numeric",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})]})};w.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ge=t=>{const a=[];for(let r=0;r<=t;r++)a.push({antallUkerSøker2:r,antallUkerSøker1:t-r});return a},D=(t,a,r,n,o)=>{const s=r.type===Y.FAR_OG_FAR,d=s&&n?n:$(t,r),l=s&&o?o:ee(t,r);return a.antallUkerSøker1===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:l,uker:a.antallUkerSøker2}}):a.antallUkerSøker2===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:a.antallUkerSøker1}}):e.jsx(i,{id:"FordelingSteg.FordelingOptions",values:{hvem:d,hvem2:l,uker:a.antallUkerSøker1,uker2:a.antallUkerSøker2}})},pe=({stønadskontoer:t,locale:a})=>{const r=_(),n=U(a),o=C(),s=y(p.FORDELING),{dekningsgrad:d}=S(y(p.HVOR_LANG_PERIODE)),l=S(y(p.HVEM_PLANLEGGER)),f=S(y(p.ARBEIDSSITUASJON)),k=S(y(p.OM_BARNET)),v=G(p.FORDELING),F=L({defaultValues:s}),u=F.watch("antallUkerSøker1"),b=c=>{v(c),n.goToNextDefaultStep()},m=t[d],g=te(m),x=re(f),I=T(x,l,m,k,u),A=T(x,l,m,k,u),q=Q(l,r),O=X(l,r),{ref:B,scrollToBottom:E}=ne();return e.jsx(V,{ref:B,steps:o,children:e.jsx(Z,{formMethods:F,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(M,{gap:"10",style:{flex:1},children:[e.jsxs(M,{gap:"8",children:[e.jsx(se,{size:"medium",spacing:!0,level:"2",children:e.jsx(i,{id:"FordelingSteg.Tittel"})}),e.jsx(R,{header:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(me,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(h,{children:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst"})})}),e.jsx(N,{isDarkGreen:s===void 0,children:e.jsx(z,{name:"antallUkerSøker1",label:e.jsx(i,{id:"FordelingSteg.FordelingTittel",values:{uker:g}}),autofocusWhenEmpty:!0,validate:[H(r.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:J,onChange:E,children:ge(g).map(c=>e.jsx("option",{value:c.antallUkerSøker1,children:D(r,c,l,q,O)},c.antallUkerSøker1))})}),u!==void 0&&e.jsx(w,{barnet:k,hvemPlanlegger:l,fornavnSøker1:q,fornavnSøker2:O,uttaksdata:d===K.HUNDRE_PROSENT?I:A},u)]}),e.jsx(ie,{}),e.jsx(W,{saveDataOnPreviousClick:v,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};D.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};pe.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{pe as F,D as f,ge as g};
