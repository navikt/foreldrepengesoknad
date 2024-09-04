import{u as j,j as e,V as E,a as I,N as L,B as h,O as C,M as c,f as u,A as B,Q as G,R as V,K as H,T as K,c as w}from"./ByttBrowserModal-B0_Lz7to.js";import{h as J,j as P,k as $,i as l,T as z,l as q,o as Q,D as M,b as A,c as W,e as D,R as X,a as x,p as S,n as T,u as Y,F as Z,E as ee,S as ae}from"./minMax-DvJ4k8UE.js";import"./index-CTjT7uj6.js";import"./FrilansPanel-ClnpQ31W.js";import{f as te,e as re}from"./EgenNæring-BaE2fK_g.js";import{u as b,C as g,b as U,a as v}from"./routes-E6r3g9EM.js";import{u as ie,a as se,g as ne,s as de}from"./useSvpNavigator-DoJmEIyW.js";import{g as oe}from"./validationUtils-DUD17xhv.js";import{S as le}from"./Plus-CtC8jYXd.js";const _={fom:"",tom:"",pågående:void 0,arbeidsgiverNavn:"",land:""},N=()=>{const o=H("arbeidIUtlandet"),a=j(),r=J(),{fields:s,append:m,remove:n}=P({name:"arbeidIUtlandet",control:r.control}),d=r.watch("arbeidIUtlandet"),f=a.formatMessage({id:"arbeidIUtlandet.navn"});return e.jsxs(e.Fragment,{children:[s.map((p,t)=>e.jsxs(E,{gap:"10",children:[e.jsxs(I,{justify:"space-between",children:[e.jsx($,{name:`arbeidIUtlandet.${t}.land`,style:{width:"var(--app-text-input-width)"},label:a.formatMessage({id:"arbeidIUtlandet.land"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetLand.påkrevd"}))],children:L().map(i=>e.jsx("option",{value:i[0],children:i[1]},i[0]))}),t!==0&&e.jsx(h,{className:o.element("delete"),icon:e.jsx(C,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>n(t),children:e.jsx(c,{id:"perioder.varierende.slett"})})]}),e.jsx(z,{name:`arbeidIUtlandet.${t}.arbeidsgiverNavn`,style:{width:"var(--app-text-input-width)"},label:f,validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.påkrevd"})),q(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.forLang"}),100),Q(i=>a.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:f,ugyldigeTegn:i}))],maxLength:100}),e.jsx(M,{name:`arbeidIUtlandet.${t}.fom`,label:a.formatMessage({id:"arbeidIUtlandet.fom"}),validate:[l(a.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),A(a.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),W(a.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),i=>d[t].tom?D(a.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),d[t].tom)(i):null],maxDate:u().toDate(),minDate:B}),e.jsxs(X,{name:`arbeidIUtlandet.${t}.pågående`,label:e.jsx(c,{id:"ArbeidsforholdOppsummering.næring.pågående"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetPågående.påkrevd"}))],children:[e.jsx(x,{value:!0,children:"Ja"}),e.jsx(x,{value:!1,children:"Nei"})]}),d[t].pågående===!1&&e.jsx(M,{name:`arbeidIUtlandet.${t}.tom`,label:a.formatMessage({id:"arbeidIUtlandet.tom"}),description:a.formatMessage({id:"ArbeidIUtlandetFieldArray.arbeid.tom.description"}),validate:[l(a.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),A(a.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),D(a.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),u().add(9,"month")),S(a.formatMessage({id:"valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden"}),G()),S(a.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),d[t].fom)],maxDate:u().add(9,"month").toDate(),minDate:oe(d[t].fom,K)}),t<s.length-1&&e.jsx(V,{})]},p.id)),e.jsx(I,{children:e.jsx(h,{icon:e.jsx(le,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>m(_),children:e.jsx(c,{id:"arbeidIUtlandet.tittel.ny"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetFieldArray"};const ge=(o,a,r)=>{const s=ne(a,o);if(de(o,s,r.harJobbetSomFrilans,r.harJobbetSomSelvstendigNæringsdrivende))if(s.length===0){const n=r.harJobbetSomFrilans?te:re;return{nextRoute:v.SKJEMA,nextTilretteleggingId:n}}else return{nextRoute:v.SKJEMA,nextTilretteleggingId:s[0].arbeidsgiverId};return{nextRoute:v.VELG_ARBEID}},me=({mellomlagreSøknadOgNaviger:o,avbrytSøknad:a,arbeidsforhold:r})=>{const s=j(),m=ie(r),n=se(o,r),d=b(g.ARBEID_I_UTLANDET),f=T(b(g.OM_BARNET)),p=T(b(g.ARBEIDSFORHOLD_OG_INNTEKT)),t=U(g.ARBEID_I_UTLANDET),i=U(g.VALGT_TILRETTELEGGING_ID),k=O=>{t(O);const{nextRoute:R,nextTilretteleggingId:F}=ge(f.termindato,r,p);return i(F),n.goToNextStep(R)},y=Y({shouldUnregister:!0,defaultValues:d||{arbeidIUtlandet:[_]}});return e.jsx(w,{bannerTitle:s.formatMessage({id:"søknad.pageheading"}),onCancel:a,steps:m,onContinueLater:n.fortsettSøknadSenere,onStepChange:n.goToNextStep,children:e.jsx(Z,{formMethods:y,onSubmit:k,children:e.jsxs(E,{gap:"10",children:[e.jsx(ee,{}),e.jsx(N,{}),e.jsx(ae,{goToPreviousStep:n.goToPreviousDefaultStep})]})})})};me.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetStep"};export{me as A};
