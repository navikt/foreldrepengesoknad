import{u as I,j as e,V as P}from"./VStack-WHXoK350.js";import{u as U,a as C,b as f,C as k,c as G}from"./usePlanleggerNavigator-B_92Fadh.js";import{P as H}from"./PlanleggerStepPage-CadhnVxY.js";import{u as N,F as V,c as K,f as Z,S as L}from"./StepButtonsHookForm-BQqPUx0E.js";import{u as D,M as l,B as h,H as z}from"./Label-BBmAl76u.js";import{D as J}from"./Dekningsgrad-Bg_cIyqc.js";import{e as q,c as W,g as Q,S as X,a as Y,f as $}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as ee}from"./hvemHarRettUtils-0Y6AdyIq.js";import{d as re,f as x}from"./uttakUtils-DCxTe1uH.js";import{r as j}from"./index-DVXBtNgz.js";import{d as M,B as te}from"./Infobox-BMmsyKnh.js";import{u as ne,i as ae}from"./useScrollBehaviour-mzdbvsQL.js";import{n as b}from"./validation-4HO0J-zV.js";import{e as oe}from"./barnetUtils-Dtg6gkcN.js";import{S as se}from"./Calendar-BZZfWk4Z.js";import{S as ie}from"./Spacer-CmfZYR-2.js";var le=function(t,r){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&r.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(t);o<a.length;o++)r.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]]);return n};const de=j.forwardRef((t,r)=>{var{title:n,titleId:a}=t,o=le(t,["title","titleId"]);let s=I();return s=n?a||"title-"+s:void 0,j.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:r,"aria-labelledby":s},o),n?j.createElement("title",{id:s},n):null,j.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.758 9.758 0 0 0-7.992-7.991Zm.626 7.365V4.06a8.268 8.268 0 0 1 5.69 5.69h-5.69Zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167ZM9.75 4.06a8.254 8.254 0 0 0 0 15.88V4.06Zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.758 9.758 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74V13.5Zm1.5.75v5.69a8.268 8.268 0 0 0 5.69-5.69h-5.69Z",fill:"currentColor"}))}),R=({barnet:t,hvemPlanlegger:r,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:o})=>{const s=D(),i=t.antallBarn,u=t.erFødsel,d=oe(t),{startdatoPeriode1:v,sluttdatoPeriode1:S,startdatoPeriode2:g,sluttdatoPeriode2:F,familiehendelsedato:c}=n,m=s.formatDate(c,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(M,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(se,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(h,{children:[u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:d,dato:m,erMorDelAvSøknaden:q(r),erFlereBarn:i!=="1"}}),!u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:i,dato:m,erMorDelAvSøknaden:q(r)}})]}),e.jsx(h,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:a,fom:s.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),b:p=>e.jsx("b",{children:p})}})}),o&&F&&e.jsx(h,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:o,fom:s.formatDate(g,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),b:p=>e.jsx("b",{children:p})}})})]})};R.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ue=t=>{const r=[];for(let n=0;n<=t.uker;n++){const a=t.uker-n>=n;r.push({antallUkerOgDagerSøker1:{uker:t.uker-n,dager:a?t.dager:0},antallUkerOgDagerSøker2:{uker:n,dager:a?0:t.dager}})}return r},_=(t,r,n,a,o,s)=>{const i=n.type===X.FAR_OG_FAR,u=i&&a?a:Y(t,n),d=i&&o?o:$(t,n);return r.antallUkerOgDagerSøker1.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:r.antallUkerOgDagerSøker2.uker,dager:r.antallUkerOgDagerSøker2.dager,erOversiktSteg:s}}):r.antallUkerOgDagerSøker2.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:r.antallUkerOgDagerSøker1.uker,dager:r.antallUkerOgDagerSøker1.dager,erOversiktSteg:s}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:u,hvem2:d,uker:r.antallUkerOgDagerSøker1.uker,dagerS1:r.antallUkerOgDagerSøker1.dager,uker2:r.antallUkerOgDagerSøker2.uker,dagerS2:r.antallUkerOgDagerSøker2.dager,erOversiktSteg:s}})},ge=({stønadskontoer:t})=>{const r=D(),n=U(),a=C(),o=f(k.FORDELING),{dekningsgrad:s}=b(f(k.HVOR_LANG_PERIODE)),i=b(f(k.HVEM_PLANLEGGER)),u=b(f(k.ARBEIDSSITUASJON)),d=b(f(k.OM_BARNET)),v=G(k.FORDELING),S=N({defaultValues:o}),g=S.watch("antallUkerSøker1"),F=y=>{v(y),n.goToNextDefaultStep()},c=t[s],m=re(c),p=ee(u),w=x(p,i,c,d,g),B=x(p,i,c,d,g),O=W(i,r),T=Q(i,r),{ref:A,scrollToBottom:E}=ne();return e.jsx(H,{ref:A,steps:a,children:e.jsx(V,{formMethods:S,onSubmit:F,shouldUseFlexbox:!0,children:e.jsxs(P,{gap:"10",style:{flex:1},children:[e.jsxs(P,{gap:"8",children:[e.jsx(z,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(M,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(de,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(h,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst"})})}),e.jsx(te,{isDarkBlue:o===void 0,children:e.jsx(K,{name:"antallUkerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:m.uker,dager:m.dager}}),autofocusWhenEmpty:!0,validate:[ae(r.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:Z,onChange:E,children:ue(m).map(y=>e.jsx("option",{value:y.antallUkerOgDagerSøker1.uker,children:_(r,y,i,O,T)},y.antallUkerOgDagerSøker1.uker))})}),g!==void 0&&e.jsx(R,{barnet:d,hvemPlanlegger:i,fornavnSøker1:O,fornavnSøker2:T,uttaksdata:s===J.HUNDRE_PROSENT?w:B},g)]}),e.jsx(ie,{}),e.jsx(L,{saveDataOnPreviousClick:v,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};_.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ge.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{ge as F,_ as f,ue as g};
