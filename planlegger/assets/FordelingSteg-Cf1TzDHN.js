import{u as I,j as e,V as x}from"./VStack-WHXoK350.js";import{u as U,a as G,b as f,C as p,n as j,c as C,i as H}from"./usePlanleggerNavigator-BMZvzSRr.js";import{P as N}from"./PlanleggerStepPage-C2fDwwsT.js";import{u as V,F as Z,c as L,f as z,S as J}from"./StepButtonsHookForm-DUy72TCH.js";import{u as T,M as l,B as b,H as W}from"./Label-fr1ceDiJ.js";import{D as K}from"./Dekningsgrad-Bg_cIyqc.js";import{e as M,c as Q,d as X,S as Y,a as $,f as ee}from"./HvemPlanleggerUtils-B2i4COBs.js";import{u as re}from"./hvemHarRettUtils-BQIASNgG.js";import{d as te,f as O}from"./uttakUtils-Bwre5uei.js";import{r as h}from"./index-DVXBtNgz.js";import{d as R,G as ne}from"./Infobox-qElkb4kf.js";import{u as ae}from"./useScrollBehaviour-WVMBWXos.js";import{e as oe}from"./barnetUtils-Dtg6gkcN.js";import{S as se}from"./Calendar-BZZfWk4Z.js";import{S as ie}from"./Spacer-CmfZYR-2.js";var le=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(r);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(r,a[o])&&(n[a[o]]=r[a[o]]);return n};const de=h.forwardRef((r,t)=>{var{title:n,titleId:a}=r,o=le(r,["title","titleId"]);let s=I();return s=n?a||"title-"+s:void 0,h.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":s},o),n?h.createElement("title",{id:s},n):null,h.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.758 9.758 0 0 0-7.992-7.991Zm.626 7.365V4.06a8.268 8.268 0 0 1 5.69 5.69h-5.69Zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167ZM9.75 4.06a8.254 8.254 0 0 0 0 15.88V4.06Zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.758 9.758 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74V13.5Zm1.5.75v5.69a8.268 8.268 0 0 0 5.69-5.69h-5.69Z",fill:"currentColor"}))}),_=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:o})=>{const s=T(),i=r.antallBarn,u=r.erFødsel,d=oe(r),{startdatoPeriode1:v,sluttdatoPeriode1:F,startdatoPeriode2:m,sluttdatoPeriode2:S,familiehendelsedato:k}=n,c=s.formatDate(k,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(R,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(se,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(b,{children:[u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:d,dato:c,erMorDelAvSøknaden:M(t),erFlereBarn:i!=="1"}}),!u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:i,dato:c,erMorDelAvSøknaden:M(t)}})]}),e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:a,fom:s.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})}),o&&S&&e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:o,fom:s.formatDate(m,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})]})};_.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ue=r=>{const t=[];for(let n=0;n<=r;n++)t.push({antallUkerSøker2:n,antallUkerSøker1:r-n});return t},w=(r,t,n,a,o,s)=>{const i=n.type===Y.FAR_OG_FAR,u=i&&a?a:$(r,n),d=i&&o?o:ee(r,n);return t.antallUkerSøker1===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:t.antallUkerSøker2,erOversiktSteg:s}}):t.antallUkerSøker2===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:t.antallUkerSøker1,erOversiktSteg:s}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:u,hvem2:d,uker:t.antallUkerSøker1,uker2:t.antallUkerSøker2,erOversiktSteg:s}})},me=({stønadskontoer:r})=>{const t=T(),n=U(),a=G(),o=f(p.FORDELING),{dekningsgrad:s}=j(f(p.HVOR_LANG_PERIODE)),i=j(f(p.HVEM_PLANLEGGER)),u=j(f(p.ARBEIDSSITUASJON)),d=j(f(p.OM_BARNET)),v=C(p.FORDELING),F=V({defaultValues:o}),m=F.watch("antallUkerSøker1"),S=y=>{v(y),n.goToNextDefaultStep()},k=r[s],c=te(k),g=re(u),D=O(g,i,k,d,m),A=O(g,i,k,d,m),P=Q(i,t),q=X(i,t),{ref:B,scrollToBottom:E}=ae();return e.jsx(N,{ref:B,steps:a,children:e.jsx(Z,{formMethods:F,onSubmit:S,shouldUseFlexbox:!0,children:e.jsxs(x,{gap:"10",style:{flex:1},children:[e.jsxs(x,{gap:"8",children:[e.jsx(W,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(R,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(de,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(b,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst"})})}),e.jsx(ne,{isDarkGreen:o===void 0,children:e.jsx(L,{name:"antallUkerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:c}}),autofocusWhenEmpty:!0,validate:[H(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:z,onChange:E,children:ue(c).map(y=>e.jsx("option",{value:y.antallUkerSøker1,children:w(t,y,i,P,q)},y.antallUkerSøker1))})}),m!==void 0&&e.jsx(_,{barnet:d,hvemPlanlegger:i,fornavnSøker1:P,fornavnSøker2:q,uttaksdata:s===K.HUNDRE_PROSENT?D:A},m)]}),e.jsx(ie,{}),e.jsx(J,{saveDataOnPreviousClick:v,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};w.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};me.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};export{me as F,w as f,ue as g};
