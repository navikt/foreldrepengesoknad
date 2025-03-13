import{j as e}from"./jsx-runtime-CLpGMVip.js";import{B as t,M as i,u as j,C as p,w as m}from"./VeiviserPage-CwIKt0kk.js";import{S as h,m as S,n as M}from"./HvemPlanleggerUtils-Cqv6rjI4.js";import{b as R}from"./barnetUtils-DRwiTi7P.js";import{a as _,b as A,h as O}from"./hvemHarRettUtils-CdMeQXRE.js";import"./index-CR__hKHy.js";import{C as o}from"./CalendarIconLabel-Q5I-hpXo.js";import{c as w}from"./stringUtils-DApHD7Y2.js";import{b as T}from"./BarnehageplassSteg-Dml_FaAy.js";import{F as g}from"./FamiliehendelseLabel-Cw5qyQ2w.js";import{V as L,H as k}from"./VStack-2apmvZh_.js";const y=({utenAktivitetskrav:r=!1,isBluePanel:a=!1})=>e.jsx(o,{iconType:a?"blue":"green",children:e.jsxs(t,{children:[r&&e.jsx(i,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(i,{id:"OversiktSteg.MedAktivitetskrav"})]})});y.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const c=({søkerTekst:r,isBluePanel:a=!1})=>e.jsx(o,{iconType:a?"blue":"green",children:e.jsx(t,{children:e.jsx(i,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:w(r)}})})});c.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const l=({barnet:r})=>{const a=j(),n=T(r);return e.jsx(o,{iconType:"purple",children:e.jsx(t,{children:e.jsx(i,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:a.formatDate(n,{day:"2-digit",month:"short"})}})})})};l.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const f=()=>e.jsx(o,{iconType:"blue",children:e.jsx(t,{children:e.jsx(i,{id:"OversiktSteg.ForeldrepengerLabel"})})});f.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel"};const P=({barnet:r,hvemPlanlegger:a,hvemHarRett:n})=>{const v=j(),s=R(r),F=a.type===h.FAR_OG_FAR,q=S(a,v),u=M(a,v),d=F&&!s,b=F&&s,B=!d&&(n==="beggeHarRett"||_(n,a)&&!b||A(n,a)),x=!d&&u&&(O(n,a)||n==="kunSøker1HarRett"&&b);return e.jsxs(L,{gap:"1",children:[B&&e.jsxs(k,{gap:"2",children:[e.jsx(c,{søkerTekst:q,isBluePanel:!0}),u&&n==="beggeHarRett"&&e.jsx(c,{søkerTekst:u}),e.jsx(g,{barnet:r}),!s&&e.jsx(l,{barnet:r}),e.jsx(p,{iconType:m.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})})]}),x&&e.jsxs(k,{gap:"2",children:[e.jsx(y,{utenAktivitetskrav:!0,isBluePanel:!0}),e.jsx(y,{}),e.jsx(g,{barnet:r}),!s&&e.jsx(l,{barnet:r}),e.jsx(p,{iconType:m.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})})]}),d&&e.jsxs(k,{gap:"2",children:[e.jsx(f,{}),e.jsx(g,{barnet:r}),!s&&e.jsx(l,{barnet:r}),e.jsx(p,{iconType:m.BLACK,children:e.jsx(t,{style:{whiteSpace:"nowrap"},children:"Tapte dager"})})]})]})};P.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""}}};export{P as C};
