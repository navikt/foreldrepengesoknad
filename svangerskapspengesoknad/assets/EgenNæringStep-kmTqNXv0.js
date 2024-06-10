import{u as R,j as n,M as t,B as D}from"./Button-uluYPR4k.js";import{m as se,d as v,A as K,V as ge,c as de,o as oe,b as le,p as me}from"./dateUtils-DBWcpdL8.js";import{T as k,d as fe,R as c,a as g,D as M,e as ve,u as Ne,F as ce,E as ue,S as pe}from"./ErrorSummaryHookForm-wJykuSsY.js";import"./index-DVXBtNgz.js";import{S as Ee,A as Me}from"./infobox.module-D-7l-hcE.js";import{o as he,i as s,p as xe,q as ke,a as h,b as I,g as je,e as b,k as A,h as y,r as Se,n as V,f as Te}from"./dateFormValidation-CpnB1umx.js";import{u as E,C as m,b as T,a as x}from"./routes-DY2bjmhp.js";import{u as De,a as Ie,s as C,g as be}from"./useSvpNavigator-0JW2Goo0.js";import{N as f,e as Ae}from"./EgenNæring-DdBVG6ty.js";import{f as ye}from"./Frilans-B_RcwIAw.js";import{a as G,T as B,g as Re}from"./validationUtils-BIplXdMj.js";import{b as Le}from"./velgArbeidFormUtils-DHETRwly.js";import{R as H}from"./ReadMore-CLVVY0E5.js";const _e=/^[0-9]*$/,Fe=i=>{let a=2,r=0;for(let d=i.length-2;d>=0;--d)r+=parseInt(i.charAt(d),10)*a,++a>7&&(a=2);const e=11-r%11;return e===11?0:e},Oe=i=>_e.test(i)&&i.length===9,Ve=i=>i.charAt(0)==="8"||i.charAt(0)==="9",Ge=i=>!i||Oe(i)===!1||Ve(i)===!1||i==="999999999"?!1:Fe(i)===parseInt(i.charAt(8),10),Be=/^\d+([,.]\d+)?$/,Pe=i=>Be.test(i.toString()),w=i=>a=>he(a)||Pe(a)?null:i,J=(i,a)=>r=>r>=a?null:i,Ke=(i,a)=>r=>{const e=(r||"").trim();if(!a&&!e)return i.formatMessage({id:"valideringsfeil.egenNæringOrgnr.påkrevd"});if(e.length>0&&ke(e))return i.formatMessage({id:"valideringsfeil.egenNæringOrgnr.inneholderMellomrom"});if(e.length>0&&!Ge(e))return i.formatMessage({id:"valideringsfeil.egenNæringOrgnr.ugyldigFormat"})},q=({orgNummerErValgfritt:i,registrertINorge:a})=>{const r=R(),e=r.formatMessage({id:"egenNæring.orgnr"}),d=i?`${e} ${r.formatMessage({id:"valgfritt"})}`:e;return n.jsxs(n.Fragment,{children:[a&&n.jsx(k,{name:"organisasjonsnummer",label:d,validate:[Ke(r,i)]}),a===!1&&n.jsx(fe,{name:"registrertILand",label:r.formatMessage({id:"egenNæring.registrertILand"}),validate:[s(r.formatMessage({id:"valideringsfeil.egenNæringLand.påkrevd"})),xe(r.formatMessage({id:"valideringsfeil.egenNæringLand.ikkeNorge"}),"NO")],children:se().map(o=>n.jsx("option",{value:o[0],children:o[1]},o[0]))})]})};q.__docgenInfo={description:"",methods:[],displayName:"OrgnummerEllerLand",props:{orgNummerErValgfritt:{required:!0,tsType:{name:"boolean"},description:""},registrertINorge:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const $=({egenNæringFom:i,egenNæringTom:a,varigEndring:r})=>{const e=R(),d=e.formatMessage({id:"egenNæring.varigEndringBeskrivelse.label"});return n.jsxs(n.Fragment,{children:[n.jsxs(c,{name:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",label:e.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene"}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd"}))],children:[n.jsx(g,{value:!0,children:n.jsx(t,{id:"ja"})}),n.jsx(g,{value:!1,children:n.jsx(t,{id:"nei"})})]}),n.jsx(H,{header:e.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}),children:n.jsx(D,{children:n.jsx(t,{id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"})})}),r&&n.jsxs(n.Fragment,{children:[n.jsx(M,{name:"varigEndringDato",label:e.formatMessage({id:"egenNæring.egenNæringVarigEndringDato"}),validate:[s(e.formatMessage({id:"valideringsfeil.varigEndringDato.påkrevd"})),h(e.formatMessage({id:"valideringsfeil.varigEndringDato.gyldigDato"})),I(e.formatMessage({id:"valideringsfeil.varigEndringDato.erIFremtiden"})),je(e.formatMessage({id:"valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden"}),K),b(e.formatMessage({id:"valideringsfeil.varigEndringDato.førFraDato"}),i),A(e.formatMessage({id:"valideringsfeil.varigEndringDato.etterTilDato"}),a)],maxDate:v(),minDate:i}),n.jsx(k,{name:"varigEndringInntektEtterEndring",label:e.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring"}),description:e.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring.description"}),validate:[s(e.formatMessage({id:"valideringsfeil.varigEndringInntekt.påkrevd"})),y(e.formatMessage({id:"valideringsfeil.varigEndringInntekt.forLang"}),9),w(e.formatMessage({id:"valideringsfeil.varigEndringInntekt.ugyldigFormat"})),J(e.formatMessage({id:"valideringsfeil.varigEndringInntekt.mindreEnnNull"}),0)]}),n.jsx(ve,{name:"varigEndringBeskrivelse",label:d,minLength:G,maxLength:B,validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd"})),y(e.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang"}),B),Se(e.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort"}),G)]})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"VarigEndringSpørsmål",props:{egenNæringFom:{required:!0,tsType:{name:"string"},description:""},egenNæringTom:{required:!0,tsType:{name:"string"},description:""},varigEndring:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const Ce=(i,a,r)=>{const e=be(a,i);if(C(i,e,r.harJobbetSomFrilans,r.harJobbetSomSelvstendigNæringsdrivende))if(e.length===0){const o=r.harJobbetSomFrilans?ye:Ae;return{nextRoute:x.SKJEMA,nextTilretteleggingId:o}}else return{nextRoute:x.SKJEMA,nextTilretteleggingId:e[0].arbeidsgiverId};return{nextRoute:x.VELG_ARBEID}},He=(i,a,r)=>{const e=i.harHattArbeidIUtlandet?x.ARBEID_I_UTLANDET:void 0;return e?{nextRoute:e}:Ce(a,r,i)},P=i=>le(i)?!i||v(i).startOf("day").isAfter(K,"day"):!0,we=(i,a)=>r=>!a&&!r?i.formatMessage({id:"valideringsfeil.egenNæringNavn.påkrevd"}):r&&r.length>100?i.formatMessage({id:"valideringsfeil.egenNæringNavn.forLang"}):null,Je=({mellomlagreSøknadOgNaviger:i,avbrytSøknad:a,arbeidsforhold:r})=>{const e=R(),d=De(r),o=Ie(i,r),U=E(m.EGEN_NÆRING),j=V(E(m.INNTEKTSINFORMASJON)),L=V(E(m.OM_BARNET)),Y=E(m.TILRETTELEGGINGER),X=T(m.EGEN_NÆRING),z=T(m.TILRETTELEGGINGER),W=T(m.VALGT_TILRETTELEGGING_ID),Q=p=>{if(X(p),C(L.termindato,r,j.harJobbetSomFrilans,j.harJobbetSomSelvstendigNæringsdrivende)){const te=[Le(Y||[],p)];z(te)}const{nextRoute:re,nextTilretteleggingId:ae}=He(j,L.termindato,r);return W(ae),o.goToNextStep(re)},l=Ne({shouldUnregister:!0,defaultValues:U}),_=e.formatMessage({id:"egenNæring.navnPåNæring"}),S=l.watch("næringstype"),u=l.watch("navnPåNæringen"),N=l.watch("fomDato"),F=l.watch("tomDato"),Z=l.watch("registrertINorge"),ee=l.watch("pågående"),ne=l.watch("hattVarigEndringAvNæringsinntektSiste4Kalenderår"),ie=l.watch("harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"),O=S===f.FISKER?`${_} ${e.formatMessage({id:"valgfritt"})}`:_;return n.jsx(Ee,{bannerTitle:e.formatMessage({id:"søknad.pageheading"}),onCancel:a,steps:d,onContinueLater:o.fortsettSøknadSenere,children:n.jsx(ce,{formMethods:l,onSubmit:Q,children:n.jsxs(ge,{gap:"10",children:[n.jsx(ue,{}),n.jsx(D,{children:n.jsx(t,{id:"harValgfrieFelt"})}),n.jsxs(c,{name:"næringstype",label:e.formatMessage({id:"egenNæring.næringstype"}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringType.påkrevd"}))],children:[n.jsx(g,{value:f.DAGMAMMA,children:n.jsx(t,{id:"egenNæring.næringstype.dagmamma"})}),n.jsx(g,{value:f.FISKER,children:n.jsx(t,{id:"egenNæring.næringstype.fiske"})}),n.jsx(g,{value:f.JORDBRUK,children:n.jsx(t,{id:"egenNæring.næringstype.jordbrukSkogbruk"})}),n.jsx(g,{value:f.ANNET,children:n.jsx(t,{id:"egenNæring.næringstype.annen"})})]}),n.jsx(k,{name:"navnPåNæringen",label:O,maxLength:100,validate:[we(e,S===f.FISKER),Te(p=>e.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:O,ugyldigeTegn:p}))],shouldReplaceInvisibleChars:!0}),n.jsxs(c,{name:"registrertINorge",label:e.formatMessage({id:"egenNæring.erNæringenRegistrertINorge"},{navnPåNæringen:u}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringRegistrertINorge.påkrevd"}))],children:[n.jsx(g,{value:!0,children:n.jsx(t,{id:"ja"})}),n.jsx(g,{value:!1,children:n.jsx(t,{id:"nei"})})]}),n.jsx(q,{orgNummerErValgfritt:S===f.FISKER,registrertINorge:Z}),n.jsx(M,{name:"fomDato",label:e.formatMessage({id:"egenNæring.næring.fom"},{navnPåNæringen:u}),validate:[s(e.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),h(e.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),I(e.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),A(e.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),F)],maxDate:v(),minDate:de}),n.jsxs(c,{name:"pågående",label:e.formatMessage({id:"egenNæring.næring.pågående"},{navnPåNæringen:u}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringPågående.påkrevd"}))],children:[n.jsx(g,{value:!0,children:n.jsx(t,{id:"ja"})}),n.jsx(g,{value:!1,children:n.jsx(t,{id:"nei"})})]}),ee===!1&&n.jsx(M,{name:"tomDato",label:e.formatMessage({id:"egenNæring.næring.tom"},{navnPåNæringen:u}),description:e.formatMessage({id:"egenNæring.næring.tom.description"}),validate:[s(e.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),h(e.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),A(e.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),v().add(9,"month")),b(e.formatMessage({id:"valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden"}),oe()),b(e.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),N)],maxDate:v().add(9,"month"),minDate:Re(N,me)}),!P(N)&&n.jsx($,{varigEndring:ne,egenNæringFom:N,egenNæringTom:F}),n.jsx(k,{name:"næringsinntekt",label:e.formatMessage({id:"egenNæring.næringsinntekt"}),description:e.formatMessage({id:"egenNæring.næringsinntekt.description"}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringInntekt.påkrevd"})),y(e.formatMessage({id:"valideringsfeil.næringsinntekt.forLang"}),9),w(e.formatMessage({id:"valideringsfeil.næringsinntekt.ugyldigFormat"})),J(e.formatMessage({id:"valideringsfeil.næringsinntekt.mindreEnnNull"}),0)]}),n.jsx(H,{header:e.formatMessage({id:"egenNæring.næringsinntekt.info.apneLabel"}),children:n.jsx(D,{children:n.jsx(t,{id:"egenNæring.næringsinntekt.info"})})}),n.jsxs(c,{name:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",label:e.formatMessage({id:"egenNæring.blittYrkesaktivSiste3År"}),validate:[s(e.formatMessage({id:"valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd"}))],children:[n.jsx(g,{value:!0,children:n.jsx(t,{id:"ja"})}),n.jsx(g,{value:!1,children:n.jsx(t,{id:"nei"})})]}),P(N)&&ie===!0&&n.jsx(M,{name:"oppstartsdato",label:e.formatMessage({id:"egenNæring.yrkesaktivDato"}),validate:[s(e.formatMessage({id:"valideringsfeil.yrkesaktiv.påkrevd"})),h(e.formatMessage({id:"valideringsfeil.yrkesaktiv.gyldigDato"})),I(e.formatMessage({id:"valideringsfeil.yrkesaktiv.erIFremtiden"}))],maxDate:v()}),n.jsx(Me,{variant:"info",children:e.formatMessage({id:"egenNæring.veileder"})}),n.jsx(pe,{goToPreviousStep:o.goToPreviousDefaultStep})]})})})};Je.__docgenInfo={description:"",methods:[],displayName:"EgenNæringStep"};export{Je as E};
