import{j as n}from"./tslib.es6-BMc9PpVS.js";import{H as R,M as b}from"./Uttaksdagen-CHlL4_FN.js";import{a as u}from"./Tidsperioden-CRlAJzBJ.js";import"./index-BP8_t0zE.js";import{u as x,a as D,c as F,i as _,S as r}from"./useFpNavigator-CdYY8cCo.js";import{g as j}from"./arbeidsforholdUtils-BB3aPdCV.js";import{A as v}from"./ArbeidsforholdOgInntektPanel-7ITcH9wy.js";import{C}from"./ErrorSummaryHookForm-B_LopTqh.js";import{n as m}from"./dateFormValidation-B567oMpk.js";import{u as d,C as e,a as s}from"./FpDataContext-wT6-gpAc.js";const M=a=>a.harHattAndreInntektskilder!==void 0,G=({mellomlagreSøknadOgNaviger:a,avbrytSøknad:N,arbeidsforhold:i})=>{const p=x(i),o=D(i,a),g=m(d(e.SØKERSITUASJON)),S=m(d(e.OM_BARNET)),f=d(e.ARBEIDSFORHOLD_OG_INNTEKT),l=s(e.ARBEIDSFORHOLD_OG_INNTEKT),A=s(e.FRILANS),I=s(e.EGEN_NÆRING),E=s(e.ANDRE_INNTEKTSKILDER),c=g.situasjon==="adopsjon",k=j(i,c,_(g.rolle),u(F(S))),O=t=>{if(!M(t))throw Error("values er på feil format");if(l(t),t.harHattAndreInntektskilder===!1&&E(void 0),t.harJobbetSomFrilans===!1&&A(void 0),t.harJobbetSomSelvstendigNæringsdrivende===!1&&I(void 0),t.harJobbetSomFrilans)return o.goToNextStep(r.FRILANS);if(t.harJobbetSomSelvstendigNæringsdrivende)return o.goToNextStep(r.EGEN_NÆRING);if(t.harHattAndreInntektskilder)return o.goToNextStep(r.ANDRE_INNTEKTER);const h=p.some(T=>T.id===r.DOKUMENTASJON);return o.goToNextStep(h?r.DOKUMENTASJON:r.OPPSUMMERING)};return n.jsxs(C,{children:[n.jsx(R,{size:"large",children:n.jsx(b,{id:"søknad.pageheading"})}),n.jsx(v,{aktiveArbeidsforhold:k,arbeidsforholdOgInntekt:f,saveOnNext:O,cancelApplication:N,onContinueLater:o.fortsettSøknadSenere,goToPreviousStep:o.goToPreviousDefaultStep,stepConfig:p,stønadstype:"Foreldrepenger"})]})};G.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOgInntektSteg"};export{G as A};
