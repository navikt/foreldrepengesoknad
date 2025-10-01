import{r as N,a3 as G,a4 as h,ad as R,j as e,a5 as _,a6 as T,a7 as u,_ as i,a8 as O,ak as U,ae as S,$ as C,a0 as z,af as L,ai as K,aL as V,ag as J,ah as W}from"./iframe-lVwyS3Qx.js";import{c as $,e as Q,u as f,C as c,f as X}from"./usePlanleggerNavigator-CjY_a4A1.js";import{P as Y}from"./PlanleggerStepPage-0kquicl9.js";import{D as Z}from"./Dekningsgrad-Bg_cIyqc.js";import{c as D,e as ee,g as re,a as te,H as ne,f as ae,b as oe}from"./HvemPlanleggerUtils-DmRXPRql.js";import{f as se}from"./customErrorFormatter-8IH2X8X7.js";import{u as ie}from"./hvemHarRettUtils-DNkiKGiZ.js";import{d as le,f as M}from"./uttakUtils-AuLh9lHc.js";import{u as de}from"./useScrollBehaviour-DsMkK5LC.js";import{b as ge}from"./barnetUtils-fEB1cv7e.js";import{S as ue}from"./Spacer-UtOl3dtS.js";var me=function(r,t){var n={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&t.indexOf(a)<0&&(n[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(r);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(r,a[s])&&(n[a[s]]=r[a[s]]);return n};const pe=N.forwardRef((r,t)=>{var{title:n,titleId:a}=r,s=me(r,["title","titleId"]);let o=G();return o=n?a||"title-"+o:void 0,h.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},s),n?h.createElement("title",{id:o},n):null,h.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),w=({barnet:r,hvemPlanlegger:t,uttaksdata:n,fornavnSøker1:a,fornavnSøker2:s})=>{const o=R(),l=r.antallBarn,m=r.erFødsel,g=ge(r),{startdatoPeriode1:F,sluttdatoPeriode1:y,startdatoPeriode2:j,sluttdatoPeriode2:p,familiehendelsedato:b}=n,k=o.formatDate(b,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(_,{header:e.jsx(i,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(U,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(T,{gap:"space-8",children:[e.jsxs(u,{children:[m&&e.jsxs(e.Fragment,{children:[e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:g,dato:k,erMorDelAvSøknaden:D(t),erFlereBarn:l!=="1"}})}),e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnetDel2",values:{erAlenesøker:ee(t)}})})]}),!m&&e.jsxs(e.Fragment,{children:[e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:l,dato:k,erMorDelAvSøknaden:D(t)}})}),e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjonDel2",values:{dato:k}})})]})]}),e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:O(a),fom:o.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(y,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]}),s&&p&&e.jsx(u,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:O(s),fom:o.formatDate(j,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(p,{day:"numeric",month:"short",year:"numeric"}),b:d=>e.jsx("b",{children:d})}})})]})};w.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ke=r=>{const t=[];for(let n=0;n<=r.uker;n++){const a=r.uker-n>=n,s=a?r.dager:0,o=a?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-n,dager:a?r.dager:0,totaltAntallDager:(r.uker-n)*5+s},antallUkerOgDagerSøker2:{uker:n,dager:a?0:r.dager,totaltAntallDager:n*5+o}})}return t},A=(r,t,n,a,s,o)=>{const l=n.type===ne.FAR_OG_FAR,m=l&&a?a:ae(r,n),g=l&&s?s:oe(r,n);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:g,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:m,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(i,{id:"FordelingSteg.FordelingOptions",values:{hvem:m,hvem2:g,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},ce=({stønadskontoer:r})=>{const t=R(),n=$(),a=Q(),s=f(c.FORDELING),{dekningsgrad:o}=S(f(c.HVOR_LANG_PERIODE)),l=S(f(c.HVEM_PLANLEGGER)),m=S(f(c.ARBEIDSSITUASJON)),g=S(f(c.OM_BARNET)),F=X(c.FORDELING),y=C({defaultValues:s}),j=y.watch("antallDagerSøker1"),p=j?Number.parseInt(j.toString(),10):void 0,b=v=>{F(v),n.goToNextDefaultStep()},k=r[o],d=le(k),P=ie(m),B=M(P,l,k,g,p),I=M(P,l,k,g,p),x=re(l,t),q=te(l,t),{ref:H,scrollToBottom:E}=de();return e.jsx(Y,{ref:H,steps:a,goToStep:n.goToNextStep,children:e.jsx(z,{formMethods:y,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(T,{gap:"space-40",style:{flex:1},children:[e.jsxs(T,{gap:"space-32",children:[e.jsx(L,{size:"medium",spacing:!0,level:"2",children:e.jsx(i,{id:"FordelingSteg.Tittel"})}),e.jsx(_,{header:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(pe,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(u,{children:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:d.uker,dager:d.dager,prosent:o}})})}),e.jsx(K,{isDarkBlue:s===void 0,children:e.jsx(V,{name:"antallDagerSøker1",control:y.control,label:e.jsx(i,{id:"FordelingSteg.FordelingTittel",values:{uker:d.uker,dager:d.dager}}),autofocusWhenEmpty:!0,validate:[J(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:se,onChange:E,children:ke(d).map(v=>e.jsx("option",{value:v.antallUkerOgDagerSøker1.totaltAntallDager,children:A(t,v,l,x,q)},v.antallUkerOgDagerSøker1.totaltAntallDager))})}),p!==void 0&&e.jsx(w,{barnet:g,hvemPlanlegger:l,fornavnSøker1:x,fornavnSøker2:q,uttaksdata:o===Z.HUNDRE_PROSENT?B:I},p)]}),e.jsx(ue,{}),e.jsx(W,{saveDataOnPreviousClick:F,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};A.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ce.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{ce as F,A as f,ke as g};
