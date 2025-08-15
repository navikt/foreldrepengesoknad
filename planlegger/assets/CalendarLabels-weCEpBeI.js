import{j as e,a5 as t,Z as n,a6 as O,ab as x,b2 as M,a4 as R,X as k,b3 as l,b4 as i}from"./iframe-DgOJv59J.js";import{H as _,n as A,o as P}from"./HvemPlanleggerUtils-DH4lpjzv.js";import{e as S}from"./barnetUtils-CDtTXb69.js";import{b as H,c as C,a as E}from"./hvemHarRettUtils-CpUjoCfJ.js";import{C as u}from"./CalendarIconLabel-a02XQPge.js";import{b as I}from"./BarnehageplassSteg-JSUGYtSV.js";import{F as c}from"./FamiliehendelseLabel-Bk13xXFQ.js";const v=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(t,{children:[r&&e.jsx(n,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(n,{id:"OversiktSteg.MedAktivitetskrav"})]})});v.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const F=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:O(r)}})})});F.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const d=({barnet:r})=>{const a=x(),s=I(r);return e.jsx(u,{iconType:"purple",children:e.jsx(t,{children:e.jsx(n,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(s,{day:"2-digit",month:"short"})}})})})};d.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const B=()=>e.jsx(u,{iconType:"blue",children:e.jsx(t,{children:e.jsx(n,{id:"OversiktSteg.ForeldrepengerLabel"})})});B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const N=({barnet:r,hvemPlanlegger:a,hvemHarRett:s,uttaksplan:T,inneholderTapteDager:p})=>{const b=x(),o=S(r),j=a.type===_.FAR_OG_FAR,h=A(a,b),g=P(a,b),m=j&&!o,f=j&&o,y=T.find(q=>q.utsettelseÅrsak&&q.utsettelseÅrsak===M.Ferie)!==void 0,L=!m&&(s==="beggeHarRett"||H(s,a)&&!f||C(s,a)),w=!m&&g&&(E(s,a)||s==="kunSøker1HarRett"&&f);return e.jsxs(R,{gap:"1",children:[L&&e.jsxs(k,{gap:"2",children:[e.jsx(F,{søkerTekst:h,isBluePanel:!0}),g&&s==="beggeHarRett"&&e.jsx(F,{søkerTekst:g}),e.jsx(c,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),w&&e.jsxs(k,{gap:"2",children:[e.jsx(v,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(v,{}),e.jsx(c,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]}),m&&e.jsxs(k,{gap:"2",children:[e.jsx(B,{}),e.jsx(c,{barnet:r}),!o&&e.jsx(d,{barnet:r}),p&&e.jsx(l,{iconType:i.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.TapteDager"})})}),y&&e.jsx(l,{iconType:i.BLUEOUTLINE,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:e.jsx(n,{id:"CalendarLabels.Ferie"})})})]})]})};N.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},uttaksplan:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""},inneholderTapteDager:{required:!1,tsType:{name:"boolean"},description:""}}};export{N as C};
