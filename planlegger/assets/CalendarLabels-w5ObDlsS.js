import{j as e,a3 as t,Y as n,a4 as w,a9 as x,a$ as O,a2 as M,W as y,b0 as l,b1 as i}from"./iframe-81xAqr4z.js";import{H as R,n as _,o as A}from"./HvemPlanleggerUtils-CviXRc1a.js";import{e as P}from"./barnetUtils-DyS6cv1g.js";import{b as S,c as H,a as C}from"./hvemHarRettUtils-_OdHUoVQ.js";import{C as u}from"./CalendarIconLabel-D1En8LX_.js";import{b as E}from"./BarnehageplassSteg-BAwF3XUk.js";import{F as k}from"./FamiliehendelseLabel-7TPSe23S.js";const c=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(t,{children:[r&&e.jsx(n,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(n,{id:"OversiktSteg.MedAktivitetskrav"})]})});c.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const v=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:w(r)}})})});v.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const d=({barnet:r})=>{const a=x(),s=E(r);return e.jsx(u,{iconType:"purple",children:e.jsx(t,{children:e.jsx(n,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(s,{day:"2-digit",month:"short"})}})})})};d.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const q=()=>e.jsx(u,{iconType:"blue",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.ForeldrepengerLabel"})})});q.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const I=({barnet:r,hvemPlanlegger:a,hvemHarRett:s,uttaksplan:h})=>{const F=x(),o=P(r),b=a.type===R.FAR_OG_FAR,B=_(a,F),p=A(a,F),g=b&&!o,j=b&&o,m=h.find(f=>f.utsettelseÅrsak&&f.utsettelseÅrsak===O.Ferie)!==void 0,T=!g&&(s==="beggeHarRett"||S(s,a)&&!j||H(s,a)),L=!g&&p&&(C(s,a)||s==="kunSøker1HarRett"&&j);return e.jsxs(M,{gap:"1",children:[T&&e.jsxs(y,{gap:"2",children:[e.jsx(v,{søkerTekst:B,isBluePanel:!0}),p&&s==="beggeHarRett"&&e.jsx(v,{søkerTekst:p}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),L&&e.jsxs(y,{gap:"2",children:[e.jsx(c,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(c,{}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),g&&e.jsxs(y,{gap:"2",children:[e.jsx(q,{}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),m&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]})]})};I.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
