import{j as e}from"./tslib.es6-C_-gbNBy.js";import{b as k,V as y,h as I,d as i,n as p,e as g,c as O,f as C}from"./CalendarLabel-BOjWYyGG.js";import{u as R,F as w,E as _,R as E,a as c,D as b,S as A}from"./ErrorSummaryHookForm-DYQj2NvG.js";import{u as N,a as o,B as x}from"./Modal-jpjfRTmg.js";import"./index-CTjT7uj6.js";import{i as f,a as v,b as V,c as L,d as H,e as M}from"./dateFormValidation-ChXBOKMN.js";import{u as G,C as h,b as P}from"./routes-BKH065He.js";import{u as q,a as z}from"./useSvpNavigator-CcE3CUWV.js";import{R as D}from"./ReadMore-DQFjhoyC.js";const U=(r,t)=>r&&t&&C(t)?g(t):g(new Date),Y=(r,t)=>s=>t&&!i(s).subtract(6,"months").isSameOrBefore(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.6mndEtterFødsel"}):t&&!i(s).add(1,"months").isSameOrAfter(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.1mndFørFødsel"}):null,$=({mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,arbeidsforhold:s})=>{const a=N(),j=q(s),n=z(r,s),S=G(h.OM_BARNET),F=P(h.OM_BARNET),T=l=>(F(l),n.goToNextDefaultStep()),d=R({shouldUnregister:!0,defaultValues:S}),u=d.watch("erBarnetFødt"),m=d.watch("fødselsdato"),B=U(u,m);return e.jsx(k,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:t,steps:j,onContinueLater:n.fortsettSøknadSenere,onStepChange:n.goToNextStep,children:e.jsx(w,{formMethods:d,onSubmit:T,children:e.jsxs(y,{gap:"10",children:[e.jsx(_,{}),e.jsxs("div",{children:[e.jsxs(E,{name:"erBarnetFødt",label:a.formatMessage({id:"barnet.erBarnetFødt"}),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.erBarnetFødt.påkrevd"}))],children:[e.jsx(c,{value:!0,children:e.jsx(o,{id:"ja"})}),e.jsx(c,{value:!1,children:e.jsx(o,{id:"nei"})})]}),e.jsx(D,{header:a.formatMessage({id:"barnet.erBarnetFødt.merInfo.tittel"}),children:e.jsx(x,{children:e.jsx(o,{id:"barnet.erBarnetFødt.merInfo.tekst"})})})]}),u&&e.jsx(b,{name:"fødselsdato",label:a.formatMessage({id:"barnet.fødselsdato"}),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.duMåOppgi"})),v(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat"})),V(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.måVæreIdagEllerTidligere"})),L(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}))],minDate:I(new Date),maxDate:i().toDate()}),e.jsxs("div",{children:[e.jsx(b,{name:"termindato",label:a.formatMessage({id:"barnet.termindato"}),minDate:B,maxDate:p(new Date),validate:[f(a.formatMessage({id:"valideringsfeil.barnet.termindato.duMåOppgi"})),v(a.formatMessage({id:"valideringsfeil.barnet.termindato.ugyldigDatoFormat"})),H(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtFremITid"}),p(new Date)),l=>m?null:M(a.formatMessage({id:"valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato"}),g(new Date))(l),M(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}),O(new Date)),Y(a,m)]}),e.jsx(D,{header:a.formatMessage({id:"barnet.termindato.merInfo.tittel"}),children:e.jsx(x,{children:e.jsx(o,{id:"barnet.termindato.merInfo.tekst"})})})]}),e.jsx(A,{goToPreviousStep:n.goToPreviousDefaultStep})]})})})};$.__docgenInfo={description:"",methods:[],displayName:"Barnet"};export{$ as B};
