import{d as l,J as g,u,i as n,b as p,K as m,j as c}from"./Tidsperioden-C8HcA-rk.js";import{W as b}from"./dateFormValidation-A9ng-RC0.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{j as i}from"./jsx-runtime-DoxjgJx5.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{b as f,B as a}from"./Link-BqZ6CohM.js";const v=(e,t,r)=>{if(r!==void 0)return e?r:t?b(r,void 0):g(r)},R=(e,t,r,o)=>{const s=v(t,r,o);return e.filter(d=>d.tom===void 0||d.tom===null||s!==void 0&&l(s).isSameOrBefore(l.utc(d.tom),"days"))};var A=(e=>(e.SLUTTPAKKE="ETTERLØNN_SLUTTPAKKE",e.MILITÆRTJENESTE="MILITÆR_ELLER_SIVILTJENESTE",e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(A||{});const h=({harArbeidsforhold:e})=>{const t=u();return e?null:i.jsx("div",{className:"arbeidsforholdInfoBox",style:{marginBottom:"1rem"},children:i.jsx(f,{children:n(t,"inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold")})})};h.__docgenInfo={description:"",methods:[],displayName:"HarIkkeArbeidsforhold",props:{harArbeidsforhold:{required:!0,tsType:{name:"boolean"},description:""}}};const I=({arbeidsforhold:e,harArbeidsforhold:t})=>{const r=u();if(!t)return null;const o=c("arbeidsforholdInfoBox");return i.jsx("ul",{className:"arbeidsforholdList",children:e.map(s=>i.jsx("li",{children:i.jsxs("div",{className:o.block,children:[i.jsxs("div",{className:o.element("topRow"),children:[i.jsx(a,{className:o.element("label"),children:s.arbeidsgiverIdType==="orgnr"?s.arbeidsgiverNavn:n(r,"arbeidsgiver")}),i.jsx(a,{className:o.element("stillingsprosent"),children:n(r,"inntektsinformasjon.arbeidsforhold.stillingsprosent",{stillingsprosent:s.stillingsprosent})})]}),i.jsx(p,{padBottom:"m",children:s.arbeidsgiverIdType==="orgnr"&&i.jsx(a,{children:n(r,"inntektsinformasjon.arbeidsforhold.organisasjonsnummer",{organisasjonsnummer:s.arbeidsgiverId})})}),i.jsx(a,{children:n(r,"inntektsinformasjon.arbeidsforhold.periode",{fom:m(s.fom),tom:s.tom?m(s.tom):n(r,"pågående")})})]})},s.arbeidsgiverId))})};I.__docgenInfo={description:"",methods:[],displayName:"HarArbeidsforhold",props:{arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},harArbeidsforhold:{required:!0,tsType:{name:"boolean"},description:""}}};var j=(e=>(e.FISKER="FISKE",e.JORDBRUK="JORDBRUK_SKOGBRUK",e.DAGMAMMA="DAGMAMMA",e.ANNET="ANNEN",e))(j||{});export{A,h as H,j as N,I as a,R as g};
