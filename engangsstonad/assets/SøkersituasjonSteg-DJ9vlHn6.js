import{u as m,j as s}from"./index-DZ_iNobP.js";import{u as x,a as k,b as f,C as a,c as u,S as v,V as h,F as o,e as C}from"./useEsNavigator-CCPepSoW.js";import{u as F,F as E,E as R,R as T,a as S,S as D}from"./ErrorSummaryHookForm-BK0p70mm.js";import"./index-Dl6G-zuu.js";const d=({mellomlagreOgNaviger:j})=>{const n=m(),p=x(),e=k(j),t=f(a.SØKERSITUASJON),r=u(a.SØKERSITUASJON),l=u(a.OM_BARNET),g=F({defaultValues:t}),c=i=>(r(i),t&&t.situasjon!==i.situasjon&&l(void 0),e.goToNextDefaultStep());return s.jsx(v,{bannerTitle:n.formatMessage({id:"Søknad.Pageheading"}),onCancel:e.avbrytSøknad,onContinueLater:e.fortsettSøknadSenere,steps:p,children:s.jsx(E,{formMethods:g,onSubmit:c,children:s.jsxs(h,{gap:"10",children:[s.jsx(R,{}),s.jsxs(T,{name:"situasjon",label:s.jsx(o,{id:"SøkersituasjonSteg.Situasjon"}),validate:[C(n.formatMessage({id:"SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon"}))],children:[s.jsx(S,{value:"fødsel",children:s.jsx(o,{id:"SøkersituasjonSteg.Fødsel"})}),s.jsx(S,{value:"adopsjon",children:s.jsx(o,{id:"SøkersituasjonSteg.Adopsjon"})})]}),s.jsx(D,{goToPreviousStep:e.goToPreviousDefaultStep,saveDataOnPreviousClick:r})]})})})},M=d;d.__docgenInfo={description:"",methods:[],displayName:"SøkersituasjonSteg"};export{M as S};
