import{j as t,H as i,F as g}from"./dates-542ac52b.js";import{a as S,b as c,c as m,C as r,d as u,f as N}from"./useEsNavigator-e9842769.js";import"./index-f1f2c4b1.js";import{S as v}from"./TidligereUtenlandsoppholdPanel-f42b2099.js";const a=({mellomlagreOgNaviger:o})=>{const s=S(),e=c(o),p=m(r.UTENLANDSOPPHOLD_SENERE),n=u(r.UTENLANDSOPPHOLD_SENERE),l=d=>(n(d),e.goToNextDefaultStep());return t.jsxs(N,{children:[t.jsx(i,{size:"large",children:t.jsx(g,{id:"Søknad.Pageheading"})}),t.jsx(v,{senereUtenlandsopphold:p,saveOnNext:l,saveOnPrevious:n,onContinueLater:e.fortsettSøknadSenere,cancelApplication:e.avbrytSøknad,goToPreviousStep:e.goToPreviousDefaultStep,stepConfig:s})]})},P=a;try{a.displayName="SenereUtenlandsoppholdSteg",a.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdSteg",props:{mellomlagreOgNaviger:{defaultValue:null,description:"",name:"mellomlagreOgNaviger",required:!0,type:{name:"() => Promise<void>"}}}}}catch{}export{P as S};
