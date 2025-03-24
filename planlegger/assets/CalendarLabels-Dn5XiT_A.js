import{j as e}from"./jsx-runtime-CLpGMVip.js";import{B as n,M as o,u as q,C as s,w as i}from"./VeiviserPage-DY1Z8xzE.js";import{m as M,n as O}from"./HvemPlanleggerUtils-q6zNFmnu.js";import{b as R}from"./barnetUtils-3HQkulWC.js";import{a as _,b as A,h as P}from"./hvemHarRettUtils-KdS7VsWV.js";import{U as L}from"./KvoteOppsummering-Cy2XT23O.js";import{H as S}from"./HvemPlanleggerType-CugjyLV2.js";import"./index-CR__hKHy.js";import{C as u}from"./CalendarIconLabel-Q5I-hpXo.js";import{c as H}from"./stringUtils-DApHD7Y2.js";import{b as E}from"./BarnehageplassSteg-dDjjVkC1.js";import{F as y}from"./FamiliehendelseLabel-B8cSaSA9.js";import{V as U,H as k}from"./VStack-2apmvZh_.js";const c=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(n,{children:[r&&e.jsx(o,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(o,{id:"OversiktSteg.MedAktivitetskrav"})]})});c.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const v=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(n,{children:e.jsx(o,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:H(r)}})})});v.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const d=({barnet:r})=>{const a=q(),t=E(r);return e.jsx(u,{iconType:"purple",children:e.jsx(n,{children:e.jsx(o,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(t,{day:"2-digit",month:"short"})}})})})};d.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const h=()=>e.jsx(u,{iconType:"blue",children:e.jsx(n,{children:e.jsx(o,{id:"OversiktSteg.ForeldrepengerLabel"})})});h.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const I=({barnet:r,hvemPlanlegger:a,hvemHarRett:t,uttaksplan:x})=>{const F=q(),l=R(r),b=a.type===S.FAR_OG_FAR,B=M(a,F),p=O(a,F),g=b&&!l,f=b&&l,m=x.find(j=>j.utsettelseÅrsak&&j.utsettelseÅrsak===L.Ferie)!==void 0,T=!g&&(t==="beggeHarRett"||_(t,a)&&!f||A(t,a)),w=!g&&p&&(P(t,a)||t==="kunSøker1HarRett"&&f);return e.jsxs(U,{gap:"1",children:[T&&e.jsxs(k,{gap:"2",children:[e.jsx(v,{søkerTekst:B,isBluePanel:!0}),p&&t==="beggeHarRett"&&e.jsx(v,{søkerTekst:p}),e.jsx(y,{barnet:r}),!l&&e.jsx(d,{barnet:r}),e.jsx(s,{iconType:i.BLACK,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})}),m&&e.jsx(s,{iconType:i.BLUEOUTLINE,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Ferie"})})]}),w&&e.jsxs(k,{gap:"2",children:[e.jsx(c,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(c,{}),e.jsx(y,{barnet:r}),!l&&e.jsx(d,{barnet:r}),e.jsx(s,{iconType:i.BLACK,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})}),m&&e.jsx(s,{iconType:i.BLUEOUTLINE,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Ferie"})})]}),g&&e.jsxs(k,{gap:"2",children:[e.jsx(h,{}),e.jsx(y,{barnet:r}),!l&&e.jsx(d,{barnet:r}),e.jsx(s,{iconType:i.BLACK,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})}),m&&e.jsx(s,{iconType:i.BLUEOUTLINE,children:e.jsx(n,{style:{whiteSpace:"nowrap"},children:"Ferie"})})]})]})};I.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},uttaksplan:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""}}};export{I as C};
