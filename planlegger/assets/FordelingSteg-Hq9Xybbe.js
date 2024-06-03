import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as E,a as U,b as f,C as k,n as S,c as C,i as G}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{G as H}from"./GreenPanel-CEPEejtT.js";import{I as T}from"./Infobox-BU2nfHQM.js";import{P as N}from"./PlanleggerStepPage-h6LOHlbT.js";import{u as V,F as Z,c as L,f as z,S as J}from"./StepButtonsHookForm-CewIG5kA.js";import{u as R,F as i}from"./index-e2vXP8VC.js";import{D as W}from"./Dekningsgrad-Bg_cIyqc.js";import{e as P,h as K,i as Q,S as X,a as Y,f as $}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as ee}from"./hvemHarRettUtils-Dvw973AZ.js";import{d as re,f as M}from"./uttakUtils-CrBM_WY2.js";import{r as h}from"./index-Dl6G-zuu.js";import"./calendarLabel.module-WmgcNkkl.js";import"./dateUtils-C_C2kvi-.js";import"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{u as te}from"./useScrollBehaviour-CDJE6G12.js";import{e as ne}from"./barnetUtils-Dtg6gkcN.js";import{C as ae}from"./Calendar-In9Ft7th.js";import{B as b,H as oe}from"./Label-DKKZxAV5.js";import{V as O}from"./VStack-C-EA7mzX.js";import{S as se}from"./Spacer-DYbme5k_.js";import{u as ie}from"./useId-BnKOV0D5.js";var le=function(t,r){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&r.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(t);o<a.length;o++)r.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]]);return n};const de=h.forwardRef((t,r)=>{var{title:n,titleId:a}=t,o=le(t,["title","titleId"]);let s=ie();return s=n?a||"title-"+s:void 0,h.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:r,"aria-labelledby":s},o),n?h.createElement("title",{id:s},n):null,h.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.758 9.758 0 0 0-7.992-7.991Zm.626 7.365V4.06a8.268 8.268 0 0 1 5.69 5.69h-5.69Zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167ZM9.75 4.06a8.254 8.254 0 0 0 0 15.88V4.06Zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.758 9.758 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74V13.5Zm1.5.75v5.69a8.268 8.268 0 0 0 5.69-5.69h-5.69Z",fill:"currentColor"}))}),ue=de,_=({barnet:t,hvemPlanlegger:r,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:o})=>{const s=R(),l=t.antallBarn,u=t.erFødsel,d=ne(t),{startdatoPeriode1:v,sluttdatoPeriode1:F,startdatoPeriode2:m,sluttdatoPeriode2:j,familiehendelsedato:c}=n,g=s.formatDate(c,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(T,{header:e.jsx(i,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(ae,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(b,{children:[u&&e.jsx(e.Fragment,{children:l!=="1"?e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnetFlereBarn",values:{erFødt:d,dato:g,erMorDelAvSøknaden:P(r)}}):e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:d,dato:g,erMorDelAvSøknaden:P(r)}})}),!u&&e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:l,dato:g,erMorDelAvSøknaden:P(r)}})]}),e.jsx(b,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:a,fom:s.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),b:p=>e.jsx("b",{children:p})}})}),o&&j&&e.jsx(b,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:o,fom:s.formatDate(m,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(j,{day:"numeric",month:"short",year:"numeric"}),b:p=>e.jsx("b",{children:p})}})})]})};_.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const me=t=>{const r=[];for(let n=0;n<=t;n++)r.push({antallUkerSøker2:n,antallUkerSøker1:t-n});return r},w=(t,r,n,a,o,s)=>{const l=n.type===X.FAR_OG_FAR,u=l&&a?a:Y(t,n),d=l&&o?o:$(t,n);return r.antallUkerSøker1===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:r.antallUkerSøker2,erOversiktSteg:s}}):r.antallUkerSøker2===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:r.antallUkerSøker1,erOversiktSteg:s}}):e.jsx(i,{id:"FordelingSteg.FordelingOptions",values:{hvem:u,hvem2:d,uker:r.antallUkerSøker1,uker2:r.antallUkerSøker2,erOversiktSteg:s}})},ge=({stønadskontoer:t})=>{const r=R(),n=E(),a=U(),o=f(k.FORDELING),{dekningsgrad:s}=S(f(k.HVOR_LANG_PERIODE)),l=S(f(k.HVEM_PLANLEGGER)),u=S(f(k.ARBEIDSSITUASJON)),d=S(f(k.OM_BARNET)),v=C(k.FORDELING),F=V({defaultValues:o}),m=F.watch("antallUkerSøker1"),j=y=>{v(y),n.goToNextDefaultStep()},c=t[s],g=re(c),p=ee(u),D=M(p,l,c,d,m),I=M(p,l,c,d,m),x=K(l,r),q=Q(l,r),{ref:A,scrollToBottom:B}=te();return e.jsx(N,{ref:A,steps:a,children:e.jsx(Z,{formMethods:F,onSubmit:j,shouldUseFlexbox:!0,children:e.jsxs(O,{gap:"10",style:{flex:1},children:[e.jsxs(O,{gap:"8",children:[e.jsx(oe,{size:"medium",spacing:!0,level:"2",children:e.jsx(i,{id:"FordelingSteg.Tittel"})}),e.jsx(T,{header:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(ue,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(b,{children:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst"})})}),e.jsx(H,{isDarkGreen:o===void 0,children:e.jsx(L,{name:"antallUkerSøker1",label:e.jsx(i,{id:"FordelingSteg.FordelingTittel",values:{uker:g}}),autofocusWhenEmpty:!0,validate:[G(r.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:z,onChange:B,children:me(g).map(y=>e.jsx("option",{value:y.antallUkerSøker1,children:w(r,y,l,x,q)},y.antallUkerSøker1))})}),m!==void 0&&e.jsx(_,{barnet:d,hvemPlanlegger:l,fornavnSøker1:x,fornavnSøker2:q,uttaksdata:s===W.HUNDRE_PROSENT?D:I},m)]}),e.jsx(se,{}),e.jsx(J,{saveDataOnPreviousClick:v,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};w.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ge.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};export{ge as F,w as f,me as g};
