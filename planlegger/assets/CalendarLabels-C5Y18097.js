import{j as e}from"./jsx-runtime-CLpGMVip.js";import{B as t,M as n,u as x,C as i,w as l}from"./VeiviserPage-B8mUbm-k.js";import{m as w,n as M}from"./HvemPlanleggerUtils-NAMvXQbK.js";import{b as O}from"./barnetUtils-D2ACWFiZ.js";import{a as R,b as _,h as A}from"./hvemHarRettUtils-fIYNK43l.js";import{U as P}from"./KvoteOppsummering-fu2BMVzu.js";import{H as S}from"./HvemPlanleggerType-CugjyLV2.js";import"./index-CR__hKHy.js";import{C as u}from"./CalendarIconLabel-BOJSa9tn.js";import{c as H}from"./stringUtils-DApHD7Y2.js";import{b as C}from"./BarnehageplassSteg-DECrXXA0.js";import{F as y}from"./FamiliehendelseLabel-B370iIYE.js";import{V as E,H as k}from"./VStack-2apmvZh_.js";const c=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(t,{children:[r&&e.jsx(n,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(n,{id:"OversiktSteg.MedAktivitetskrav"})]})});c.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const v=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:H(r)}})})});v.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const d=({barnet:r})=>{const a=x(),s=C(r);return e.jsx(u,{iconType:"purple",children:e.jsx(t,{children:e.jsx(n,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(s,{day:"2-digit",month:"short"})}})})})};d.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const q=()=>e.jsx(u,{iconType:"blue",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.ForeldrepengerLabel"})})});q.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const U=({barnet:r,hvemPlanlegger:a,hvemHarRett:s,uttaksplan:h})=>{const F=x(),o=O(r),b=a.type===S.FAR_OG_FAR,B=w(a,F),p=M(a,F),g=b&&!o,j=b&&o,m=h.find(f=>f.utsettelseÅrsak&&f.utsettelseÅrsak===P.Ferie)!==void 0,T=!g&&(s==="beggeHarRett"||R(s,a)&&!j||_(s,a)),L=!g&&p&&(A(s,a)||s==="kunSøker1HarRett"&&j);return e.jsxs(E,{gap:"1",children:[T&&e.jsxs(k,{gap:"2",children:[e.jsx(v,{søkerTekst:B,isBluePanel:!0}),p&&s==="beggeHarRett"&&e.jsx(v,{søkerTekst:p}),e.jsx(y,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(i,{iconType:l.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(i,{iconType:l.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),L&&e.jsxs(k,{gap:"2",children:[e.jsx(c,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(c,{}),e.jsx(y,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(i,{iconType:l.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(i,{iconType:l.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),g&&e.jsxs(k,{gap:"2",children:[e.jsx(q,{}),e.jsx(y,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(i,{iconType:l.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(i,{iconType:l.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]})]})};U.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},uttaksplan:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""}}};export{U as C};
