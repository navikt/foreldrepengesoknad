import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{u as f,C as n,b as a,a as r}from"./routes-B1fb87EI.js";import{u,a as D}from"./useSvpNavigator-yfJ1o2OX.js";import{C as m,H as T,M as O}from"./VeiviserPage-DPeYfbGG.js";import{U as h}from"./TidligereUtenlandsoppholdPanel-BplsCZbQ.js";const x=e=>e.harBoddUtenforNorgeSiste12Mnd?r.HAR_BODD_I_UTLANDET:e.skalBoUtenforNorgeNeste12Mnd?r.SKAL_BO_I_UTLANDET:r.INNTEKTSINFORMASJON,E=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:d,arbeidsforhold:p})=>{const i=u(p),s=D(e,p),N=f(n.UTENLANDSOPPHOLD),S=a(n.UTENLANDSOPPHOLD),g=a(n.UTENLANDSOPPHOLD_TIDLIGERE),l=a(n.UTENLANDSOPPHOLD_SENERE),U=o=>(S(o),o.harBoddUtenforNorgeSiste12Mnd||g(void 0),o.skalBoUtenforNorgeNeste12Mnd||l(void 0),s.goToNextStep(x(o))),c=()=>{};return t.jsxs(m,{children:[t.jsx(T,{size:"large",children:t.jsx(O,{id:"søknad.pageheading"})}),t.jsx(h,{utenlandsopphold:N,saveOnNext:U,saveOnPrevious:c,cancelApplication:d,onContinueLater:s.fortsettSøknadSenere,goToPreviousStep:s.goToPreviousDefaultStep,stepConfig:i,stønadstype:"Svangerskapspenger"})]})};E.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdSteg"};export{E as U};
