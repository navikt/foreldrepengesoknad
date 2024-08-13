import{j as e}from"./jsx-runtime-CexXSJP5.js";import{a as D,R as c,D as J,b as R,T as u,c as G,u as H,F as K,E as q,S as z}from"./ErrorSummaryHookForm-BF84C_U2.js";import{u as I,R as d,d as W,y as $,w as Q,h as X}from"./Tidsperioden-3yUk3KJR.js";import"./index-CSpfAsmC.js";import{R as x,v as O,u as Y,r as Z,w as b,x as k}from"./useFpNavigator-CdWkr2RF.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-W-93wHM-.js";import{A as P,S as ee}from"./ByttBrowserModal-DayHb9LT.js";import{l as re,n as E,u as S,C as j,a as ne}from"./FpDataContext-BTc1vbhf.js";import{i as m,a as ae,b as se}from"./dateFormValidation-CLVJHkB9.js";import{c as oe,h as le}from"./barnUtils-DaStBxFh.js";import{R as te}from"./RegistrertePersonalia-Dyn-PP6a.js";import{L as de}from"./index-Dt9hiTZW.js";import{M as o}from"./message-Qnk54Yzy.js";import{V as M}from"./VStack-CEp4cwmC.js";import{a as ie,B as me}from"./Link-DYtqBS4e.js";import{v as ge}from"./validationUtil-Di9tcODF.js";const pe=s=>!s.kanIkkeOppgis,w=({rolle:s,barn:i})=>{const r=I(),a=oe(i),n=D().watch();if(!pe(n))throw Error("Annen forelder skal alltid være oppgitt her");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(c,{name:"erAleneOmOmsorg",label:r.formatMessage({id:"annenForelder.aleneOmOmsorg"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.harAleneOmsorgPåkrevd"}))],children:[e.jsx(d,{value:!1,children:e.jsx(o,{id:"annenForelder.aleneOmOmsorg.ja"})}),e.jsx(d,{value:!0,children:e.jsx(o,{id:"annenForelder.aleneOmOmsorg.nei"})})]}),e.jsx(x,{header:r.formatMessage({id:"annenForelder.aleneOmOmsorg.apneLabel"}),children:e.jsxs(M,{gap:"4",children:[e.jsx(ie,{children:e.jsx(o,{id:"annenForelder.aleneOmOmsorg.del1"})}),e.jsx(me,{children:e.jsx(o,{id:"annenForelder.aleneOmOmsorg.del2"})})]})})]}),!O(s)&&n.erAleneOmOmsorg===!0&&e.jsx(P,{variant:"info",children:e.jsx(o,{id:"annenForelder.veileder.aleneOmsorg.forBarnet"})}),n.erAleneOmOmsorg===!0&&O(s)&&e.jsx(J,{name:"datoForAleneomsorg",label:r.formatMessage({id:"annenForelder.datoForAleneomsorg"}),minDate:W(a).toDate(),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi"})),ae(r.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat"})),se(r.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato"},{dato:a}),a)]}),n.erAleneOmOmsorg!==!0&&e.jsxs("div",{children:[e.jsxs(c,{name:"harRettPåForeldrepengerINorge",label:r.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd"}))],children:[e.jsx(d,{value:!0,children:"Ja"}),e.jsx(d,{value:!1,children:"Nei"})]}),e.jsxs(x,{header:r.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"}),children:[e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"}),e.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[e.jsx("li",{children:e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),e.jsx("li",{children:e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),e.jsx("li",{children:e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),n.erAleneOmOmsorg===!1&&n.harRettPåForeldrepengerINorge===!1&&e.jsxs("div",{children:[e.jsxs(c,{name:"harOppholdtSegIEØS",label:r.formatMessage({id:"annenForelder.harOppholdtSegIEØS"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.harOppholdtSegIEØS"}))],children:[e.jsx(d,{value:!0,children:"Ja"}),e.jsx(d,{value:!1,children:"Nei"})]}),e.jsx(x,{header:r.formatMessage({id:"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"}),children:e.jsx(o,{id:"annenForelder.harOppholdtSegIEØS.veileder"})})]}),n.erAleneOmOmsorg===!1&&n.harOppholdtSegIEØS===!0&&e.jsxs("div",{children:[e.jsxs(c,{name:"harRettPåForeldrepengerIEØS",label:r.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.harRettPåForeldrepengerIEØS"}))],children:[e.jsx(d,{value:!0,children:"Ja"}),e.jsx(d,{value:!1,children:"Nei"})]}),e.jsx(x,{header:r.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"}),children:e.jsxs(M,{gap:"4",children:[e.jsx("div",{children:e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"})}),e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"}),e.jsx(de,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:e.jsx(o,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link"})})]})})]}),n.erAleneOmOmsorg!==!0&&n.harRettPåForeldrepengerINorge!==!1&&e.jsxs(e.Fragment,{children:[e.jsxs(c,{name:"erInformertOmSøknaden",label:r.formatMessage({id:"annenForelder.spørsmål.erAnnenForelderInformert"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.informertAnnenForelderPåkrevd"})),p=>p===!1?r.formatMessage({id:"annenForelder.erAnnenForelderInformert.veileder"}):null],children:[e.jsx(d,{value:!0,children:"Ja"}),e.jsx(d,{value:!1,children:"Nei"})]}),n.erInformertOmSøknaden===!1&&e.jsx(P,{variant:"warning",children:e.jsx(o,{id:"annenForelder.erAnnenForelderInformert.veileder"})})]}),n.erAleneOmOmsorg===!1&&n.harRettPåForeldrepengerINorge===!1&&(n.harOppholdtSegIEØS===!1||n.harRettPåForeldrepengerIEØS===!1)&&O(s)&&e.jsxs("div",{children:[e.jsxs(c,{name:"erMorUfør",label:r.formatMessage({id:"annenForelder.erMorUfør"}),validate:[m(r.formatMessage({id:"valideringsfeil.annenForelder.erMorUfør"}))],children:[e.jsx(d,{value:!0,children:"Ja"}),e.jsx(d,{value:!1,children:"Nei"})]}),e.jsx(x,{header:r.formatMessage({id:"annenForelder.erMorUfør.veileder.apneLabel"}),children:e.jsx(o,{id:"annenForelder.erMorUfør.veileder"})})]})]})};w.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderOppgittPanel"};const N=(s,i)=>r=>Q(r,i,s),fe=(s,i)=>i?!1:s!=="medmor",y=({søkersFødselsnummer:s,rolle:i,barn:r})=>{const a=I(),g=X("width"),n=D(),p=n.watch("fornavn"),h=n.watch("utenlandskFnr"),l=n.watch("kanIkkeOppgis");return e.jsxs(e.Fragment,{children:[fe(i,re(r))&&e.jsx(R,{name:"kanIkkeOppgis",label:a.formatMessage({id:"annenForelder.spørsmål.kanOppgis"})}),!l&&e.jsxs(e.Fragment,{children:[e.jsx(u,{name:"fornavn",label:e.jsx(o,{id:"annenForelder.spørsmål.fornavn"}),validate:[m(a.formatMessage({id:"valideringsfeil.annenForelder.fornavnPåkrevd"})),N(a,"annenForelder.spørsmål.fornavn")],className:g.block}),e.jsx(u,{name:"etternavn",label:e.jsx(o,{id:"annenForelder.spørsmål.etternavn"}),validate:[m(a.formatMessage({id:"valideringsfeil.annenForelder.etternavnPåkrevd"})),N(a,"annenForelder.spørsmål.etternavn")],className:g.block})]}),!l&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx(u,{name:"fnr",label:a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:p}),validate:[m(a.formatMessage({id:"valideringsfeil.annenForelder.fnrPåkrevd"})),ge(a,s,a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:p}),h)],className:g.block}),e.jsx(R,{name:"utenlandskFnr",label:a.formatMessage({id:"annenForelder.spørsmål.utenlandskFnr"})})]}),h&&e.jsx(G,{name:"bostedsland",label:a.formatMessage({id:"annenForelder.bostedsland"}),validate:[m(a.formatMessage({id:"valideringsfeil.annenForelder.bostedslandPåkrevd"}))],children:$().map(F=>e.jsx("option",{value:F[0],children:F[1]},F[0]))})]})]})};y.__docgenInfo={description:"",methods:[],displayName:"OppgiPersonalia"};const he=(s,i)=>{const r=le(s,i.barn),a=r===void 0||r.length===0?void 0:r.find(g=>g.annenForelder!==void 0);return a!==void 0?a.annenForelder:void 0},C=({søkerInfo:s,mellomlagreSøknadOgNaviger:i,avbrytSøknad:r})=>{const a=I(),g=Y(s.arbeidsforhold),n=Z(s.arbeidsforhold,i),{rolle:p}=E(S(j.SØKERSITUASJON)),h=E(S(j.OM_BARNET)),l=S(j.ANNEN_FORELDER),F=ne(j.ANNEN_FORELDER),t=he(h,s.søker),T=l!==void 0&&b(l)&&l.fnr!==(t==null?void 0:t.fnr),v=t===void 0||T,L=f=>{if(f.kanIkkeOppgis===!0)F({kanIkkeOppgis:!0});else{const B=!v&&t?t.fornavn:f.fornavn,U=!v&&t?t.etternavn:f.etternavn,V=!v&&t?t.fnr:f.fnr;F({...f,kanIkkeOppgis:!1,fornavn:k(B),etternavn:k(U),fnr:k(V.trim()),harRettPåForeldrepengerIEØS:f.harOppholdtSegIEØS?f.harRettPåForeldrepengerIEØS:!1})}return n.goToNextDefaultStep()},A=H({shouldUnregister:!0,defaultValues:l&&b(l)&&l.fornavn===a.formatMessage({id:"annen.forelder"})?{...l,fornavn:""}:l}),_=A.watch("kanIkkeOppgis");return e.jsx(ee,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:r,onContinueLater:n.fortsettSøknadSenere,steps:g,children:e.jsx(K,{formMethods:A,onSubmit:L,children:e.jsxs(M,{gap:"10",children:[e.jsx(q,{}),v&&e.jsx(y,{rolle:p,barn:h,søkersFødselsnummer:s.søker.fnr}),!v&&e.jsx(te,{person:t,fødselsnummerForVisning:t.fnr,visEtternavn:!0}),_!==!0&&e.jsx(w,{rolle:p,barn:h,annenForelder:l,søker:s.søker}),e.jsx(z,{goToPreviousStep:n.goToPreviousDefaultStep})]})})})},we=C;C.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderSteg"};export{we as A};
