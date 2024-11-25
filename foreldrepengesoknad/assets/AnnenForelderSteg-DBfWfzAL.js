import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as R,C as O,a as H}from"./FpDataContext-BUlrLNeW.js";import{N as X,s as Q,b as Y,c as Z,d as $,h as ee,j as U,i as M,u as re,a as ne}from"./useFpNavigator-Djc7pxzc.js";import{h as W,b as j,a as ae,j as C,c as I,d as te,u as se,R as ie,E as le,S as oe}from"./ErrorSummaryHookForm-C0QPhQQH.js";import{u as N,M as d,a as de,B as me}from"./Label-Da2udS5t.js";import{g as ue,v as ge,l as pe,m as fe}from"./barnUtils-CR7G9lch.js";import{c as f,R as g,p as x,A as K,d as ve,s as ce,K as ke,n as L,M as _,b as he,N as P}from"./Uttaksplan-BlsrIWkz.js";import{r as A}from"./index-CTjT7uj6.js";import{d as Fe,c as je,b as ye}from"./UttaksdagenString-BBvBeCjL.js";import{R as be}from"./RegistrertePersonalia-1cR7agsh.js";import"./index-BbmHap-z.js";import{V as B}from"./VStack-DPZ5Pzm1.js";/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function E(){return E=Object.assign?Object.assign.bind():function(r){for(var s=1;s<arguments.length;s++){var n=arguments[s];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},E.apply(this,arguments)}function xe(r,s){if(r==null)return{};var n={},a=Object.keys(r),i,t;for(t=0;t<a.length;t++)i=a[t],!(s.indexOf(i)>=0)&&(n[i]=r[i]);return n}function Se(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function Oe(r,s){return r.button===0&&(!s||s==="_self")&&!Se(r)}const Ae=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],we="6";try{window.__reactRouterVersion=we}catch{}const qe=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Re=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Me=A.forwardRef(function(s,n){let{onClick:a,relative:i,reloadDocument:t,replace:u,state:p,target:o,to:l,preventScrollReset:m,viewTransition:h}=s,k=xe(s,Ae),{basename:w}=A.useContext(X),y,S=!1;if(typeof l=="string"&&Re.test(l)&&(y=l,qe))try{let c=new URL(window.location.href),F=l.startsWith("//")?new URL(c.protocol+l):new URL(l),T=Q(F.pathname,w);F.origin===c.origin&&T!=null?l=T+F.search+F.hash:S=!0}catch{}let v=Y(l,{relative:i}),b=Ie(l,{replace:u,state:p,target:o,preventScrollReset:m,relative:i,viewTransition:h});function q(c){a&&a(c),c.defaultPrevented||b(c)}return A.createElement("a",E({},k,{href:y||v,onClick:S||t?a:q,ref:n,target:o}))});var D;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(D||(D={}));var V;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(V||(V={}));function Ie(r,s){let{target:n,replace:a,state:i,preventScrollReset:t,relative:u,viewTransition:p}=s===void 0?{}:s,o=Z(),l=$(),m=ee(r,{relative:u});return A.useCallback(h=>{if(Oe(h,n)){h.preventDefault();let k=a!==void 0?a:U(l)===U(m);o(r,{replace:k,state:i,preventScrollReset:t,relative:u,viewTransition:p})}},[l,o,m,a,i,n,r,t,u,p])}const Pe=r=>!r.kanIkkeOppgis,z=({rolle:r,barn:s})=>{const n=N(),a=ue(s),t=W().watch();if(!Pe(t))throw Error("Annen forelder skal alltid være oppgitt her");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(j,{name:"erAleneOmOmsorg",label:n.formatMessage({id:"annenForelder.aleneOmOmsorg"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harAleneOmsorgPåkrevd"}))],children:[e.jsx(g,{value:!1,children:e.jsx(d,{id:"annenForelder.aleneOmOmsorg.ja"})}),e.jsx(g,{value:!0,children:e.jsx(d,{id:"annenForelder.aleneOmOmsorg.nei"})})]}),e.jsx(x,{header:n.formatMessage({id:"annenForelder.aleneOmOmsorg.apneLabel"}),children:e.jsxs(B,{gap:"4",children:[e.jsx(de,{children:e.jsx(d,{id:"annenForelder.aleneOmOmsorg.del1"})}),e.jsx(me,{children:e.jsx(d,{id:"annenForelder.aleneOmOmsorg.del2"})})]})})]}),!M(r)&&t.erAleneOmOmsorg===!0&&e.jsx(K,{variant:"info",children:e.jsx(d,{id:"annenForelder.veileder.aleneOmsorg.forBarnet"})}),t.erAleneOmOmsorg===!0&&M(r)&&e.jsx(ae,{name:"datoForAleneomsorg",label:n.formatMessage({id:"annenForelder.datoForAleneomsorg"}),minDate:Fe(a).toDate(),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi"})),ve(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat"})),ce(n.formatMessage({id:"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato"},{dato:a}),a)]}),t.erAleneOmOmsorg!==!0&&e.jsxs("div",{children:[e.jsxs(j,{name:"harRettPåForeldrepengerINorge",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd"}))],children:[e.jsx(g,{value:!0,children:"Ja"}),e.jsx(g,{value:!1,children:"Nei"})]}),e.jsxs(x,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"}),children:[e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"}),e.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[e.jsx("li",{children:e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),e.jsx("li",{children:e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),e.jsx("li",{children:e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),t.erAleneOmOmsorg===!1&&t.harRettPåForeldrepengerINorge===!1&&e.jsxs("div",{children:[e.jsxs(j,{name:"harOppholdtSegIEØS",label:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harOppholdtSegIEØS"}))],children:[e.jsx(g,{value:!0,children:"Ja"}),e.jsx(g,{value:!1,children:"Nei"})]}),e.jsx(x,{header:n.formatMessage({id:"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"}),children:e.jsx(d,{id:"annenForelder.harOppholdtSegIEØS.veileder"})})]}),t.erAleneOmOmsorg===!1&&t.harOppholdtSegIEØS===!0&&e.jsxs("div",{children:[e.jsxs(j,{name:"harRettPåForeldrepengerIEØS",label:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.harRettPåForeldrepengerIEØS"}))],children:[e.jsx(g,{value:!0,children:"Ja"}),e.jsx(g,{value:!1,children:"Nei"})]}),e.jsx(x,{header:n.formatMessage({id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"}),children:e.jsxs(B,{gap:"4",children:[e.jsx("div",{children:e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"})}),e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"}),e.jsx(Me,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:e.jsx(d,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link"})})]})})]}),t.erAleneOmOmsorg!==!0&&t.harRettPåForeldrepengerINorge!==!1&&e.jsxs(e.Fragment,{children:[e.jsxs(j,{name:"erInformertOmSøknaden",label:n.formatMessage({id:"annenForelder.spørsmål.erAnnenForelderInformert"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.informertAnnenForelderPåkrevd"})),u=>u===!1?n.formatMessage({id:"annenForelder.erAnnenForelderInformert.veileder"}):null],children:[e.jsx(g,{value:!0,children:"Ja"}),e.jsx(g,{value:!1,children:"Nei"})]}),t.erInformertOmSøknaden===!1&&e.jsx(K,{variant:"warning",children:e.jsx(d,{id:"annenForelder.erAnnenForelderInformert.veileder"})})]}),t.erAleneOmOmsorg===!1&&t.harRettPåForeldrepengerINorge===!1&&(t.harOppholdtSegIEØS===!1||t.harRettPåForeldrepengerIEØS===!1)&&M(r)&&e.jsxs("div",{children:[e.jsxs(j,{name:"erMorUfør",label:n.formatMessage({id:"annenForelder.erMorUfør"}),validate:[f(n.formatMessage({id:"valideringsfeil.annenForelder.erMorUfør"}))],children:[e.jsx(g,{value:!0,children:"Ja"}),e.jsx(g,{value:!1,children:"Nei"})]}),e.jsx(x,{header:n.formatMessage({id:"annenForelder.erMorUfør.veileder.apneLabel"}),children:e.jsx(d,{id:"annenForelder.erMorUfør.veileder"})})]})]})};z.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderOppgittPanel",props:{søker:{required:!0,tsType:{name:"intersection",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"bankkonto",value:{name:"Bankkonto",required:!1}},{key:"sivilstand",value:{name:"Sivilstand",required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]",required:!0}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]},description:""},rolle:{required:!0,tsType:{name:"union",raw:"'far' | 'medmor' | 'mor'",elements:[{name:"literal",value:"'far'"},{name:"literal",value:"'medmor'"},{name:"literal",value:"'mor'"}]},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""},annenForelder:{required:!1,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"Common"},{name:"AnnenForelderOppgitt"}]},description:""}}};const J=(r,s)=>n=>pe(n,s,r),Be=(r,s)=>s?!1:r!=="medmor",G=({søkersFødselsnummer:r,rolle:s,barn:n})=>{const a=N(),i=ye("width"),t=W(),u=t.watch("fornavn"),p=t.watch("utenlandskFnr"),o=t.watch("kanIkkeOppgis");return e.jsxs(e.Fragment,{children:[Be(s,ke(n))&&e.jsx(C,{name:"kanIkkeOppgis",label:a.formatMessage({id:"annenForelder.spørsmål.kanOppgis"})}),!o&&e.jsxs(e.Fragment,{children:[e.jsx(I,{name:"fornavn",label:e.jsx(d,{id:"annenForelder.spørsmål.fornavn"}),validate:[f(a.formatMessage({id:"valideringsfeil.annenForelder.fornavnPåkrevd"})),J(a,"annenForelder.spørsmål.fornavn")],className:i.block}),e.jsx(I,{name:"etternavn",label:e.jsx(d,{id:"annenForelder.spørsmål.etternavn"}),validate:[f(a.formatMessage({id:"valideringsfeil.annenForelder.etternavnPåkrevd"})),J(a,"annenForelder.spørsmål.etternavn")],className:i.block})]}),!o&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx(I,{name:"fnr",label:a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:u}),validate:[f(a.formatMessage({id:"valideringsfeil.annenForelder.fnrPåkrevd"})),ge(a,r,a.formatMessage({id:"annenForelder.spørsmål.fnr"},{navn:u}),p)],className:i.block}),e.jsx(C,{name:"utenlandskFnr",label:a.formatMessage({id:"annenForelder.spørsmål.utenlandskFnr"})})]}),p&&e.jsx(te,{name:"bostedsland",label:a.formatMessage({id:"annenForelder.bostedsland"}),validate:[f(a.formatMessage({id:"valideringsfeil.annenForelder.bostedslandPåkrevd"}))],children:je().map(l=>e.jsx("option",{value:l[0],children:l[1]},l[0]))})]})]})};G.__docgenInfo={description:"",methods:[],displayName:"OppgiPersonalia",props:{søkersFødselsnummer:{required:!0,tsType:{name:"string"},description:""},rolle:{required:!0,tsType:{name:"union",raw:"'far' | 'medmor' | 'mor'",elements:[{name:"literal",value:"'far'"},{name:"literal",value:"'medmor'"},{name:"literal",value:"'mor'"}]},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""}}};const Ee=(r,s)=>{const n=fe(r,s.barn),a=n===void 0||n.length===0?void 0:n.find(i=>i.annenForelder!==void 0);return a!==void 0?a.annenForelder:void 0},Ne=({søkerInfo:r,mellomlagreSøknadOgNaviger:s,avbrytSøknad:n})=>{const a=N(),i=re(r.arbeidsforhold),t=ne(r.arbeidsforhold,s),{rolle:u}=L(R(O.SØKERSITUASJON)),p=L(R(O.OM_BARNET)),o=R(O.ANNEN_FORELDER),l=H(O.ANNEN_FORELDER),m=Ee(p,r.søker),h=o!==void 0&&_(o)&&o.fnr!==(m==null?void 0:m.fnr),k=m===void 0||h,w=v=>{if(v.kanIkkeOppgis===!0)return l({kanIkkeOppgis:!0}),t.goToNextDefaultStep();const b=!k&&m,q=b?m.fornavn:v.fornavn,c=b?m.etternavn:v.etternavn,F=b?m.fnr:v.fnr;return l({...v,kanIkkeOppgis:!1,fornavn:P(q)??"",etternavn:P(c)??"",fnr:P(F.trim())??"",harRettPåForeldrepengerIEØS:v.harOppholdtSegIEØS?v.harRettPåForeldrepengerIEØS:!1}),t.goToNextDefaultStep()},y=se({shouldUnregister:!0,defaultValues:o&&_(o)&&o.fornavn===a.formatMessage({id:"annen.forelder"})?{...o,fornavn:""}:o}),S=y.watch("kanIkkeOppgis");return e.jsx(he,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:n,onContinueLater:t.fortsettSøknadSenere,steps:i,children:e.jsx(ie,{formMethods:y,onSubmit:w,children:e.jsxs(B,{gap:"10",children:[e.jsx(le,{}),k&&e.jsx(G,{rolle:u,barn:p,søkersFødselsnummer:r.søker.fnr}),!k&&e.jsx(be,{person:m,fødselsnummerForVisning:m.fnr,visEtternavn:!0}),S!==!0&&e.jsx(z,{rolle:u,barn:p,annenForelder:o,søker:r.søker}),e.jsx(oe,{goToPreviousStep:t.goToPreviousDefaultStep})]})})})};Ne.__docgenInfo={description:"",methods:[],displayName:"AnnenForelderSteg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"intersection",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"bankkonto",value:{name:"Bankkonto",required:!1}},{key:"sivilstand",value:{name:"Sivilstand",required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]",required:!0}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{Ne as A};
