import{j as t}from"./tslib.es6-C_-gbNBy.js";import{C as u,H as x,M as D}from"./ByttBrowserModal-iiEVx-55.js";import{T as h}from"./TidligereUtenlandsoppholdPanel-3M6rkG8y.js";import{u as E,a as L,n as O}from"./useSvpNavigator-Bmm3IUMq.js";import"./dateFormValidation-BKcBHHfi.js";import{u as s,C as o,b as U,a}from"./routes-BKH065He.js";const p=({mellomlagreSøknadOgNaviger:i,avbrytSøknad:r,arbeidsforhold:n})=>{const d=E(n),e=L(i,n),l=O(s(o.UTENLANDSOPPHOLD)),g=s(o.UTENLANDSOPPHOLD_TIDLIGERE),S=U(o.UTENLANDSOPPHOLD_TIDLIGERE),T=c=>{S(c);const m=l.skalBoUtenforNorgeNeste12Mnd?a.SKAL_BO_I_UTLANDET:a.INNTEKTSINFORMASJON;return e.goToNextStep(m)},N=()=>{};return t.jsxs(u,{children:[t.jsx(x,{size:"large",children:t.jsx(D,{id:"søknad.pageheading"})}),t.jsx(h,{tidligereUtenlandsopphold:g,saveOnNext:T,saveOnPrevious:N,onStepChange:e.goToNextStep,cancelApplication:r,onContinueLater:e.fortsettSøknadSenere,goToPreviousStep:e.goToPreviousDefaultStep,stepConfig:d})]})},A=p;p.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdSteg"};export{A as T};
