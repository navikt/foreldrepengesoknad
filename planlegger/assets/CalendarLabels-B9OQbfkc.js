import{j as e}from"./jsx-runtime-CLpGMVip.js";import{B as l,M as s,u as F}from"./VeiviserPage-C7O1QSdG.js";import{S as B,m as x,n as M}from"./HvemPlanleggerUtils-CzKVUhpa.js";import{b as R}from"./barnetUtils-q5P1ZqAS.js";import{a as S,b as _,h as O}from"./hvemHarRettUtils-CXCK96Nu.js";import{C as o}from"./CalendarIconLabel-DTVDP1sP.js";import"./index-CR__hKHy.js";import{e as h}from"./StepButtonsHookForm-mKptxFxi.js";import{b as A}from"./BarnehageplassSteg-DLIEzF05.js";import{F as p}from"./FamiliehendelseLabel-B6Yioa-G.js";import{V as w,H as m}from"./VStack-BfPiYV8A.js";const g=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(o,{iconType:a?"blue":"green",children:e.jsxs(l,{children:[r&&e.jsx(s,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(s,{id:"OversiktSteg.MedAktivitetskrav"})]})});g.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const k=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(o,{iconType:a?"blue":"green",children:e.jsx(l,{children:e.jsx(s,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:h(r)}})})});k.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const i=({barnet:r})=>{const a=F(),n=A(r);return e.jsx(o,{iconType:"purple",children:e.jsx(l,{children:e.jsx(s,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(n,{day:"2-digit",month:"short"})}})})})};i.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const b=()=>e.jsx(o,{iconType:"blue",children:e.jsx(l,{children:e.jsx(s,{id:"OversiktSteg.ForeldrepengerLabel"})})});b.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const L=({barnet:r,hvemPlanlegger:a,hvemHarRett:n})=>{const y=F(),t=R(r),v=a.type===B.FAR_OG_FAR,f=x(a,y),u=M(a,y),d=v&&!t,c=v&&t,j=!d&&(n==="beggeHarRett"||S(n,a)&&!c||_(n,a)),q=!d&&u&&(O(n,a)||n==="kunSøker1HarRett"&&c);return e.jsxs(w,{gap:"1",children:[j&&e.jsxs(m,{gap:"2",children:[e.jsx(k,{søkerTekst:f,isBluePanel:!0}),u&&n==="beggeHarRett"&&e.jsx(k,{søkerTekst:u}),e.jsx(p,{barnet:r}),!t&&e.jsx(i,{barnet:r})]}),q&&e.jsxs(m,{gap:"2",children:[e.jsx(g,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(g,{}),e.jsx(p,{barnet:r}),!t&&e.jsx(i,{barnet:r})]}),d&&e.jsxs(m,{gap:"2",children:[e.jsx(b,{}),e.jsx(p,{barnet:r}),!t&&e.jsx(i,{barnet:r})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""}}};export{L as C};
