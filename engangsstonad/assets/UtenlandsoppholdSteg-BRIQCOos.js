import{j as o}from"./index-CSZAu0_d.js";import{u as P,a as E,b as c,C as a,c as s,P as r}from"./useEsNavigator-Bm75jzhl.js";import{C as l,H as U,M as D}from"./dateFormValidation-Bytmj32C.js";import{U as O}from"./TidligereUtenlandsoppholdPanel-DWXiYPVw.js";import"./index-CZMpeKRu.js";const h=e=>e!=null&&e.harBoddUtenforNorgeSiste12Mnd?r.TIDLIGERE_UTENLANDSOPPHOLD:e!=null&&e.skalBoUtenforNorgeNeste12Mnd?r.SENERE_UTENLANDSOPPHOLD:r.OPPSUMMERING,L=({mellomlagreOgNaviger:e})=>{const i=P(),t=E(e),p=c(a.UTENLANDSOPPHOLD),d=s(a.UTENLANDSOPPHOLD),g=s(a.UTENLANDSOPPHOLD_TIDLIGERE),N=s(a.UTENLANDSOPPHOLD_SENERE),S=n=>(d(n),n.harBoddUtenforNorgeSiste12Mnd||g(void 0),n.skalBoUtenforNorgeNeste12Mnd||N(void 0),t.goToNextStep(h(n)));return o.jsxs(l,{children:[o.jsx(U,{size:"large",children:o.jsx(D,{id:"Søknad.Pageheading"})}),o.jsx(O,{utenlandsopphold:p,saveOnNext:S,saveOnPrevious:d,cancelApplication:t.avbrytSøknad,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,onStepChange:t.goToNextStep,stepConfig:i,stønadstype:"Engangsstønad"})]})};L.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdSteg",props:{mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{L as U};
