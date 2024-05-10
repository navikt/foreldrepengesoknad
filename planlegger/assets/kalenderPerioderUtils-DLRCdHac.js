import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{u as F,F as c}from"./index-e2vXP8VC.js";import{S as b,h as D,i as I,e as N}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as B}from"./barnetUtils-Dtg6gkcN.js";import{h as G,a as K,b as H,u as C}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as V,b as z,w as M,f as J}from"./uttakUtils-CrBM_WY2.js";import{I as R}from"./dateUtils-C_C2kvi-.js";import{d as S}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as P}from"./CalendarIconLabel-C9DNWetD.js";import{B as T}from"./Label-DKKZxAV5.js";import{F as Q}from"./FamiliehendelseLabel-BTP-zh4d.js";import{V as W,H as w}from"./VStack-C-EA7mzX.js";import{D as p}from"./Calendar-C0tOnmix.js";const y=r=>r.charAt(0).toUpperCase()+r.slice(1),X="_srOnly_19lbm_1",_={srOnly:X},O=({utenAktivitetskrav:r=!1,tekstPart1:n,tekstPart2:e,startdato:a,sluttdato:i,isBluePanel:s=!1,valgtStønadskonto:o})=>{const u=F();return t.jsxs(P,{iconType:s?"blue":"green",children:[t.jsxs(T,{children:[r&&t.jsx(c,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:y(n),uker:V(o),hvemPart2:y(e)}}),!r&&t.jsx(c,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:y(n),uker:z(o),hvemPart2:y(e)}})]}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:y(n),startdato:u.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:u.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};O.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const A=({søkerTekst:r,startdato:n,sluttdato:e,isBluePanel:a=!1})=>{const i=F();return t.jsxs(P,{iconType:a?"blue":"green",children:[t.jsx(T,{children:t.jsx(c,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:y(r),uker:M(n,e),dato:i.formatDate(n,{day:"2-digit",month:"short",weekday:"long"})}})}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:y(r),uker:M(n,e),dato:i.formatDate(e,{day:"2-digit",month:"short",weekday:"long"})}})})]})};A.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const E=({startdato:r,sluttdato:n})=>{const e=F();return t.jsxs(P,{iconType:"blue",children:[t.jsx(T,{children:t.jsx(c,{id:"OversiktSteg.ForeldrepengerLabel"})}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:e.formatDate(r,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:e.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};E.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const Y=({barnet:r,uttaksdata:n,hvemPlanlegger:e,hvemHarRett:a,valgtStønadskonto:i})=>{const s=F(),o=B(r),u=e.type===b.FAR_OG_FAR,d=D(e,s),l=I(e,s),{startdatoPeriode1:k,sluttdatoPeriode1:m,startdatoPeriode2:g,sluttdatoPeriode2:v}=n,j=u&&!o,q=u&&o,L=!j&&(a==="beggeHarRett"||G(a,e)&&!q||K(a,e)),U=!j&&l&&g&&v&&(H(a,e)||a==="kunSøker1HarRett"&&q),f=a==="kunSøker1HarRett"&&q;return t.jsxs(W,{gap:"1",children:[L&&t.jsxs(w,{gap:"1",children:[t.jsx(A,{søkerTekst:d,startdato:k,sluttdato:m,isBluePanel:!0}),l&&a==="beggeHarRett"&&g&&v&&t.jsx(A,{søkerTekst:l,startdato:g,sluttdato:v})]}),U&&t.jsxs(t.Fragment,{children:[t.jsx(O,{utenAktivitetskrav:!0,valgtStønadskonto:i,tekstPart1:f?d:l,tekstPart2:f?l:d,startdato:k,sluttdato:m,isBluePanel:!0}),t.jsx(O,{valgtStønadskonto:i,tekstPart1:f?d:l,tekstPart2:f?l:d,startdato:g,sluttdato:v})]}),t.jsxs(w,{gap:"2",children:[j&&t.jsx(E,{startdato:k,sluttdato:m}),t.jsx(Q,{barnet:r})]})]})};Y.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},uttaksdata:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const h=(r,n)=>[{fom:r,tom:r,color:p.PINK},{fom:S(r).add(1,"day").format(R),tom:n,color:p.BLUE}],x=(r,n,e,a,i,s)=>{const o=[];return r||o.push({fom:n,tom:S(a).subtract(1,"day").format(R),color:p.BLUE}),o.push({fom:a,tom:a,color:p.PINK}),o.push({fom:S(a).add(1,"day").format(R),tom:e,color:p.BLUE}),i&&s&&o.push({fom:i,tom:s,color:p.GREEN}),o},Z=(r,n,e,a,i)=>[{fom:e,tom:e,color:p.PINK},{fom:r,tom:n,color:p.BLUE},{fom:a,tom:i,color:p.GREEN}],$=(r,n,e)=>r.type===b.FAR_OG_FAR&&!e&&n!=="ingenHarRett",ee=(r,n)=>n==="kunSøker1HarRett"&&r.type===b.FAR_OG_FAR,re=(r,n)=>n==="kunSøker1HarRett"&&r.type===b.FAR,ce=(r,n,e,a,i)=>{const s=C(a),{startdatoPeriode1:o,sluttdatoPeriode1:u,familiehendelsedato:d,startdatoPeriode2:l,sluttdatoPeriode2:k}=J(s,e,r,n,i),m=B(n),g=l&&k;if($(e,s,m)||re(e,s))return h(d,u);if(s==="beggeHarRett"&&g)return x(m,o,u,d,l,k);if(s==="kunSøker1HarRett"&&N(e))return x(m,o,u,d);if((s==="kunSøker2HarRett"||ee(e,s)||!m)&&g)return Z(o,u,d,l,k);if(H(s,e)&&m)return h(u,d);throw Error("Ingen perioder finnes")};export{Y as C,ce as l};
