import{j as t}from"./tslib.es6-C_-gbNBy.js";import{H as u,a as x}from"./Modal-jpjfRTmg.js";import{C as D}from"./CalendarLabel-BOjWYyGG.js";import{T as f}from"./TidligereUtenlandsoppholdPanel-CKuNFYri.js";import{u as h,a as E,n as L}from"./useSvpNavigator-CcE3CUWV.js";import"./dateFormValidation-ChXBOKMN.js";import{u as s,C as o,b as O,a}from"./routes-BKH065He.js";const p=({mellomlagreSøknadOgNaviger:r,avbrytSøknad:i,arbeidsforhold:n})=>{const d=h(n),e=E(r,n),l=L(s(o.UTENLANDSOPPHOLD)),g=s(o.UTENLANDSOPPHOLD_TIDLIGERE),S=O(o.UTENLANDSOPPHOLD_TIDLIGERE),T=N=>{S(N);const c=l.skalBoUtenforNorgeNeste12Mnd?a.SKAL_BO_I_UTLANDET:a.INNTEKTSINFORMASJON;return e.goToNextStep(c)},m=()=>{};return t.jsxs(D,{children:[t.jsx(u,{size:"large",children:t.jsx(x,{id:"søknad.pageheading"})}),t.jsx(f,{tidligereUtenlandsopphold:g,saveOnNext:T,saveOnPrevious:m,onStepChange:e.goToNextStep,cancelApplication:i,onContinueLater:e.fortsettSøknadSenere,goToPreviousStep:e.goToPreviousDefaultStep,stepConfig:d})]})},j=p;p.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdSteg"};export{j as T};
