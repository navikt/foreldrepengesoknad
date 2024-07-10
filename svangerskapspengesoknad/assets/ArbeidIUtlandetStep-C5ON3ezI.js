import{u as U,j as e,a as I,M as c}from"./Button-soTDyIY1.js";import{b as L,c as C,d as B,T as G,D as M,R as V,a as h,u as H,F as J,E as w,S as K}from"./ErrorSummaryHookForm-CHjhE1jK.js";import"./index-DVXBtNgz.js";import{H as P,S as $}from"./infobox.module-Bt5kitQe.js";import{V as E,H as x,m as z,d as v,c as q,o as W,p as X,j as Y}from"./Uttaksdagen-MXyk7K8C.js";import{u as Q,a as Z,n as A,g as ee,s as ae}from"./useSvpNavigator-BRSdqGNy.js";import{i as l,h as te,f as re,a as D,b as ie,d as S,g as T}from"./dateFormValidation-M02f2_cF.js";import{u as b,C as g,b as j,a as u}from"./routes-CUdVdM1i.js";import{e as se}from"./EgenNæring-DdBVG6ty.js";import{f as ne}from"./Frilans-B_RcwIAw.js";import{g as de}from"./validationUtils-BfXVjJzn.js";import{S as oe}from"./Modal-BwWgbn-o.js";import{S as le}from"./Plus-DDRVuCsZ.js";const N={fom:"",tom:"",pågående:void 0,arbeidsgiverNavn:"",land:""},_=()=>{const d=Y("arbeidIUtlandet"),a=U(),r=L(),{fields:i,append:m,remove:s}=C({name:"arbeidIUtlandet",control:r.control}),o=r.watch("arbeidIUtlandet"),f=a.formatMessage({id:"arbeidIUtlandet.navn"});return e.jsxs(e.Fragment,{children:[i.map((p,t)=>e.jsxs(E,{gap:"10",children:[e.jsxs(x,{justify:"space-between",children:[e.jsx(B,{name:`arbeidIUtlandet.${t}.land`,style:{width:"var(--app-text-input-width)"},label:a.formatMessage({id:"arbeidIUtlandet.land"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetLand.påkrevd"}))],children:z().map(n=>e.jsx("option",{value:n[0],children:n[1]},n[0]))}),t!==0&&e.jsx(I,{className:d.element("delete"),icon:e.jsx(oe,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>s(t),children:e.jsx(c,{id:"perioder.varierende.slett"})})]}),e.jsx(G,{name:`arbeidIUtlandet.${t}.arbeidsgiverNavn`,style:{width:"var(--app-text-input-width)"},label:f,validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.påkrevd"})),te(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.forLang"}),100),re(n=>a.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:f,ugyldigeTegn:n}))],maxLength:100}),e.jsx(M,{name:`arbeidIUtlandet.${t}.fom`,label:a.formatMessage({id:"arbeidIUtlandet.fom"}),validate:[l(a.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),D(a.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),ie(a.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),S(a.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),o[t].tom)],maxDate:v().toDate(),minDate:q}),e.jsxs(V,{name:`arbeidIUtlandet.${t}.pågående`,label:e.jsx(c,{id:"egenNæring.næring.pågående"}),validate:[l(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetPågående.påkrevd"}))],children:[e.jsx(h,{value:!0,children:"Ja"}),e.jsx(h,{value:!1,children:"Nei"})]}),o[t].pågående===!1&&e.jsx(M,{name:`arbeidIUtlandet.${t}.tom`,label:a.formatMessage({id:"arbeidIUtlandet.tom"}),description:a.formatMessage({id:"egenNæring.arbeid.tom.description"}),validate:[l(a.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),D(a.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),S(a.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),v().add(9,"month")),T(a.formatMessage({id:"valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden"}),W()),T(a.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),o[t].fom)],maxDate:v().add(9,"month").toDate(),minDate:de(o[t].fom,X)}),t<i.length-1&&e.jsx(P,{})]},p.id)),e.jsx(x,{children:e.jsx(I,{icon:e.jsx(le,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>m(N),children:e.jsx(c,{id:"arbeidIUtlandet.tittel.ny"})})})]})};_.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetFieldArray"};const ge=(d,a,r)=>{const i=ee(a,d);if(ae(d,i,r.harJobbetSomFrilans,r.harJobbetSomSelvstendigNæringsdrivende))if(i.length===0){const s=r.harJobbetSomFrilans?ne:se;return{nextRoute:u.SKJEMA,nextTilretteleggingId:s}}else return{nextRoute:u.SKJEMA,nextTilretteleggingId:i[0].arbeidsgiverId};return{nextRoute:u.VELG_ARBEID}},me=({mellomlagreSøknadOgNaviger:d,avbrytSøknad:a,arbeidsforhold:r})=>{const i=U(),m=Q(r),s=Z(d,r),o=b(g.ARBEID_I_UTLANDET),f=A(b(g.OM_BARNET)),p=A(b(g.INNTEKTSINFORMASJON)),t=j(g.ARBEID_I_UTLANDET),n=j(g.VALGT_TILRETTELEGGING_ID),k=R=>{t(R);const{nextRoute:F,nextTilretteleggingId:O}=ge(f.termindato,r,p);return n(O),s.goToNextStep(F)},y=H({shouldUnregister:!0,defaultValues:o||{arbeidIUtlandet:[N]}});return e.jsx($,{bannerTitle:i.formatMessage({id:"søknad.pageheading"}),onCancel:a,steps:m,onContinueLater:s.fortsettSøknadSenere,children:e.jsx(J,{formMethods:y,onSubmit:k,children:e.jsxs(E,{gap:"10",children:[e.jsx(w,{}),e.jsx(_,{}),e.jsx(K,{goToPreviousStep:s.goToPreviousDefaultStep})]})})})};me.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetStep"};export{me as A};
