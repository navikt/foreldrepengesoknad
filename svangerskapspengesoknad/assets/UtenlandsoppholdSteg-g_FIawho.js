import{j as t,H as f,M as m}from"./Button-uluYPR4k.js";import{b as u}from"./infobox.module-DXupakH_.js";import"./Uttaksdagen-BhZsPxay.js";import{U as D}from"./TidligereUtenlandsoppholdPanel-Ct83jYEW.js";import{u as T,C as n,b as a,a as r}from"./routes-DY2bjmhp.js";import{u as O,a as h}from"./useSvpNavigator-Bww-HRoF.js";const x=e=>e.harBoddUtenforNorgeSiste12Mnd?r.HAR_BODD_I_UTLANDET:e.skalBoUtenforNorgeNeste12Mnd?r.SKAL_BO_I_UTLANDET:r.INNTEKTSINFORMASJON,E=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:d,arbeidsforhold:p})=>{const i=O(p),s=h(e,p),N=T(n.UTENLANDSOPPHOLD),S=a(n.UTENLANDSOPPHOLD),g=a(n.UTENLANDSOPPHOLD_TIDLIGERE),l=a(n.UTENLANDSOPPHOLD_SENERE),U=o=>(S(o),o.harBoddUtenforNorgeSiste12Mnd||g(void 0),o.skalBoUtenforNorgeNeste12Mnd||l(void 0),s.goToNextStep(x(o))),c=()=>{};return t.jsxs(u,{children:[t.jsx(f,{size:"large",children:t.jsx(m,{id:"søknad.pageheading"})}),t.jsx(D,{utenlandsopphold:N,saveOnNext:U,saveOnPrevious:c,cancelApplication:d,onContinueLater:s.fortsettSøknadSenere,goToPreviousStep:s.goToPreviousDefaultStep,stepConfig:i,stønadstype:"Svangerskapspenger"})]})};E.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdSteg"};export{E as U};
