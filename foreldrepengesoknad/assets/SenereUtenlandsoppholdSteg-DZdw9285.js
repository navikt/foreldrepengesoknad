import{j as o}from"./Uttaksdagen-CVi1UdfS.js";import{H as c,M as f}from"./Label-D9yH3wXA.js";import{S as u}from"./TidligereUtenlandsoppholdPanel-CSGuhRpc.js";import{C as x}from"./Uttaksplan-C-q_5N0-.js";import{u as N,C as p,a as v}from"./FpDataContext-Bw3l41n2.js";import{u as U,a as C}from"./useFpNavigator-BE1soRC3.js";const d=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:r,avbrytSøknad:l})=>{const i=U(a),t=C(a,r),n=N(p.UTENLANDSOPPHOLD_SENERE),m=v(p.UTENLANDSOPPHOLD_SENERE),S=n&&n.senereOpphold.length>0?{utenlandsoppholdNeste12Mnd:n.senereOpphold.map(e=>({fom:e.tidsperiode.fom,tom:e.tidsperiode.tom,landkode:e.land}))}:void 0,g=e=>(m({senereOpphold:e.utenlandsoppholdNeste12Mnd.map(s=>({land:s.landkode,tidsperiode:{fom:s.fom,tom:s.tom}}))}),t.goToNextDefaultStep()),h=()=>{};return o.jsxs(x,{children:[o.jsx(c,{size:"large",children:o.jsx(f,{id:"søknad.pageheading"})}),o.jsx(u,{senereUtenlandsopphold:S,saveOnNext:g,saveOnPrevious:h,cancelApplication:l,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,stepConfig:i})]})},L=d;d.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdSteg"};export{L as S};
