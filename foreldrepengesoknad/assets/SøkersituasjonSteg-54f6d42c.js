import{j as e}from"./jsx-runtime-1caa8f64.js";import{r as f}from"./index-1cdf6ce0.js";import{u as v,S as h,b as s,R as t,B as y}from"./Tidsperioden-d3b158ba.js";import{u as F,F as b,E as C,R as d}from"./ErrorSummaryHookForm-5c64f07e.js";import"./index-753920cd.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{i as l}from"./dateFormValidation-13e10f67.js";import{u as N,C as m,a as R}from"./FpDataContext-c0784ba8.js";import{u as _,a as E}from"./useFpNavigator-381c5d5e.js";import{V,H as B}from"./IntlProvider-669da569.js";const M=({kjønn:o,mellomlagreSøknadOgNaviger:j,avbrytSøknad:p})=>{const a=v(),S=_(),r=E(j),[i,c]=f.useState(!1),n=N(m.SØKERSITUASJON),g=R(m.SØKERSITUASJON),k=F({defaultValues:n?{...n}:void 0}),x=u=>(c(!0),g({situasjon:u.situasjon,rolle:u.rolle||"far"}),r.goToNextDefaultStep());return e.jsx(h,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:p,onContinueLater:r.fortsettSøknadSenere,steps:S,children:e.jsx(b,{formMethods:k,onSubmit:x,children:e.jsxs(V,{gap:"10",children:[e.jsx(C,{}),e.jsxs(d,{name:"situasjon",label:e.jsx(s,{id:"søkersituasjon.text.situasjon"}),validate:[l(a.formatMessage({id:"søkersituasjon.validering.oppgiFodselEllerAdopsjon"}))],children:[e.jsx(t,{value:"fødsel",children:e.jsx(s,{id:"søkersituasjon.radioButton.fødsel"})}),e.jsx(t,{value:"adopsjon",children:e.jsx(s,{id:"søkersituasjon.radioButton.adopsjon"})})]}),o==="K"&&e.jsxs(d,{name:"rolle",label:e.jsx(s,{id:"søkersituasjon.text.rolle"}),validate:[l(a.formatMessage({id:"søkersituasjon.validering.oppgiHvaDuSokerSom"}))],children:[e.jsx(t,{value:"mor",children:e.jsx(s,{id:"søkersituasjon.radioButton.mor"})}),e.jsx(t,{value:"medmor",children:e.jsx(s,{id:"søkersituasjon.radioButton.medmor"})})]}),e.jsx(B,{justify:"center",children:e.jsx(y,{type:"submit",disabled:i,loading:i,children:e.jsx(s,{id:"søknad.gåVidere"})})})]})})})},L=M;try{SkersituasjonSteg.displayName="SkersituasjonSteg",SkersituasjonSteg.__docgenInfo={description:"",displayName:"SkersituasjonSteg",props:{kjønn:{defaultValue:null,description:"",name:"kjønn",required:!0,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{L as S};
