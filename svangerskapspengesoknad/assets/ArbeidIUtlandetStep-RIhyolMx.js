import{j as e}from"./tslib.es6-C_-gbNBy.js";import{g as L,h as C,j as B,i as l,T as G,k as V,l as J,D as I,b as h,c as K,e as M,R as w,a as A,o as x,n as D,u as H,F as P,E as $,S as z}from"./dateFormValidation-Q3zZfDbt.js";import{u as j,V as E,a as S,K as q,B as T,N as Q,M as c,f as b,z as W,O as X,Q as Y,J as Z,R as ee,c as ae}from"./ByttBrowserModal-Dv8pZ_Qo.js";import"./index-CTjT7uj6.js";import"./FrilansPanel-BkdlDz2E.js";import{f as te,e as re}from"./EgenNæring-BaE2fK_g.js";import{u as v,C as g,b as U,a as u}from"./routes-BKH065He.js";import{u as ie,a as se,g as ne,s as de}from"./useSvpNavigator-DQRDlbgC.js";import{g as oe}from"./validationUtils-DpXFegfk.js";import{S as le}from"./Plus-ClKC7kKp.js";const N={fom:"",tom:"",pågående:void 0,arbeidsgiverNavn:"",land:""},k=()=>{const d=Z("arbeidIUtlandet"),a=j(),r=L(),{fields:i,append:m,remove:s}=C({name:"arbeidIUtlandet",control:r.control}),o=r.watch("arbeidIUtlandet"),f=a.formatMessage({id:"arbeidIUtlandet.navn"});return e.jsxs(e.Fragment,{children:[i.map((p,t)=>e.jsxs(E,{gap:"10",children:[e.jsxs(S,{justify:"space-between",children:[e.jsx(B,{name:`arbeidIUtlandet.${t}.land`,style:{width:"var(--app-text-input-width)"},label:a.formatMessage({id:"arbeidIUtlandet.land"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetLand.påkrevd"}))],children:q().map(n=>e.jsx("option",{value:n[0],children:n[1]},n[0]))}),t!==0&&e.jsx(T,{className:d.element("delete"),icon:e.jsx(Q,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>s(t),children:e.jsx(c,{id:"perioder.varierende.slett"})})]}),e.jsx(G,{name:`arbeidIUtlandet.${t}.arbeidsgiverNavn`,style:{width:"var(--app-text-input-width)"},label:f,validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.påkrevd"})),V(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.forLang"}),100),J(n=>a.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:f,ugyldigeTegn:n}))],maxLength:100}),e.jsx(I,{name:`arbeidIUtlandet.${t}.fom`,label:a.formatMessage({id:"arbeidIUtlandet.fom"}),validate:[l(a.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),h(a.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),K(a.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),M(a.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),o[t].tom)],maxDate:b().toDate(),minDate:W}),e.jsxs(w,{name:`arbeidIUtlandet.${t}.pågående`,label:e.jsx(c,{id:"ArbeidsforholdOppsummering.næring.pågående"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetPågående.påkrevd"}))],children:[e.jsx(A,{value:!0,children:"Ja"}),e.jsx(A,{value:!1,children:"Nei"})]}),o[t].pågående===!1&&e.jsx(I,{name:`arbeidIUtlandet.${t}.tom`,label:a.formatMessage({id:"arbeidIUtlandet.tom"}),description:a.formatMessage({id:"ArbeidIUtlandetFieldArray.arbeid.tom.description"}),validate:[l(a.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),h(a.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),M(a.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),b().add(9,"month")),x(a.formatMessage({id:"valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden"}),X()),x(a.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),o[t].fom)],maxDate:b().add(9,"month").toDate(),minDate:oe(o[t].fom,ee)}),t<i.length-1&&e.jsx(Y,{})]},p.id)),e.jsx(S,{children:e.jsx(T,{icon:e.jsx(le,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>m(N),children:e.jsx(c,{id:"arbeidIUtlandet.tittel.ny"})})})]})};k.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetFieldArray"};const ge=(d,a,r)=>{const i=ne(a,d);if(de(d,i,r.harJobbetSomFrilans,r.harJobbetSomSelvstendigNæringsdrivende))if(i.length===0){const s=r.harJobbetSomFrilans?te:re;return{nextRoute:u.SKJEMA,nextTilretteleggingId:s}}else return{nextRoute:u.SKJEMA,nextTilretteleggingId:i[0].arbeidsgiverId};return{nextRoute:u.VELG_ARBEID}},me=({mellomlagreSøknadOgNaviger:d,avbrytSøknad:a,arbeidsforhold:r})=>{const i=j(),m=ie(r),s=se(d,r),o=v(g.ARBEID_I_UTLANDET),f=D(v(g.OM_BARNET)),p=D(v(g.INNTEKTSINFORMASJON)),t=U(g.ARBEID_I_UTLANDET),n=U(g.VALGT_TILRETTELEGGING_ID),_=O=>{t(O);const{nextRoute:R,nextTilretteleggingId:F}=ge(f.termindato,r,p);return n(F),s.goToNextStep(R)},y=H({shouldUnregister:!0,defaultValues:o||{arbeidIUtlandet:[N]}});return e.jsx(ae,{bannerTitle:i.formatMessage({id:"søknad.pageheading"}),onCancel:a,steps:m,onContinueLater:s.fortsettSøknadSenere,onStepChange:s.goToNextStep,children:e.jsx(P,{formMethods:y,onSubmit:_,children:e.jsxs(E,{gap:"10",children:[e.jsx($,{}),e.jsx(k,{}),e.jsx(z,{goToPreviousStep:s.goToPreviousDefaultStep})]})})})};me.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetStep"};export{me as A};
