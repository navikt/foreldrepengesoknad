import{j as o}from"./Uttaksdagen-DrQ0Oxxl.js";import{H as c,M as f}from"./Label-Uwu7Pz6v.js";import{S as u}from"./TidligereUtenlandsoppholdPanel-DKGDLLUe.js";import{C as x}from"./ErrorSummaryHookForm-1nFoirfj.js";import{u as N,C as p,b as v}from"./FpDataContext-BW_0HfWx.js";import{u as U,a as C}from"./useFpNavigator-rsQS18v_.js";const d=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:r,avbrytSøknad:l})=>{const i=U(a),t=C(a,r),n=N(p.UTENLANDSOPPHOLD_SENERE),m=v(p.UTENLANDSOPPHOLD_SENERE),S=n&&n.senereOpphold.length>0?{utenlandsoppholdNeste12Mnd:n.senereOpphold.map(e=>({fom:e.tidsperiode.fom,tom:e.tidsperiode.tom,landkode:e.land}))}:void 0,g=e=>(m({senereOpphold:e.utenlandsoppholdNeste12Mnd.map(s=>({land:s.landkode,tidsperiode:{fom:s.fom,tom:s.tom}}))}),t.goToNextDefaultStep()),h=()=>{};return o.jsxs(x,{children:[o.jsx(c,{size:"large",children:o.jsx(f,{id:"søknad.pageheading"})}),o.jsx(u,{senereUtenlandsopphold:S,saveOnNext:g,saveOnPrevious:h,cancelApplication:l,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,stepConfig:i})]})},L=d;d.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdSteg"};export{L as S};
