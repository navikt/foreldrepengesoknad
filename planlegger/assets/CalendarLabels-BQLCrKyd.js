import{j as e,a4 as t,Y as n,a5 as w,aa as x,a3 as M,W as c,b2 as l,b3 as i}from"./iframe-D8mjBvJA.js";import{H as R,n as _,o as A}from"./HvemPlanleggerUtils-BiD0mqJ_.js";import{e as P}from"./barnetUtils-DdBsnp7q.js";import{b as S,c as E,a as H}from"./hvemHarRettUtils-CtA2zEDd.js";import{C as u}from"./CalendarIconLabel-D0KrBSVe.js";import{b as C}from"./BarnehageplassSteg-xRmilAnR.js";import{F as k}from"./FamiliehendelseLabel-s2S2uOu9.js";const v=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(t,{children:[r&&e.jsx(n,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(n,{id:"OversiktSteg.MedAktivitetskrav"})]})});v.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const F=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:w(r)}})})});F.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const d=({barnet:r})=>{const a=x(),s=C(r);return e.jsx(u,{iconType:"purple",children:e.jsx(t,{children:e.jsx(n,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(s,{day:"2-digit",month:"short"})}})})})};d.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const B=()=>e.jsx(u,{iconType:"blue",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.ForeldrepengerLabel"})})});B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const I=({barnet:r,hvemPlanlegger:a,hvemHarRett:s,uttaksplan:T,inneholderTapteDager:p})=>{const b=x(),o=P(r),j=a.type===R.FAR_OG_FAR,h=_(a,b),g=A(a,b),m=j&&!o,f=j&&o,y=T.some(q=>q.utsettelseÅrsak&&q.utsettelseÅrsak==="LOVBESTEMT_FERIE"),L=!m&&(s==="beggeHarRett"||S(s,a)&&!f||E(s,a)),O=!m&&g&&(H(s,a)||s==="kunSøker1HarRett"&&f);return e.jsxs(M,{gap:"space-4",children:[L&&e.jsxs(c,{gap:"space-8",children:[e.jsx(F,{søkerTekst:h,isBluePanel:!0}),g&&s==="beggeHarRett"&&e.jsx(F,{søkerTekst:g}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),O&&e.jsxs(c,{gap:"space-8",children:[e.jsx(v,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(v,{}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),m&&e.jsxs(c,{gap:"space-8",children:[e.jsx(B,{}),e.jsx(k,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]})]})};I.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},uttaksplan:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""},inneholderTapteDager:{required:!1,tsType:{name:"boolean"},description:""}}};export{I as C};
