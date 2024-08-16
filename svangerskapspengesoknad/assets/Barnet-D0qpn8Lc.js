import{j as e}from"./tslib.es6-C_-gbNBy.js";import{u as O,c as _,V as C,M as d,d as u,e as c,h as y,f as i,n as v,g as f,j as I,k as R}from"./ByttBrowserModal-Dv8pZ_Qo.js";import{u as w,F as E,E as V,R as A,i as g,a as b,D as x,b as M,c as N,d as L,e as P,f as h,S as H}from"./dateFormValidation-Q3zZfDbt.js";import"./index-CTjT7uj6.js";import{u as G,C as S,b as q}from"./routes-BKH065He.js";import{u as z,a as U}from"./useSvpNavigator-DQRDlbgC.js";import{R as D}from"./ReadMore-C3UMtfhP.js";const Y=(r,t)=>r&&t&&R(t)?f(t):f(new Date),$=(r,t)=>s=>t&&!i(s).subtract(6,"months").isSameOrBefore(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.6mndEtterFødsel"}):t&&!i(s).add(1,"months").isSameOrAfter(i(t),"day")?r.formatMessage({id:"valideringsfeil.barnet.termindato.1mndFørFødsel"}):null,J=({mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,arbeidsforhold:s})=>{const a=O(),j=z(s),o=U(r,s),F=G(S.OM_BARNET),T=q(S.OM_BARNET),B=l=>(T(l),o.goToNextDefaultStep()),n=w({shouldUnregister:!0,defaultValues:F}),p=n.watch("erBarnetFødt"),m=n.watch("fødselsdato"),k=Y(p,m);return e.jsx(_,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:t,steps:j,onContinueLater:o.fortsettSøknadSenere,onStepChange:o.goToNextStep,children:e.jsx(E,{formMethods:n,onSubmit:B,children:e.jsxs(C,{gap:"10",children:[e.jsx(V,{}),e.jsxs("div",{children:[e.jsxs(A,{name:"erBarnetFødt",label:a.formatMessage({id:"barnet.erBarnetFødt"}),validate:[g(a.formatMessage({id:"valideringsfeil.barnet.erBarnetFødt.påkrevd"}))],children:[e.jsx(b,{value:!0,children:e.jsx(d,{id:"ja"})}),e.jsx(b,{value:!1,children:e.jsx(d,{id:"nei"})})]}),e.jsx(D,{onOpenChange:u("Svangerskapspenger","SVP_tilbake_i_tid"),header:a.formatMessage({id:"barnet.erBarnetFødt.merInfo.tittel"}),children:e.jsx(c,{children:e.jsx(d,{id:"barnet.erBarnetFødt.merInfo.tekst"})})})]}),p&&e.jsx(x,{name:"fødselsdato",label:a.formatMessage({id:"barnet.fødselsdato"}),validate:[g(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.duMåOppgi"})),M(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat"})),N(a.formatMessage({id:"valideringsfeil.barnet.fødselsdato.måVæreIdagEllerTidligere"})),L(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}))],minDate:y(new Date),maxDate:i().toDate(),onChange:()=>n.formState.isSubmitted&&n.trigger()}),e.jsxs("div",{children:[e.jsx(x,{name:"termindato",label:a.formatMessage({id:"barnet.termindato"}),minDate:k,maxDate:v(new Date),validate:[g(a.formatMessage({id:"valideringsfeil.barnet.termindato.duMåOppgi"})),M(a.formatMessage({id:"valideringsfeil.barnet.termindato.ugyldigDatoFormat"})),P(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtFremITid"}),v(new Date)),l=>m?null:h(a.formatMessage({id:"valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato"}),f(new Date))(l),h(a.formatMessage({id:"valideringsfeil.barnet.termindato.forLangtTilbakeITid"}),I(new Date)),$(a,m)]}),e.jsx(D,{onOpenChange:u("Svangerskapspenger","SVP_tre_uker_før_termin"),header:a.formatMessage({id:"barnet.termindato.merInfo.tittel"}),children:e.jsx(c,{children:e.jsx(d,{id:"barnet.termindato.merInfo.tekst"})})})]}),e.jsx(H,{goToPreviousStep:o.goToPreviousDefaultStep})]})})})};J.__docgenInfo={description:"",methods:[],displayName:"Barnet"};export{J as B};
