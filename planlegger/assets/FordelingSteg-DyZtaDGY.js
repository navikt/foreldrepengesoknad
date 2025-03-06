import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as H,a as G,b as v,C as p,c as U}from"./usePlanleggerNavigator-3EhbCS3C.js";import{P as z}from"./PlanleggerStepPage-BXu0wHOq.js";import{u as L,R as V,e as K,S as J}from"./StepButtonsHookForm-DwLwn6D2.js";import{u as w,h as _,M as l,B as T,H as W,a as Q}from"./VeiviserPage-Dz0CIIAO.js";import{D as X}from"./Dekningsgrad-Bg_cIyqc.js";import{e as D,c as Y,g as Z,S as $,a as ee,f as re}from"./HvemPlanleggerUtils-Dk36cNav.js";import{f as te}from"./customErrorFormatter-RUbEXImz.js";import{u as ne}from"./hvemHarRettUtils-DOxReKrb.js";import{d as ae,f as M}from"./uttakUtils-BJiWrNmx.js";import{r as b}from"./index-CR__hKHy.js";import{u as oe}from"./useScrollBehaviour-Dvq8pEsj.js";import{n as h}from"./validation-DYlyn1BB.js";import{i as se}from"./dateFormValidation-BMqwyBZI.js";import{e as ie}from"./barnetUtils-BVuNVKfj.js";import{c as R}from"./stringUtils-DApHD7Y2.js";import{S as le}from"./Responsive-B-Uwxu87.js";import{u as de,V as q}from"./VStack-2apmvZh_.js";import{S as ue}from"./Spacer-DmBY75Fg.js";var ge=function(r,a){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&a.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)a.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t};const me=b.forwardRef((r,a)=>{var{title:t,titleId:n}=r,s=ge(r,["title","titleId"]);let o=de();return o=t?n||"title-"+o:void 0,b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:a,"aria-labelledby":o},s),t?b.createElement("title",{id:o},t):null,b.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),A=({barnet:r,hvemPlanlegger:a,uttaksdata:t,fornavnSøker1:n,fornavnSøker2:s})=>{const o=w(),d=r.antallBarn,i=r.erFødsel,g=ie(r),{startdatoPeriode1:k,sluttdatoPeriode1:S,startdatoPeriode2:j,sluttdatoPeriode2:c,familiehendelsedato:m}=t,F=o.formatDate(m,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(_,{header:e.jsx(l,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(le,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(q,{gap:"2",children:[e.jsxs(T,{children:[i&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:g,dato:F,erMorDelAvSøknaden:D(a),erFlereBarn:d!=="1"}}),!i&&e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:d,dato:F,erMorDelAvSøknaden:D(a)}})]}),e.jsx(T,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:R(n),fom:o.formatDate(k,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(S,{day:"numeric",month:"short",year:"numeric"}),b:u=>e.jsx("b",{children:u})}})})]}),s&&c&&e.jsx(T,{children:e.jsx(l,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:R(s),fom:o.formatDate(j,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(c,{day:"numeric",month:"short",year:"numeric"}),b:u=>e.jsx("b",{children:u})}})})]})};A.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const pe=r=>{const a=[];for(let t=0;t<=r.uker;t++){const n=r.uker-t>=t,s=n?r.dager:0,o=n?0:r.dager;a.push({antallUkerOgDagerSøker1:{uker:r.uker-t,dager:n?r.dager:0,totaltAntallDager:(r.uker-t)*5+s},antallUkerOgDagerSøker2:{uker:t,dager:n?0:r.dager,totaltAntallDager:t*5+o}})}return a},B=(r,a,t,n,s,o)=>{const d=t.type===$.FAR_OG_FAR,i=d&&n?n:ee(r,t),g=d&&s?s:re(r,t);return a.antallUkerOgDagerSøker1.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:g,uker:a.antallUkerOgDagerSøker2.uker,dager:a.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):a.antallUkerOgDagerSøker2.uker===0?e.jsx(l,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:i,uker:a.antallUkerOgDagerSøker1.uker,dager:a.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(l,{id:"FordelingSteg.FordelingOptions",values:{hvem:i,hvem2:g,uker:a.antallUkerOgDagerSøker1.uker,dagerS1:a.antallUkerOgDagerSøker1.dager,uker2:a.antallUkerOgDagerSøker2.uker,dagerS2:a.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},ke=({stønadskontoer:r,locale:a})=>{const t=w(),n=H(a),s=G(),o=v(p.FORDELING),{dekningsgrad:d}=h(v(p.HVOR_LANG_PERIODE)),i=h(v(p.HVEM_PLANLEGGER)),g=h(v(p.ARBEIDSSITUASJON)),k=h(v(p.OM_BARNET)),S=U(p.FORDELING),j=L({defaultValues:o}),c=j.watch("antallDagerSøker1"),m=c?parseInt(c.toString(),10):void 0,F=f=>{S(f),n.goToNextDefaultStep()},u=r[d],y=ae(u),x=ne(g),E=M(x,i,u,k,m),I=M(x,i,u,k,m),P=Y(i,t),O=Z(i,t),{ref:C,scrollToBottom:N}=oe();return e.jsx(z,{ref:C,steps:s,goToStep:n.goToNextStep,children:e.jsx(V,{formMethods:j,onSubmit:F,shouldUseFlexbox:!0,children:e.jsxs(q,{gap:"10",style:{flex:1},children:[e.jsxs(q,{gap:"8",children:[e.jsx(W,{size:"medium",spacing:!0,level:"2",children:e.jsx(l,{id:"FordelingSteg.Tittel"})}),e.jsx(_,{header:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(me,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(T,{children:e.jsx(l,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:y.uker,dager:y.dager,prosent:d}})})}),e.jsx(Q,{isDarkBlue:o===void 0,children:e.jsx(K,{name:"antallDagerSøker1",label:e.jsx(l,{id:"FordelingSteg.FordelingTittel",values:{uker:y.uker,dager:y.dager}}),autofocusWhenEmpty:!0,validate:[se(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:te,onChange:N,children:pe(y).map(f=>e.jsx("option",{value:f.antallUkerOgDagerSøker1.totaltAntallDager,children:B(t,f,i,P,O)},f.antallUkerOgDagerSøker1.totaltAntallDager))})}),m!==void 0&&e.jsx(A,{barnet:k,hvemPlanlegger:i,fornavnSøker1:P,fornavnSøker2:O,uttaksdata:d===X.HUNDRE_PROSENT?E:I},m)]}),e.jsx(ue,{}),e.jsx(J,{saveDataOnPreviousClick:S,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};B.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ke.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{ke as F,B as f,pe as g};
