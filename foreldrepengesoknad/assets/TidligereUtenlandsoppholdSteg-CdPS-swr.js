import{j as o}from"./jsx-runtime-CexXSJP5.js";import"./Tidsperioden-aPvVQaRz.js";import{C as u}from"./CalendarLabel-Cwj7ViES.js";import{T as O}from"./TidligereUtenlandsoppholdPanel-7Uvp4DWV.js";import{n as D}from"./index-BiY12grZ.js";import"./dateFormValidation-C6MyJzWm.js";import{u as E,r as x,S as i}from"./useFpNavigator-eSxQ499P.js";import{u as p,C as s,a as P}from"./FpDataContext-QYm6HSmG.js";import{H as U}from"./Link-DYtqBS4e.js";import{M as L}from"./message-BuQN_KsK.js";const r=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:l,avbrytSøknad:m})=>{const g=E(a),t=x(a,l),S=D(p(s.UTENLANDSOPPHOLD)),n=p(s.UTENLANDSOPPHOLD_TIDLIGERE),T=P(s.UTENLANDSOPPHOLD_TIDLIGERE),N=n&&n.tidligereOpphold.length>0?{utenlandsoppholdSiste12Mnd:n.tidligereOpphold.map(e=>({fom:e.tidsperiode.fom,tom:e.tidsperiode.tom,landkode:e.land}))}:void 0,c=e=>{T({tidligereOpphold:e.utenlandsoppholdSiste12Mnd.map(d=>({land:d.landkode,tidsperiode:{fom:d.fom,tom:d.tom}}))});const f=S.iNorgeNeste12Mnd?i.INNTEKTSINFORMASJON:i.SENERE_UTENLANDSOPPHOLD;return t.goToNextStep(f)},h=()=>{};return o.jsxs(u,{children:[o.jsx(U,{size:"large",children:o.jsx(L,{id:"søknad.pageheading"})}),o.jsx(O,{tidligereUtenlandsopphold:N,saveOnNext:c,saveOnPrevious:h,cancelApplication:m,onContinueLater:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,stepConfig:g})]})},y=r;r.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdSteg"};export{y as T};
