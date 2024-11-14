import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{B as o,M as i,u as f}from"./composeEventHandlers-CQxkItEI.js";import{S as x,m as M,n as R}from"./HvemPlanleggerUtils-CRuekH12.js";import{b as S}from"./barnetUtils-DlK2ezHC.js";import{a as O,b as _,h as A}from"./hvemHarRettUtils-DaTWCV6h.js";import{C as u}from"./CalendarIconLabel-BGbS44xu.js";import"./index-CTjT7uj6.js";import{c as h}from"./stringUtils-BLFzASq_.js";import{b as P}from"./BarnehageplassSteg-BkbxdoJ_.js";import{F as g}from"./FamiliehendelseLabel-BuaJ6Zvx.js";import{V as T,H as k}from"./VStack-CL9KkpXr.js";const y=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsxs(o,{children:[r&&e.jsx(i,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(i,{id:"OversiktSteg.MedAktivitetskrav"})]})});y.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},tekstPart1:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const v=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(u,{iconType:a?"blue":"green",children:e.jsx(o,{children:e.jsx(i,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:h(r)}})})});v.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const l=({barnet:r})=>{const a=f(),n=P(r);return e.jsx(u,{iconType:"purple",children:e.jsx(o,{children:e.jsx(i,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(n,{day:"2-digit",month:"short"})}})})})};l.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const j=()=>e.jsx(u,{iconType:"blue",children:e.jsx(o,{children:e.jsx(i,{id:"OversiktSteg.ForeldrepengerLabel"})})});j.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const w=({barnet:r,hvemPlanlegger:a,hvemHarRett:n})=>{const c=f(),t=S(r),F=a.type===x.FAR_OG_FAR,d=M(a,c),s=R(a,c),p=F&&!t,m=F&&t,q=!p&&(n==="beggeHarRett"||O(n,a)&&!m||_(n,a)),B=!p&&s&&(A(n,a)||n==="kunSøker1HarRett"&&m),b=n==="kunSøker1HarRett"&&m;return e.jsxs(T,{gap:"1",children:[q&&e.jsxs(k,{gap:"2",children:[e.jsx(v,{søkerTekst:d,isBluePanel:!0}),s&&n==="beggeHarRett"&&e.jsx(v,{søkerTekst:s}),e.jsx(g,{barnet:r}),!t&&e.jsx(l,{barnet:r})]}),B&&e.jsxs(k,{gap:"2",children:[e.jsx(y,{utenAktivitetskrav:!0,tekstPart1:b?d:s,isBluePanel:!0}),e.jsx(y,{tekstPart1:b?d:s}),e.jsx(g,{barnet:r}),!t&&e.jsx(l,{barnet:r})]}),p&&e.jsxs(k,{gap:"2",children:[e.jsx(j,{}),e.jsx(g,{barnet:r}),!t&&e.jsx(l,{barnet:r})]})]})};w.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""}}};export{w as C};
