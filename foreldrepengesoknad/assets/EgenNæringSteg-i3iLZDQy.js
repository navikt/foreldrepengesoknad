import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{u as a,C as n,a as E}from"./FpDataContext-DbGuQRR8.js";import{u as c,a as S,S as f}from"./useFpNavigator-CVbVA1IY.js";import{H as x,M as l}from"./Label-DlDsESPM.js";import{E as C}from"./EgenNæringPanel-Dp4YwUxk.js";import{n as T,C as _}from"./Uttaksplan-Bv_Qa67z.js";import"./Uttaksdagen-Uuolrvsk.js";const v=({mellomlagreSøknadOgNaviger:s,avbrytSøknad:r,arbeidsforhold:o})=>{const i=c(o),e=S(o,s),p=a(n.EGEN_NÆRING),g=T(a(n.ARBEIDSFORHOLD_OG_INNTEKT)),N=E(n.EGEN_NÆRING),m=u=>(N(u),g.harHattAndreInntektskilder?e.goToNextStep(f.ANDRE_INNTEKTER):e.goToNextDefaultStep()),d=()=>{};return t.jsxs(_,{children:[t.jsx(x,{size:"large",children:t.jsx(l,{id:"søknad.pageheading"})}),t.jsx(C,{egenNæring:p,saveOnNext:m,saveOnPrevious:d,cancelApplication:r,onContinueLater:e.fortsettSøknadSenere,goToPreviousStep:e.goToPreviousDefaultStep,stepConfig:i,stønadstype:"Foreldrepenger"})]})};v.__docgenInfo={description:"",methods:[],displayName:"EgenNæringSteg"};export{v as E};
