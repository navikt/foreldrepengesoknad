import{j as s}from"./jsx-runtime-CexXSJP5.js";import{u as g,F as k,E as v,R as u,S as h}from"./ErrorSummaryHookForm-CyzaI7PF.js";import{u as C,R as e}from"./Tidsperioden-CVu3e1Oj.js";import"./index-BP8_t0zE.js";import{S as F}from"./ByttBrowserModal-B57CghBC.js";import{i as d}from"./dateFormValidation-CqgFG339.js";import{u as R,r as M}from"./useFpNavigator-DfueqWWJ.js";import{u as T,C as m,a as D}from"./FpDataContext-QYm6HSmG.js";import{V as E}from"./VStack-B0aVlvzw.js";import{M as o}from"./message-Dwe4nq4q.js";const B=({arbeidsforhold:r,kjønn:l,mellomlagreSøknadOgNaviger:j,avbrytSøknad:p})=>{const t=C(),S=R(r),a=M(r,j),i=T(m.SØKERSITUASJON),x=D(m.SØKERSITUASJON),f=g({defaultValues:i?{...i}:void 0}),c=n=>(x({situasjon:n.situasjon,rolle:n.rolle||"far"}),a.goToNextDefaultStep());return s.jsx(F,{bannerTitle:t.formatMessage({id:"søknad.pageheading"}),onCancel:p,onContinueLater:a.fortsettSøknadSenere,steps:S,children:s.jsx(k,{formMethods:f,onSubmit:c,children:s.jsxs(E,{gap:"10",children:[s.jsx(v,{}),s.jsxs(u,{name:"situasjon",label:s.jsx(o,{id:"søkersituasjon.text.situasjon"}),validate:[d(t.formatMessage({id:"søkersituasjon.validering.oppgiFodselEllerAdopsjon"}))],children:[s.jsx(e,{value:"fødsel",children:s.jsx(o,{id:"søkersituasjon.radioButton.fødsel"})}),s.jsx(e,{value:"adopsjon",children:s.jsx(o,{id:"søkersituasjon.radioButton.adopsjon"})})]}),l==="K"&&s.jsxs(u,{name:"rolle",label:s.jsx(o,{id:"søkersituasjon.text.rolle"}),validate:[d(t.formatMessage({id:"søkersituasjon.validering.oppgiHvaDuSokerSom"}))],children:[s.jsx(e,{value:"mor",children:s.jsx(o,{id:"søkersituasjon.radioButton.mor"})}),s.jsx(e,{value:"medmor",children:s.jsx(o,{id:"søkersituasjon.radioButton.medmor"})})]}),s.jsx(h,{goToPreviousStep:a.goToPreviousDefaultStep})]})})})};B.__docgenInfo={description:"",methods:[],displayName:"SøkersituasjonSteg"};export{B as S};
