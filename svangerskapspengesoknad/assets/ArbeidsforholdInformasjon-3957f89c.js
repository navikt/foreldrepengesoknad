import{u as p,j as e}from"./index-f7e8eec7.js";import{V as m,H as u,q as c,j as h}from"./VStack-1b7d0c8f.js";import"./index-f1f2c4b1.js";import{B as j}from"./routes-999d7714.js";import{B as o,F as i}from"./Button-07c65ca4.js";import{R as g}from"./ReadMore-c884ad2a.js";const t=({arbeidsforhold:s,harArbeidsforhold:d})=>{const n=p();if(!d)return null;const a=h("arbeidsforholdInfoBox");return e.jsx(m,{gap:"2",children:s.map(r=>e.jsx(j,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(m,{gap:"4",children:[e.jsxs(u,{justify:"space-between",children:[e.jsx(o,{className:a.element("name"),children:r.arbeidsgiverIdType==="orgnr"||r.arbeidsgiverNavn?r.arbeidsgiverNavn:e.jsx(i,{id:"privat.arbeidsgiver"})}),e.jsx(o,{children:e.jsx(i,{id:"inntektsinformasjon.arbeidsforhold.stillingsprosent",values:{stillingsprosent:r.stillingsprosent}})})]}),r.arbeidsgiverIdType==="orgnr"&&e.jsx(o,{children:e.jsx(i,{id:"inntektsinformasjon.arbeidsforhold.organisasjonsnummer",values:{organisasjonsnummer:r.arbeidsgiverId}})}),e.jsx(o,{children:e.jsx(i,{id:"inntektsinformasjon.arbeidsforhold.periode",values:{fom:c(r.fom),tom:r.tom?c(r.tom):n.formatMessage({id:"pågående"})}})})]})},r.arbeidsgiverId+r.fom+r.tom))})};try{t.displayName="HarArbeidsforhold",t.__docgenInfo={description:"",displayName:"HarArbeidsforhold",props:{arbeidsforhold:{defaultValue:null,description:"",name:"arbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},harArbeidsforhold:{defaultValue:null,description:"",name:"harArbeidsforhold",required:!0,type:{name:"boolean"}}}}}catch{}const l=({harArbeidsforhold:s})=>s?null:e.jsx("div",{className:"arbeidsforholdInfoBox",style:{marginBottom:"1rem"},children:e.jsx(o,{children:e.jsx(i,{id:"inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold"})})});try{l.displayName="HarIkkeArbeidsforhold",l.__docgenInfo={description:"",displayName:"HarIkkeArbeidsforhold",props:{harArbeidsforhold:{defaultValue:null,description:"",name:"harArbeidsforhold",required:!0,type:{name:"boolean"}}}}}catch{}const f=({arbeidsforhold:s,visManglerInfo:d=!0})=>{const n=s!==void 0&&s.length>0,a=p();return e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx(l,{harArbeidsforhold:n}),e.jsx(t,{harArbeidsforhold:n,arbeidsforhold:s}),d&&e.jsx(g,{header:a.formatMessage({id:"inntektsinformasjon.arbeidsforhold.info"}),children:e.jsx(o,{children:e.jsx(i,{id:"inntektsinformasjon.arbeidsforhold.tekst"})})})]})};try{f.displayName="ArbeidsforholdInformasjon",f.__docgenInfo={description:"",displayName:"ArbeidsforholdInformasjon",props:{arbeidsforhold:{defaultValue:null,description:"",name:"arbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},visManglerInfo:{defaultValue:{value:"true"},description:"",name:"visManglerInfo",required:!1,type:{name:"boolean"}}}}}catch{}export{f as A};
