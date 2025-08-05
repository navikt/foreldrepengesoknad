import{r as S,a1 as C,aa as R,j as e,a2 as _,a3 as T,a4 as g,Z as i,a5 as O,ah as N,ab as h,_ as G,$ as U,ac as z,af as K,aI as L,ad as V,ae as J}from"./iframe-7czCGN7b.js";import{c as W,e as Z,u as f,C as c,f as $}from"./usePlanleggerNavigator-DYP19ueN.js";import{P as Q}from"./PlanleggerStepPage-tD3jivVV.js";import{D as X}from"./Dekningsgrad-Bg_cIyqc.js";import{c as D,e as Y,g as ee,a as re,H as te,f as ne,b as ae}from"./HvemPlanleggerUtils-CeanplYH.js";import{f as oe}from"./customErrorFormatter-BXuhwfyP.js";import{u as se}from"./hvemHarRettUtils-DJajuYJo.js";import{d as ie,f as M}from"./uttakUtils-BJA-dqt1.js";import{u as le}from"./useScrollBehaviour-DPu1hTQy.js";import{b as de}from"./barnetUtils-CJBenv_k.js";import{S as ue}from"./Spacer-CcLD0oTU.js";var ge=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(r);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(r,a[s])&&(n[a[s]]=r[a[s]]);return n};const me=S.forwardRef((r,t)=>{var{title:n,titleId:a}=r,s=ge(r,["title","titleId"]);let o=C();return o=n?a||"title-"+o:void 0,S.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},s),n?S.createElement("title",{id:o},n):null,S.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),w=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:s})=>{const o=R(),l=r.antallBarn,m=r.erFødsel,u=de(r),{startdatoPeriode1:F,sluttdatoPeriode1:y,startdatoPeriode2:j,sluttdatoPeriode2:p,familiehendelsedato:b}=n,k=o.formatDate(b,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(_,{header:e.jsx(i,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(N,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(T,{gap:"2",children:[e.jsxs(g,{children:[m&&e.jsxs(e.Fragment,{children:[e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:u,dato:k,erMorDelAvSøknaden:D(t),erFlereBarn:l!=="1"}})}),e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnetDel2",values:{erAlenesøker:Y(t)}})})]}),!m&&e.jsxs(e.Fragment,{children:[e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:l,dato:k,erMorDelAvSøknaden:D(t)}})}),e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjonDel2",values:{dato:k}})})]})]}),e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:O(a),fom:o.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(y,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]}),s&&p&&e.jsx(g,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:O(s),fom:o.formatDate(j,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(p,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]})};w.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const pe=r=>{const t=[];for(let n=0;n<=r.uker;n++){const a=r.uker-n>=n,s=a?r.dager:0,o=a?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-n,dager:a?r.dager:0,totaltAntallDager:(r.uker-n)*5+s},antallUkerOgDagerSøker2:{uker:n,dager:a?0:r.dager,totaltAntallDager:n*5+o}})}return t},A=(r,t,n,a,s,o)=>{const l=n.type===te.FAR_OG_FAR,m=l&&a?a:ne(r,n),u=l&&s?s:ae(r,n);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:u,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:m,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(i,{id:"FordelingSteg.FordelingOptions",values:{hvem:m,hvem2:u,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},ke=({stønadskontoer:r})=>{const t=R(),n=W(),a=Z(),s=f(c.FORDELING),{dekningsgrad:o}=h(f(c.HVOR_LANG_PERIODE)),l=h(f(c.HVEM_PLANLEGGER)),m=h(f(c.ARBEIDSSITUASJON)),u=h(f(c.OM_BARNET)),F=$(c.FORDELING),y=G({defaultValues:s}),j=y.watch("antallDagerSøker1"),p=j?parseInt(j.toString(),10):void 0,b=v=>{F(v),n.goToNextDefaultStep()},k=r[o],d=ie(k),P=se(m),I=M(P,l,k,u,p),B=M(P,l,k,u,p),x=ee(l,t),q=re(l,t),{ref:H,scrollToBottom:E}=le();return e.jsx(Q,{ref:H,steps:a,goToStep:n.goToNextStep,children:e.jsx(U,{formMethods:y,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(T,{gap:"10",style:{flex:1},children:[e.jsxs(T,{gap:"8",children:[e.jsx(z,{size:"medium",spacing:!0,level:"2",children:e.jsx(i,{id:"FordelingSteg.Tittel"})}),e.jsx(_,{header:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(me,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(g,{children:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:d.uker,dager:d.dager,prosent:o}})})}),e.jsx(K,{isDarkBlue:s===void 0,children:e.jsx(L,{name:"antallDagerSøker1",control:y.control,label:e.jsx(i,{id:"FordelingSteg.FordelingTittel",values:{uker:d.uker,dager:d.dager}}),autofocusWhenEmpty:!0,validate:[V(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:oe,onChange:E,children:pe(d).map(v=>e.jsx("option",{value:v.antallUkerOgDagerSøker1.totaltAntallDager,children:A(t,v,l,x,q)},v.antallUkerOgDagerSøker1.totaltAntallDager))})}),p!==void 0&&e.jsx(w,{barnet:u,hvemPlanlegger:l,fornavnSøker1:x,fornavnSøker2:q,uttaksdata:o===X.HUNDRE_PROSENT?I:B},p)]}),e.jsx(ue,{}),e.jsx(J,{saveDataOnPreviousClick:F,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};A.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ke.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{ke as F,A as f,pe as g};
