import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as P,C as R,a as H}from"./FpDataContext-BUlrLNeW.js";import{N as Q,s as X,b as Y,c as Z,d as $,g as ee,h as L,i as A,u as re,a as ne}from"./useFpNavigator-BE5a89kk.js";import{h as z,b as x,a as ae,j as T,c as N,d as se,u as te,R as le,E as oe,S as ie}from"./ErrorSummaryHookForm-y6FfKDxp.js";import{u as U,M as f,a as de,B as fe}from"./Label-CEor7wE8.js";import{g as ce,v as me,l as ge,m as ue}from"./barnUtils-CtkONWTb.js";import{c as u,R as m,r as O,A as B,d as pe,u as he,P as Fe,n as D,Q as V,b as ve}from"./Uttaksplan-O1uyt7Yu.js";import{r as b}from"./index-CTjT7uj6.js";import{d as xe,c as je,b as Oe}from"./UttaksdagenString-Cr2wfXF3.js";import{R as ke}from"./RegistrertePersonalia-BHhCDgUP.js";import"./index-vZN_Bsf0.js";import{V as y}from"./VStack-BNla2fw4.js";/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function C(){return C=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},C.apply(this,arguments)}function Se(r,t){if(r==null)return{};var n={},a=Object.keys(r),l,s;for(s=0;s<a.length;s++)l=a[s],!(t.indexOf(l)>=0)&&(n[l]=r[l]);return n}function Re(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function be(r,t){return r.button===0&&(!t||t==="_self")&&!Re(r)}const Me=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],Ie="6";try{window.__reactRouterVersion=Ie}catch{}const Ee=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Pe=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ae=b.forwardRef(function(t,n){let{onClick:a,relative:l,reloadDocument:s,replace:c,state:g,target:i,to:o,preventScrollReset:d,unstable_viewTransition:v}=t,p=Se(t,Me),{basename:M}=b.useContext(Q),j,k=!1;if(typeof o=="string"&&Pe.test(o)&&(j=o,Ee))try{let F=new URL(window.location.href),S=o.startsWith("//")?new URL(F.protocol+o):new URL(o),_=X(S.pathname,M);S.origin===F.origin&&_!=null?o=_+S.search+S.hash:k=!0}catch{}let h=Y(o,{relative:l}),I=Ne(o,{replace:c,state:g,target:i,preventScrollReset:d,relative:l,unstable_viewTransition:v});function E(F){a&&a(F),F.defaultPrevented||I(F)}return b.createElement("a",C({},p,{href:j||h,onClick:k||s?a:E,ref:n,target:i}))});var K;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(K||(K={}));var J;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(J||(J={}));function Ne(r,t){let{target:n,replace:a,state:l,preventScrollReset:s,relative:c,unstable_viewTransition:g}=t===void 0?{}:t,i=Z(),o=$(),d=ee(r,{relative:c});return b.useCallback(v=>{if(be(v,n)){v.preventDefault();let p=a!==void 0?a:L(o)===L(d);i(r,{replace:p,state:l,preventScrollReset:s,relative:c,unstable_viewTransition:g})}},[o,i,d,a,l,n,r,s,c,g])}const we=/[\u034f\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]/g,w=r=>r.replace(we," "),ye=r=>!r.kanIkkeOppgis,G=({rolle:r,barn:t})=>{const n=U(),a=ce(t),s=z().watch();if(!ye(s))throw Error("Annen forelder skal alltid være oppgitt her");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(x,{name:"erAleneOmOmsorg",label:n.formatMessage({id:"annenForelder.aleneOmOmsorg"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.harAleneOmsorgPåkrevd"}))],children:[e.jsx(m,{value:!1,children:e.jsx(f,{id:"annenForelder.aleneOmOmsorg.ja"})}),e.jsx(m,{value:!0,children:e.jsx(f,{id:"annenForelder.aleneOmOmsorg.nei"})})]}),e.jsx(O,{header:n.formatMessage({id:"annenForelder.aleneOmOmsorg.apneLabel"}),children:e.jsxs(y,{gap:"4",children:[e.jsx(de,{children:e.jsx(f,{id:"annenForelder.aleneOmOmsorg.del1"})}),e.jsx(fe,{children:e.jsx(f,{id:"annenForelder.aleneOmOmsorg.del2"})})]})})]}),!A(r)&&s.erAleneOmOmsorg===!0&&e.jsx(B,{variant:"info",children:e.jsx(f,{id:"annenForelder.veileder.aleneOmsorg.forBarnet"})}),s.erAleneOmOmsorg===!0&&A(r)&&e.jsx(ae,{name:"datoForAleneomsorg",label:n.formatMessage({id:"annenForelder.datoForAleneomsorg"}),minDate:xe(a).toDate(),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi"})),pe(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat"})),he(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato"},{dato:a}),a)]}),s.erAleneOmOmsorg!==!0&&e.jsxs("div",{children:[e.jsxs(x,{name:"harRettPåForeldrepengerINorge",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd"}))],children:[e.jsx(m,{value:!0,children:"Ja"}),e.jsx(m,{value:!1,children:"Nei"})]}),e.jsxs(O,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"}),children:[e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"}),e.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[e.jsx("li",{children:e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),e.jsx("li",{children:e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),e.jsx("li",{children:e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),s.erAleneOmOmsorg===!1&&s.harRettPåForeldrepengerINorge===!1&&e.jsxs("div",{children:[e.jsxs(x,{name:"harOppholdtSegIEØS",label:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.harOppholdtSegIEØS"}))],children:[e.jsx(m,{value:!0,children:"Ja"}),e.jsx(m,{value:!1,children:"Nei"})]}),e.jsx(O,{header:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"}),children:e.jsx(f,{id:"annenForelder.harOppholdtSegIEØS.veileder"})})]}),s.erAleneOmOmsorg===!1&&s.harOppholdtSegIEØS===!0&&e.jsxs("div",{children:[e.jsxs(x,{name:"harRettPåForeldrepengerIEØS",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.harRettPåForeldrepengerIEØS"}))],children:[e.jsx(m,{value:!0,children:"Ja"}),e.jsx(m,{value:!1,children:"Nei"})]}),e.jsx(O,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"}),children:e.jsxs(y,{gap:"4",children:[e.jsx("div",{children:e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"})}),e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"}),e.jsx(Ae,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:e.jsx(f,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link"})})]})})]}),s.erAleneOmOmsorg!==!0&&s.harRettPåForeldrepengerINorge!==!1&&e.jsxs(e.Fragment,{children:[e.jsxs(x,{name:"erInformertOmSøknaden",label:n.formatMessage({id:"annenForelder.spørsmål.erAnnenForelderInformert"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.informertAnnenForelderPåkrevd"})),c=>c===!1?n.formatMessage({id:"annenForelder.erAnnenForelderInformert.veileder"}):null],children:[e.jsx(m,{value:!0,children:"Ja"}),e.jsx(m,{value:!1,children:"Nei"})]}),s.erInformertOmSøknaden===!1&&e.jsx(B,{variant:"warning",children:e.jsx(f,{id:"annenForelder.erAnnenForelderInformert.veileder"})})]}),s.erAleneOmOmsorg===!1&&s.harRettPåForeldrepengerINorge===!1&&(s.harOppholdtSegIEØS===!1||s.harRettPåForeldrepengerIEØS===!1)&&A(r)&&e.jsxs("div",{children:[e.jsxs(x,{name:"erMorUfør",label:n.formatMessage({id:"annenForelder.erMorUfør"}),validate:[u(n.formatMessage({id:"valideringsfeil.annenForelder.erMorUfør"}))],children:[e.jsx(m,{value:!0,children:"Ja"}),e.jsx(m,{value:!1,children:"Nei"})]}),e.jsx(O,{header:n.formatMessage({id:"annenForelder.erMorUfør.veileder.apneLabel"}),children:e.jsx(f,{id:"annenForelder.erMorUfør.veileder"})})]})]})};G.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderOppgittPanel"};const W=(r,t)=>n=>ge(n,t,r),Ce=(r,t)=>t?!1:r!=="medmor",q=({søkersFødselsnummer:r,rolle:t,barn:n})=>{const a=U(),l=Oe("width"),s=z(),c=s.watch("fornavn"),g=s.watch("utenlandskFnr"),i=s.watch("kanIkkeOppgis");return e.jsxs(e.Fragment,{children:[Ce(t,Fe(n))&&e.jsx(T,{name:"kanIkkeOppgis",label:a.formatMessage({id:"annenForelder.spørsmål.kanOppgis"})}),!i&&e.jsxs(e.Fragment,{children:[e.jsx(N,{name:"fornavn",label:e.jsx(f,{id:"annenForelder.spørsmål.fornavn"}),validate:[u(a.formatMessage({id:"valideringsfeil.annenForelder.fornavnPåkrevd"})),W(a,"annenForelder.spørsmål.fornavn")],className:l.block}),e.jsx(N,{name:"etternavn",label:e.jsx(f,{id:"annenForelder.spørsmål.etternavn"}),validate:[u(a.formatMessage({id:"valideringsfeil.annenForelder.etternavnPåkrevd"})),W(a,"annenForelder.spørsmål.etternavn")],className:l.block})]}),!i&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx(N,{name:"fnr",label:a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:c}),validate:[u(a.formatMessage({id:"valideringsfeil.annenForelder.fnrPåkrevd"})),me(a,r,a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:c}),g)],className:l.block}),e.jsx(T,{name:"utenlandskFnr",label:a.formatMessage({id:"annenForelder.spørsmål.utenlandskFnr"})})]}),g&&e.jsx(se,{name:"bostedsland",label:a.formatMessage({id:"annenForelder.bostedsland"}),validate:[u(a.formatMessage({id:"valideringsfeil.annenForelder.bostedslandPåkrevd"}))],children:je().map(o=>e.jsx("option",{value:o[0],children:o[1]},o[0]))})]})]})};q.__docgenInfo={description:"",methods:[],displayName:"OppgiPersonalia"};const Ue=(r,t)=>{const n=ue(r,t.barn),a=n===void 0||n.length===0?void 0:n.find(l=>l.annenForelder!==void 0);return a!==void 0?a.annenForelder:void 0},_e=({søkerInfo:r,mellomlagreSøknadOgNaviger:t,avbrytSøknad:n})=>{const a=U(),l=re(r.arbeidsforhold),s=ne(r.arbeidsforhold,t),{rolle:c}=D(P(R.SØKERSITUASJON)),g=D(P(R.OM_BARNET)),i=P(R.ANNEN_FORELDER),o=H(R.ANNEN_FORELDER),d=Ue(g,r.søker),v=i!==void 0&&V(i)&&i.fnr!==(d==null?void 0:d.fnr),p=d===void 0||v,M=h=>{if(h.kanIkkeOppgis===!0)o({kanIkkeOppgis:!0});else{const I=!p&&d?d.fornavn:h.fornavn,E=!p&&d?d.etternavn:h.etternavn,F=!p&&d?d.fnr:h.fnr;o({...h,kanIkkeOppgis:!1,fornavn:w(I),etternavn:w(E),fnr:w(F.trim()),harRettPåForeldrepengerIEØS:h.harOppholdtSegIEØS?h.harRettPåForeldrepengerIEØS:!1})}return s.goToNextDefaultStep()},j=te({shouldUnregister:!0,defaultValues:i&&V(i)&&i.fornavn===a.formatMessage({id:"annen.forelder"})?{...i,fornavn:""}:i}),k=j.watch("kanIkkeOppgis");return e.jsx(ve,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:n,onContinueLater:s.fortsettSøknadSenere,steps:l,children:e.jsx(le,{formMethods:j,onSubmit:M,children:e.jsxs(y,{gap:"10",children:[e.jsx(oe,{}),p&&e.jsx(q,{rolle:c,barn:g,søkersFødselsnummer:r.søker.fnr}),!p&&e.jsx(ke,{person:d,fødselsnummerForVisning:d.fnr,visEtternavn:!0}),k!==!0&&e.jsx(G,{rolle:c,barn:g,annenForelder:i,søker:r.søker}),e.jsx(ie,{goToPreviousStep:s.goToPreviousDefaultStep})]})})})};_e.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderSteg"};export{_e as A};
