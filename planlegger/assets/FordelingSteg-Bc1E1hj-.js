import{u as C,j as e,V as O}from"./VStack-WHXoK350.js";import{u as G,a as H,b as y,C as k,c as N}from"./usePlanleggerNavigator-BUJeCoY_.js";import{P as U}from"./PlanleggerStepPage-BUxaMC47.js";import{u as V,F as K,c as Z,f as L,S as z}from"./StepButtonsHookForm-CVvicH7s.js";import{u as M,M as l,B as b,H as J}from"./Label-DMHnewTW.js";import{D as W}from"./Dekningsgrad-Bg_cIyqc.js";import{e as x,c as Q,g as X,S as Y,a as $,f as ee}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as re}from"./hvemHarRettUtils-BOooQ_AO.js";import{d as te,f as D}from"./uttakUtils-CIImhUYg.js";import{r as j}from"./index-DVXBtNgz.js";import{d as R,B as ne}from"./Infobox-ClLisdhQ.js";import{u as ae,i as oe}from"./useScrollBehaviour-BRwzlaSf.js";import{n as F}from"./validation-4HO0J-zV.js";import{e as se}from"./barnetUtils-Dtg6gkcN.js";import{S as ie}from"./Calendar-BZZfWk4Z.js";import{S as le}from"./Spacer-CmfZYR-2.js";var de=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(r);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(r,a[o])&&(n[a[o]]=r[a[o]]);return n};const ue=j.forwardRef((r,t)=>{var{title:n,titleId:a}=r,o=de(r,["title","titleId"]);let s=C();return s=n?a||"title-"+s:void 0,j.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":s},o),n?j.createElement("title",{id:s},n):null,j.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.758 9.758 0 0 0-7.992-7.991Zm.626 7.365V4.06a8.268 8.268 0 0 1 5.69 5.69h-5.69Zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167ZM9.75 4.06a8.254 8.254 0 0 0 0 15.88V4.06Zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.758 9.758 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74V13.5Zm1.5.75v5.69a8.268 8.268 0 0 0 5.69-5.69h-5.69Z",fill:"currentColor"}))}),_=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:o})=>{const s=M(),i=r.antallBarn,u=r.erFødsel,d=se(r),{startdatoPeriode1:f,sluttdatoPeriode1:v,startdatoPeriode2:S,sluttdatoPeriode2:g,familiehendelsedato:h}=n,p=s.formatDate(h,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(R,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(ie,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(b,{children:[u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:d,dato:p,erMorDelAvSøknaden:x(t),erFlereBarn:i!=="1"}}),!u&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:i,dato:p,erMorDelAvSøknaden:x(t)}})]}),e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:a,fom:s.formatDate(f,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(v,{day:"numeric",month:"short",year:"numeric"}),b:m=>e.jsx("b",{children:m})}})}),o&&g&&e.jsx(b,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:o,fom:s.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),tom:s.formatDate(g,{day:"numeric",month:"short",year:"numeric"}),b:m=>e.jsx("b",{children:m})}})})]})};_.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ge=r=>{const t=[];for(let n=0;n<=r.uker;n++){const a=r.uker-n>=n,o=a?r.dager:0,s=a?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-n,dager:a?r.dager:0,totaltAntallDager:(r.uker-n)*5+o},antallUkerOgDagerSøker2:{uker:n,dager:a?0:r.dager,totaltAntallDager:n*5+s}})}return t},w=(r,t,n,a,o,s)=>{const i=n.type===Y.FAR_OG_FAR,u=i&&a?a:$(r,n),d=i&&o?o:ee(r,n);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:s}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:s}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:u,hvem2:d,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:s}})},me=({stønadskontoer:r})=>{const t=M(),n=G(),a=H(),o=y(k.FORDELING),{dekningsgrad:s}=F(y(k.HVOR_LANG_PERIODE)),i=F(y(k.HVEM_PLANLEGGER)),u=F(y(k.ARBEIDSSITUASJON)),d=F(y(k.OM_BARNET)),f=N(k.FORDELING),v=V({defaultValues:o}),S=v.watch("antallDagerSøker1"),g=S?parseInt(S.toString(),10):void 0,h=c=>{f(c),n.goToNextDefaultStep()},p=r[s],m=te(p),T=re(u),A=D(T,i,p,d,g),B=D(T,i,p,d,g),P=Q(i,t),q=X(i,t),{ref:E,scrollToBottom:I}=ae();return e.jsx(U,{ref:E,steps:a,children:e.jsx(K,{formMethods:v,onSubmit:h,shouldUseFlexbox:!0,children:e.jsxs(O,{gap:"10",style:{flex:1},children:[e.jsxs(O,{gap:"8",children:[e.jsx(J,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(R,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(ue,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(b,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst"})})}),e.jsx(ne,{isDarkBlue:o===void 0,children:e.jsx(Z,{name:"antallDagerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:m.uker,dager:m.dager}}),autofocusWhenEmpty:!0,validate:[oe(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:L,onChange:I,children:ge(m).map(c=>e.jsx("option",{value:c.antallUkerOgDagerSøker1.totaltAntallDager,children:w(t,c,i,P,q)},c.antallUkerOgDagerSøker1.totaltAntallDager))})}),g!==void 0&&e.jsx(_,{barnet:d,hvemPlanlegger:i,fornavnSøker1:P,fornavnSøker2:q,uttaksdata:s===W.HUNDRE_PROSENT?A:B},g)]}),e.jsx(le,{}),e.jsx(z,{saveDataOnPreviousClick:f,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};w.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};me.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
