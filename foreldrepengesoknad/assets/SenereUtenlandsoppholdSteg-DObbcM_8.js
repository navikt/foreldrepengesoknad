import{j as o}from"./jsx-runtime-_e34SzbC.js";import"./Tidsperioden-C-i4iOOf.js";import{C as c}from"./infobox.module-B8LgfpMa.js";import{S as f}from"./TidligereUtenlandsoppholdPanel-XZxI6Ewi.js";import{u,a as x}from"./useFpNavigator-B2r1moHz.js";import{u as N,C as p,a as v}from"./FpDataContext-BcznBdmF.js";import{H as U}from"./Link-SOWRV7cb.js";import{M as C}from"./message-2fcxXlkE.js";const d=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:r,avbrytSøknad:l})=>{const i=u(a),t=x(a,r),n=N(p.UTENLANDSOPPHOLD_SENERE),m=v(p.UTENLANDSOPPHOLD_SENERE),S=n&&n.senereOpphold.length>0?{utenlandsoppholdNeste12Mnd:n.senereOpphold.map(e=>({fom:e.tidsperiode.fom,tom:e.tidsperiode.tom,landkode:e.land}))}:void 0,g=e=>(m({senereOpphold:e.utenlandsoppholdNeste12Mnd.map(s=>({land:s.landkode,tidsperiode:{fom:s.fom,tom:s.tom}}))}),t.goToNextDefaultStep()),h=()=>{};return o.jsxs(c,{children:[o.jsx(U,{size:"large",children:o.jsx(C,{id:"søknad.pageheading"})}),o.jsx(f,{senereUtenlandsopphold:S,saveOnNext:g,saveOnPrevious:h,cancelApplication:l,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,stepConfig:i})]})},k=d;d.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdSteg"};export{k as S};
