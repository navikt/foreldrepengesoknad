import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{r as R}from"./index-CTjT7uj6.js";import{d as k,u as D,F as K,E as z,R as b}from"./ErrorSummaryHookForm-DsXPVMwo.js";import{u as j}from"./index-DSgjoNiG.js";import{A as I,l as c,E as m,S as W,d as Y}from"./ByttBrowserModal-Db6MxZXB.js";import{R as l}from"./Tidsperioden-Bwm_FIru.js";import{i as p}from"./dateFormValidation-pcF71gb3.js";import{p as y}from"./Uttaksdagen-Cq_fjHH8.js";import{b as G}from"./bemUtils-DmNyTjfb.js";import{V as t,B as Q,H as X}from"./VStack-BeCluNci.js";import{B as s,a}from"./Label-C_UMiHsP.js";import{M as n}from"./message-CjkJih2D.js";import{l as u}from"./links-BegG-28I.js";import{L as S}from"./Link-D0RLsnK2.js";const A=({arbeidsforhold:r,harArbeidsforhold:d})=>{const f=j();if(!d)return null;const h=G("arbeidsforholdInfoBox");return e.jsx(t,{gap:"2",children:r.map(i=>e.jsx(Q,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(t,{gap:"4",children:[e.jsxs(X,{justify:"space-between",children:[e.jsx(s,{className:h.element("name"),children:i.arbeidsgiverIdType==="orgnr"||i.arbeidsgiverNavn?i.arbeidsgiverNavn:e.jsx(n,{id:"HarArbeidsforhold.arbeidsgiver"})}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.stillingsprosent",values:{stillingsprosent:i.stillingsprosent}})})]}),i.arbeidsgiverIdType==="orgnr"&&e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.organisasjonsnummer",values:{organisasjonsnummer:i.arbeidsgiverId}})}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.periode",values:{fom:y(i.fom),tom:i.tom?y(i.tom):f.formatMessage({id:"HarArbeidsforhold.pågående"})}})})]})},i.arbeidsgiverId+i.fom+i.tom))})};A.__docgenInfo={description:"",methods:[],displayName:"HarArbeidsforhold",props:{arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},harArbeidsforhold:{required:!0,tsType:{name:"boolean"},description:""}}};const F=({harArbeidsforhold:r})=>r?null:e.jsx(I,{variant:"info",size:"small",children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold"})});F.__docgenInfo={description:"",methods:[],displayName:"HarIkkeArbeidsforhold",props:{harArbeidsforhold:{required:!0,tsType:{name:"boolean"},description:""}}};const N=({arbeidsforhold:r,visManglerInfo:d=!0})=>{const f=r!==void 0&&r.length>0,h=j();return e.jsxs(t,{gap:"4",children:[e.jsx(F,{harArbeidsforhold:f}),e.jsx(A,{harArbeidsforhold:f,arbeidsforhold:r}),d&&e.jsx(k,{onOpenChange:c("Svangerskapspenger","Feil_eller_mangler"),header:h.formatMessage({id:"inntektsinformasjon.arbeidsforhold.info"}),children:e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.tekst"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdInformasjon",props:{visManglerInfo:{defaultValue:{value:"true",computed:!1},required:!1}}};const T=()=>e.jsx(I,{variant:"warning",children:e.jsxs(t,{gap:"2",children:[e.jsx(n,{id:"inntektsinformasjon.alert.ingenArbeidsforhold.tittel",values:{b:r=>e.jsx("b",{children:r})}}),e.jsxs("div",{children:[e.jsx(n,{id:"inntektsinformasjon.alert.ingenArbeidsforhold",values:{a:r=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:"https://familie.nav.no/om-svangerskapspenger",children:r})}}),e.jsx(n,{id:"inntektsinformasjon.alert.ingenArbeidsforhold.forsettelse",values:{a:r=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:"https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/chat-med-oss-om-foreldrepenger",children:r})}})]})]})});T.__docgenInfo={description:"",methods:[],displayName:"BrukerKanIkkeSøke"};const q=()=>{const r=j();return e.jsx(k,{onOpenChange:c("Svangerskapspenger","Selvstendig_næringsdrivende"),header:r.formatMessage({id:"inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.apneLabel"}),children:e.jsxs(t,{gap:"2",children:[e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del1"})}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del2",values:{a:d=>e.jsx(S,{href:u.næringsdrivendeInfoBoks,rel:"noreferrer",target:"_blank",children:d})}})})]})})};q.__docgenInfo={description:"",methods:[],displayName:"HvemKanDriveMedEgenNæring"};const H=()=>{const r=j();return e.jsx(k,{onOpenChange:c("Svangerskapspenger","Frilanser"),header:r.formatMessage({id:"inntektsinformasjon.harDuJobbetSomFrilans.apneLabel"}),children:e.jsxs(t,{gap:"2",children:[e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del1"})}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del2"})}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del3",values:{a:d=>e.jsx(S,{href:u.frilanserInfoBoks,rel:"noreferrer",target:"_blank",children:d})}})})]})})};H.__docgenInfo={description:"",methods:[],displayName:"HvemKanVæreFrilanser"};const w=()=>{const r=j();return e.jsx(k,{onOpenChange:c("Svangerskapspenger","Hvordan_påvirke_SVP"),header:r.formatMessage({id:"InfoOmArbeidIUtlandet.apneLabel"}),children:e.jsx("div",{children:e.jsx(n,{id:"InfoOmArbeidIUtlandet.innhold"})})})};w.__docgenInfo={description:"",methods:[],displayName:"InfoOmArbeidIUtlandet"};const _=()=>e.jsxs(m,{size:"small","aria-label":"Informasjon til deg som er i førstegangstjenesten",children:[e.jsx(m.Header,{children:e.jsx(m.Title,{size:"small",as:"h3",children:e.jsx(n,{id:"inntektsinformasjon.infoOmFørstegangstjeneste.tittel"})})}),e.jsx(m.Content,{children:e.jsxs(t,{gap:"4",children:[e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoOmFørstegangstjeneste.content.del1"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoOmFørstegangstjeneste.content.del2",values:{a:r=>e.jsx("a",{href:u.papirsøknadSvp,target:"_blank",rel:"noreferrer",className:"lenke",children:r}),b:r=>e.jsx("a",{href:u.arbeidstilsynetSkjema,target:"_blank",rel:"noreferrer",className:"lenke",children:r})}})})]})})]});_.__docgenInfo={description:"",methods:[],displayName:"InfoOmFørstegangstjeneste"};const O=()=>e.jsxs(m,{size:"small","aria-label":"Info til fiskere",children:[e.jsx(m.Header,{children:e.jsx(m.Title,{size:"small",as:"h3",children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.tittel"})})}),e.jsx(m.Content,{children:e.jsxs(t,{gap:"4",children:[e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del1"})}),e.jsxs("div",{children:[e.jsx(s,{as:"h4",style:{marginBottom:".5rem",fontWeight:"bold"},children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.hyre"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del2"})})]}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del3",values:{a:r=>e.jsx("a",{href:u.hvordanSendeInntektsmelding,target:"_blank",rel:"noreferrer",className:"lenke",children:r})}})}),e.jsxs("div",{children:[e.jsx(s,{as:"h4",style:{marginBottom:".5rem",fontWeight:"bold"},children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.lott"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del4"})})]}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del5",values:{a:r=>e.jsx("a",{href:u.omLottOgHyre,target:"_blank",rel:"noreferrer",className:"lenke",children:r})}})}),e.jsxs("div",{children:[e.jsx(s,{as:"h4",style:{marginBottom:".5rem",fontWeight:"bold"},children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.egenBåt"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del6"})})]}),e.jsxs("div",{children:[e.jsx(s,{as:"h4",style:{marginBottom:".5rem",fontWeight:"bold"},children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.lottOgHyre"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del7"})})]}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del8"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del9"})}),e.jsx(a,{children:e.jsx(n,{id:"inntektsinformasjon.infoTilFiskere.del10",values:{a:r=>e.jsx("a",{href:u.omLottOgHyre,target:"_blank",rel:"noreferrer",className:"lenke",children:r})}})})]})})]});O.__docgenInfo={description:"",methods:[],displayName:"InfoTilFiskere"};const Z=({arbeidsforholdOgInntekt:r,aktiveArbeidsforhold:d,saveOnNext:f,cancelApplication:h,onContinueLater:i,onStepChange:J,goToPreviousStep:M,stepConfig:B,stønadstype:E})=>{const o=j(),[U,V]=R.useState(!1),v=D({defaultValues:r}),C=v.watch("harJobbetSomFrilans"),L=v.watch("harJobbetSomSelvstendigNæringsdrivende"),x=d.length===0&&C===!1&&L===!1,g=E==="Svangerskapspenger";return e.jsx(W,{onCancel:h,steps:B,onContinueLater:i,onStepChange:J,children:e.jsx(K,{formMethods:v,onSubmit:P=>{V(!0),f(P)},children:e.jsxs(t,{gap:"10",children:[e.jsx(z,{}),e.jsx(s,{children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV"})}),e.jsxs(t,{gap:"2",children:[e.jsx(s,{style:{fontWeight:"bold"},children:e.jsx(n,{id:"inntektsinformasjon.arbeidsforhold.label"})}),e.jsx(N,{arbeidsforhold:d})]}),e.jsxs(t,{gap:"1",children:[e.jsxs(b,{name:"harJobbetSomFrilans",label:o.formatMessage({id:"inntektsinformasjon.harDuJobbetSomFrilans"},{erSvp:g}),validate:[p(o.formatMessage({id:"valideringsfeil.frilans.påkrevd"}))],description:g&&o.formatMessage({id:"inntektsinformasjon.beskrivelse"}),children:[e.jsx(l,{value:!1,children:e.jsx(n,{id:"inntektsinformasjon.nei"})}),e.jsx(l,{value:!0,children:e.jsx(n,{id:"inntektsinformasjon.ja"})})]}),e.jsx(H,{})]}),e.jsxs(t,{gap:"1",children:[e.jsxs(b,{name:"harJobbetSomSelvstendigNæringsdrivende",label:o.formatMessage({id:"inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende"},{erSvp:g}),validate:[p(o.formatMessage({id:"valideringsfeil.hattInntektSomNæringsdrivende.påkrevd"}))],description:g&&o.formatMessage({id:"inntektsinformasjon.beskrivelse"}),children:[e.jsx(l,{value:!1,children:e.jsx(n,{id:"inntektsinformasjon.nei"})}),e.jsx(l,{value:!0,children:e.jsx(n,{id:"inntektsinformasjon.ja"})})]}),e.jsx(q,{})]}),g&&e.jsxs(t,{gap:"1",children:[e.jsxs(b,{name:"harHattArbeidIUtlandet",label:o.formatMessage({id:"inntektsinformasjon.hattArbeidIUtlandet"}),validate:[p(o.formatMessage({id:"valideringsfeil.hattArbeidIUtlandet.påkrevd"}))],description:o.formatMessage({id:"inntektsinformasjon.beskrivelse"}),children:[e.jsx(l,{value:!1,children:e.jsx(n,{id:"inntektsinformasjon.nei"})}),e.jsx(l,{value:!0,children:e.jsx(n,{id:"inntektsinformasjon.ja"})})]}),e.jsx(w,{})]}),!g&&e.jsxs(b,{name:"harHattAndreInntektskilder",label:o.formatMessage({id:"inntektsinformasjon.hattAndreInntektskilder"}),validate:[p(o.formatMessage({id:"valideringsfeil.hattAndreInntektskilder.påkrevd"}))],children:[e.jsx(l,{value:!1,children:e.jsx(n,{id:"inntektsinformasjon.nei"})}),e.jsx(l,{value:!0,children:e.jsx(n,{id:"inntektsinformasjon.ja"})})]}),e.jsxs(t,{gap:"4",children:[g&&e.jsx(_,{}),e.jsx(O,{})]}),x&&e.jsx(T,{}),e.jsx(Y,{isNexButtonVisible:!x,isDisabledAndLoading:U,goToPreviousStep:M})]})})})};Z.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOgInntektPanel",props:{arbeidsforholdOgInntekt:{required:!1,tsType:{name:"union",raw:"ArbeidsforholdOgInntektSvp | ArbeidsforholdOgInntektFp",elements:[{name:"intersection",raw:`{
    harHattArbeidIUtlandet: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattArbeidIUtlandet: boolean;
}`,signature:{properties:[{key:"harHattArbeidIUtlandet",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]}]},description:""},aktiveArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: ArbeidsforholdOgInntekt) => void",signature:{arguments:[{type:{name:"union",raw:"ArbeidsforholdOgInntektSvp | ArbeidsforholdOgInntektFp",elements:[{name:"intersection",raw:`{
    harHattArbeidIUtlandet: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattArbeidIUtlandet: boolean;
}`,signature:{properties:[{key:"harHattArbeidIUtlandet",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:`| 'Foreldrepenger'
| 'Engangsstønad'
| 'Svangerskapspenger'
| 'Foreldrepengeplanlegger'
| 'Foreldrepengeveivisere'`,elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"},{name:"literal",value:"'Foreldrepengeplanlegger'"},{name:"literal",value:"'Foreldrepengeveivisere'"}]},description:""}}};export{Z as A,F as H,A as a};
