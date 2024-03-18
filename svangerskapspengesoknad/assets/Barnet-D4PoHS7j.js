import{u as k,j as e}from"./index-DjQlcsKf.js";import{V as y,h as I,d as i,n as c,e as g,a as O,b as R}from"./VStack-7ThGWPLh.js";import{u as w,F as C,E as _,R as E,a as p,D as b,S as A}from"./ErrorSummaryHookForm-5siRA4qs.js";import"./index-Dl6G-zuu.js";import{u as V,C as v,b as L,c as N}from"./routes-CNaXZGz1.js";import{u as H,a as G,i as f,b as x,c as P,d as q,e as U,f as M}from"./useSvpNavigator-BdOkPM0z.js";import{F as n,B as D}from"./Button-BLGHixGq.js";import{R as h}from"./ReadMore-Bt25DJgX.js";const Y=(r,t)=>r&&t&&R(t)?g(t):g(new Date),$=(r,t)=>s=>t&&!i(s).subtract(6,"months").isSameOrBefore(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.6mndEtterFødsel"}):t&&!i(s).add(1,"months").isSameOrAfter(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.1mndFørFødsel"}):null,z=({mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,arbeidsforhold:s})=>{const a=k(),j=H(s),o=G(r,s),F=V(v.OM_BARNET),S=L(v.OM_BARNET),B=l=>(S(l),o.goToNextDefaultStep()),d=w({shouldUnregister:!0,defaultValues:F}),u=d.watch("erBarnetFødt"),m=d.watch("fødselsdato"),T=Y(u,m);return e.jsx(N,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:t,steps:j,onContinueLater:o.fortsettSøknadSenere,children:e.jsx(C,{formMethods:d,onSubmit:B,children:e.jsxs(y,{gap:"10",children:[e.jsx(_,{}),e.jsxs("div",{children:[e.jsxs(E,{name:"erBarnetFødt",label:a.formatMessage({id:"barnet.erBarnetFødt"}),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.erBarnetFødt.påkrevd"}))],children:[e.jsx(p,{value:!0,children:e.jsx(n,{id:"ja"})}),e.jsx(p,{value:!1,children:e.jsx(n,{id:"nei"})})]}),e.jsx(h,{header:a.formatMessage({id:"barnet.erBarnetFødt.merInfo.tittel"}),children:e.jsx(D,{children:e.jsx(n,{id:"barnet.erBarnetFødt.merInfo.tekst"})})})]}),u&&e.jsx(b,{name:"fødselsdato",label:a.formatMessage({id:"barnet.fødselsdato"}),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.duMåOppgi"})),x(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat"})),P(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.måVæreIdagEllerTidligere"})),q(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}))],minDate:I(new Date),maxDate:i().toDate()}),e.jsxs("div",{children:[e.jsx(b,{name:"termindato",label:a.formatMessage({id:"barnet.termindato"}),minDate:T,maxDate:c(new Date),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.termindato.duMåOppgi"})),x(a.formatMessage({id:"valideringsfeil.barnet.termindato.ugyldigDatoFormat"})),U(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtFremITid"}),c(new Date)),l=>m?null:M(a.formatMessage({id:"valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato"}),g(new Date))(l),M(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}),O(new Date)),$(a,m)]}),e.jsx(h,{header:a.formatMessage({id:"barnet.termindato.merInfo.tittel"}),children:e.jsx(D,{children:e.jsx(n,{id:"barnet.termindato.merInfo.tekst"})})})]}),e.jsx(A,{goToPreviousStep:o.goToPreviousDefaultStep})]})})})};z.__docgenInfo={description:"",methods:[],displayName:"Barnet"};export{z as B};
