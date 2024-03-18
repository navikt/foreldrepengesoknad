import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{a as _,R as h,D as V,b as M,T as u,S as y,u as H,F as $,E as q,c as W}from"./ErrorSummaryHookForm-DaBY2tD2.js";import{u as N,R as p,d as X,X as Y,A as Z,j as z,S as Q}from"./Tidsperioden-C8HcA-rk.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{h as ee,i as f,V as j,J as E,Z as re,_ as ne,K as A,$ as ae,Y as se,n as b,a0 as O}from"./dateFormValidation-A9ng-RC0.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{u as oe,a as te}from"./useFpNavigator-CnrN-bhH.js";import{u as R,C as k,a as le}from"./FpDataContext-CjNulmBK.js";import{e as de,i as ie}from"./barnUtils-DSjWg_x2.js";import{R as me}from"./RegistrertePersonalia-BT_B-j_x.js";import{L as ge}from"./index-BvmZMrUr.js";import{l as pe}from"./links-dJHPeQm3.js";import{F as t}from"./message-BTv7u0RP.js";import{V as S,A as I}from"./Step-DMjU3ety.js";import{a as fe,B as Fe}from"./Link-BqZ6CohM.js";import{v as ce}from"./validationUtil-KbyHXhDX.js";var L=(r=>(r.UOPPGITT="UOPPGITT",r.UGIFT="UGIFT",r.GIFT="GIFT",r.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",r.SKILT="SKILT",r.SEPARERT="SEPARERT",r.REGISTRERT_PARTNER="REGISTRERT_PARTNER",r.SEPARERT_PARTNER="SEPARERT_PARTNER",r.SKILT_PARTNER="SKILT_PARTNER",r.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",r))(L||{});const he=r=>!r.kanIkkeOppgis,ve=(r,o,l,s,n)=>{const m=l.harRettPåForeldrepengerINorge===!0,g=(s&&A(s)?s.fnr:void 0)||l.fnr,d=g!==void 0&&ae(g)==="M"||l.utenlandskFnr,a=l.harRettPåForeldrepengerINorge!==void 0,i=r.sivilstand===void 0||r.sivilstand.type!==L.GIFT;return(o==="far"&&a||o==="mor"&&d&&m)&&n&&i},xe=(r,o)=>r==="far"&&o?"annenForelder.tekstOmFarskapsportal.far.del1":r==="mor"&&o?"annenForelder.tekstOmFarskapsportal.mor.del1":"",D=({søker:r,rolle:o,barn:l,annenForelder:s})=>{const n=N(),m=de(l),F=_(),g=ee(l),d=xe(o,g),a=F.watch();if(!he(a))throw Error("Annen forelder skal alltid være oppgitt her");const i=ve(r,o,a,s,g);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(h,{name:"erAleneOmOmsorg",label:n.formatMessage({id:"annenForelder.aleneOmOmsorg"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harAleneOmsorgPåkrevd"}))],children:[e.jsx(p,{value:!1,children:e.jsx(t,{id:"annenForelder.aleneOmOmsorg.ja"})}),e.jsx(p,{value:!0,children:e.jsx(t,{id:"annenForelder.aleneOmOmsorg.nei"})})]}),e.jsx(j,{header:n.formatMessage({id:"annenForelder.aleneOmOmsorg.apneLabel"}),children:e.jsxs(S,{gap:"4",children:[e.jsx(fe,{children:e.jsx(t,{id:"annenForelder.aleneOmOmsorg.del1"})}),e.jsx(Fe,{children:e.jsx(t,{id:"annenForelder.aleneOmOmsorg.del2"})})]})})]}),!E(o)&&a.erAleneOmOmsorg===!0&&e.jsx(I,{variant:"info",children:e.jsx(t,{id:"annenForelder.veileder.aleneOmsorg.forBarnet"})}),a.erAleneOmOmsorg===!0&&E(o)&&e.jsx(V,{name:"datoForAleneomsorg",label:n.formatMessage({id:"annenForelder.datoForAleneomsorg"}),minDate:X(m).toDate(),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi"})),re(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat"})),ne(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato"},{dato:m}),m)]}),a.erAleneOmOmsorg!==!0&&e.jsxs("div",{children:[e.jsxs(h,{name:"harRettPåForeldrepengerINorge",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsxs(j,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"}),children:[e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"}),e.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[e.jsx("li",{children:e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),e.jsx("li",{children:e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),e.jsx("li",{children:e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),a.erAleneOmOmsorg===!1&&i&&e.jsxs(I,{variant:"info",children:[e.jsx(t,{id:d,values:{a:v=>e.jsx("a",{href:pe.farskapsportal,className:"lenke",rel:"noreferrer",target:"_blank",children:v})}}),e.jsx(t,{id:"annenForelder.tekstOmFarskapsportal.mor.far.del2"})]}),a.erAleneOmOmsorg===!1&&a.harRettPåForeldrepengerINorge===!1&&e.jsxs("div",{children:[e.jsxs(h,{name:"harOppholdtSegIEØS",label:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harOppholdtSegIEØS"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsx(j,{header:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"}),children:e.jsx(t,{id:"annenForelder.harOppholdtSegIEØS.veileder"})})]}),a.erAleneOmOmsorg===!1&&a.harOppholdtSegIEØS===!0&&e.jsxs("div",{children:[e.jsxs(h,{name:"harRettPåForeldrepengerIEØS",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harRettPåForeldrepengerIEØS"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsx(j,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"}),children:e.jsxs(S,{gap:"4",children:[e.jsx("div",{children:e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"})}),e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"}),e.jsx(ge,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:e.jsx(t,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link"})})]})})]}),a.erAleneOmOmsorg!==!0&&a.harRettPåForeldrepengerINorge!==!1&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{name:"erInformertOmSøknaden",label:n.formatMessage({id:"annenForelder.spørsmål.erAnnenForelderInformert"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.informertAnnenForelderPåkrevd"})),v=>v===!1?n.formatMessage({id:"annenForelder.erAnnenForelderInformert.veileder"}):null],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),a.erInformertOmSøknaden===!1&&e.jsx(I,{variant:"warning",children:e.jsx(t,{id:"annenForelder.erAnnenForelderInformert.veileder"})})]}),a.erAleneOmOmsorg===!1&&a.harRettPåForeldrepengerINorge===!1&&(a.harOppholdtSegIEØS===!1||a.harRettPåForeldrepengerIEØS===!1)&&E(o)&&e.jsxs("div",{children:[e.jsxs(h,{name:"erMorUfør",label:n.formatMessage({id:"annenForelder.erMorUfør"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.erMorUfør"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsx(j,{header:n.formatMessage({id:"annenForelder.erMorUfør.veileder.apneLabel"}),children:e.jsx(t,{id:"annenForelder.erMorUfør.veileder"})})]})]})};D.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderOppgittPanel"};const T=(r,o)=>l=>Z(l,o,r),je=(r,o)=>o?!1:r!=="medmor",U=({søkersFødselsnummer:r,rolle:o,barn:l})=>{const s=N(),n=z("width"),m=_(),F=m.watch("fornavn"),g=m.watch("utenlandskFnr"),d=m.watch("kanIkkeOppgis");return e.jsxs(e.Fragment,{children:[je(o,se(l))&&e.jsx(M,{name:"kanIkkeOppgis",label:s.formatMessage({id:"annenForelder.spørsmål.kanOppgis"})}),!d&&e.jsxs(e.Fragment,{children:[e.jsx(u,{name:"fornavn",label:e.jsx(t,{id:"annenForelder.spørsmål.fornavn"}),validate:[f(s.formatMessage({id:"valideringsfeil.annenForelder.fornavnPåkrevd"})),T(s,"annenForelder.spørsmål.fornavn")],className:n.block}),e.jsx(u,{name:"etternavn",label:e.jsx(t,{id:"annenForelder.spørsmål.etternavn"}),validate:[f(s.formatMessage({id:"valideringsfeil.annenForelder.etternavnPåkrevd"})),T(s,"annenForelder.spørsmål.etternavn")],className:n.block})]}),!d&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx(u,{name:"fnr",label:s.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:F}),validate:[f(s.formatMessage({id:"valideringsfeil.annenForelder.fnrPåkrevd"})),ce(s,r,s.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:F}),g)],className:n.block}),e.jsx(M,{name:"utenlandskFnr",label:s.formatMessage({id:"annenForelder.spørsmål.utenlandskFnr"})})]}),g&&e.jsx(y,{name:"bostedsland",label:s.formatMessage({id:"annenForelder.bostedsland"}),validate:[f(s.formatMessage({id:"valideringsfeil.annenForelder.bostedslandPåkrevd"}))],children:Y().map(a=>e.jsx("option",{value:a[0],children:a[1]},a[0]))})]})]})};U.__docgenInfo={description:"",methods:[],displayName:"OppgiPersonalia"};const ke=(r,o)=>{const l=ie(r,o.barn),s=l===void 0||l.length===0?void 0:l.find(n=>n.annenForelder!==void 0);return s!==void 0?s.annenForelder:void 0},G=({søkerInfo:r,mellomlagreSøknadOgNaviger:o,avbrytSøknad:l})=>{const s=N(),n=oe(r.arbeidsforhold),m=te(r.arbeidsforhold,o),{rolle:F}=b(R(k.SØKERSITUASJON)),g=b(R(k.OM_BARNET)),d=R(k.ANNEN_FORELDER),a=le(k.ANNEN_FORELDER),i=ke(g,r.søker),v=d!==void 0&&A(d)&&d.fnr!==(i==null?void 0:i.fnr),x=i===void 0||v,C=c=>{if(c.kanIkkeOppgis===!0)a({kanIkkeOppgis:!0});else{const w=!x&&i?i.fornavn:c.fornavn,B=!x&&i?i.etternavn:c.etternavn,J=!x&&i?i.fnr:c.fnr;a({...c,kanIkkeOppgis:!1,fornavn:O(w),etternavn:O(B),fnr:O(J.trim()),harRettPåForeldrepengerIEØS:c.harOppholdtSegIEØS?c.harRettPåForeldrepengerIEØS:!1})}return m.goToNextDefaultStep()},P=H({shouldUnregister:!0,defaultValues:d&&A(d)&&d.fornavn===s.formatMessage({id:"annen.forelder"})?{...d,fornavn:""}:d}),K=P.watch("kanIkkeOppgis");return e.jsx(Q,{bannerTitle:s.formatMessage({id:"søknad.pageheading"}),onCancel:l,onContinueLater:m.fortsettSøknadSenere,steps:n,children:e.jsx($,{formMethods:P,onSubmit:C,children:e.jsxs(S,{gap:"10",children:[e.jsx(q,{}),x&&e.jsx(U,{rolle:F,barn:g,søkersFødselsnummer:r.søker.fnr}),!x&&e.jsx(me,{person:i,fødselsnummerForVisning:i.fnr,visEtternavn:!0}),K!==!0&&e.jsx(D,{rolle:F,barn:g,annenForelder:d,søker:r.søker}),e.jsx(W,{goToPreviousStep:m.goToPreviousDefaultStep})]})})})},Ke=G;G.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderSteg"};export{Ke as A};
