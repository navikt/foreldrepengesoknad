import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import"./index-DSgjoNiG.js";import{C as c}from"./ByttBrowserModal-DEgb4uNm.js";import"./Tidsperioden-Cw9xAJ1Y.js";import{S as f}from"./TidligereUtenlandsoppholdPanel-DzId9_d5.js";import{u,r as x}from"./useFpNavigator-CTPflEni.js";import{u as N,C as p,a as v}from"./FpDataContext-DMa8S1I2.js";import{H as U}from"./Label-C_UMiHsP.js";import{M as C}from"./message-CjkJih2D.js";const r=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:d,avbrytSøknad:l})=>{const i=u(a),t=x(a,d),n=N(p.UTENLANDSOPPHOLD_SENERE),m=v(p.UTENLANDSOPPHOLD_SENERE),S=n&&n.senereOpphold.length>0?{utenlandsoppholdNeste12Mnd:n.senereOpphold.map(e=>({fom:e.tidsperiode.fom,tom:e.tidsperiode.tom,landkode:e.land}))}:void 0,g=e=>(m({senereOpphold:e.utenlandsoppholdNeste12Mnd.map(s=>({land:s.landkode,tidsperiode:{fom:s.fom,tom:s.tom}}))}),t.goToNextDefaultStep()),h=()=>{};return o.jsxs(c,{children:[o.jsx(U,{size:"large",children:o.jsx(C,{id:"søknad.pageheading"})}),o.jsx(f,{senereUtenlandsopphold:S,saveOnNext:g,saveOnPrevious:h,cancelApplication:l,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,stepConfig:i})]})},H=r;r.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdSteg"};export{H as S};
