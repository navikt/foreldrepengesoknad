import{j as t}from"./jsx-runtime-CexXSJP5.js";import"./Tidsperioden-CVu3e1Oj.js";import{C as c}from"./ByttBrowserModal-B57CghBC.js";import{U as D}from"./TidligereUtenlandsoppholdPanel-CWXNkFCw.js";import{u as E,r as h,S as d}from"./useFpNavigator-DfueqWWJ.js";import{u,C as n,a}from"./FpDataContext-QYm6HSmG.js";import{H as M}from"./Link-DYtqBS4e.js";import{M as O}from"./message-Dwe4nq4q.js";const P=e=>e.harBoddUtenforNorgeSiste12Mnd?d.TIDLIGERE_UTENLANDSOPPHOLD:e.skalBoUtenforNorgeNeste12Mnd?d.SENERE_UTENLANDSOPPHOLD:d.INNTEKTSINFORMASJON,p=({arbeidsforhold:e,mellomlagreSøknadOgNaviger:i,avbrytSøknad:N})=>{const g=E(e),r=h(e,i),s=u(n.UTENLANDSOPPHOLD),S=a(n.UTENLANDSOPPHOLD),l=a(n.UTENLANDSOPPHOLD_TIDLIGERE),f=a(n.UTENLANDSOPPHOLD_SENERE),U=o=>(S({iNorgeSiste12Mnd:!o.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!o.skalBoUtenforNorgeNeste12Mnd}),o.harBoddUtenforNorgeSiste12Mnd||l(void 0),o.skalBoUtenforNorgeNeste12Mnd||f(void 0),r.goToNextStep(P(o))),m=()=>{};return t.jsxs(c,{children:[t.jsx(M,{size:"large",children:t.jsx(O,{id:"søknad.pageheading"})}),t.jsx(D,{utenlandsopphold:s?{harBoddUtenforNorgeSiste12Mnd:!s.iNorgeSiste12Mnd,skalBoUtenforNorgeNeste12Mnd:!s.iNorgeNeste12Mnd}:void 0,saveOnNext:U,saveOnPrevious:m,cancelApplication:N,onContinueLater:r.fortsettSøknadSenere,goToPreviousStep:r.goToPreviousDefaultStep,stepConfig:g,stønadstype:"Foreldrepenger"})]})},v=p;p.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdSteg"};export{v as U};
