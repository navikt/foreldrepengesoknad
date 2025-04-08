import{j as e}from"./index-DDg3ir62.js";import{u,C as l,b as E}from"./routes-BC9Z9msW.js";import{u as F,a as R,b as B}from"./useSvpNavigator-BNobPqC_.js";import{d as C,e as L,f as w,g as P,c as b,a as q,b as c,u as H,R as V,E as G,S as $}from"./ErrorSummaryHookForm-H4IemgyJ.js";import{u as U,V as T,a as I,z as J,B as h,F as z,M as p,d as v,g as K,J as W,K as X,N as Y,b as Q}from"./VeiviserPage-74pVRLx9.js";import{A as j}from"./ArbeidIUtlandet-BK3pFOD4.js";import"./index-CR__hKHy.js";import{i as n,h as Z,f as ee,a as y,b as ae,d as M,g as D,n as A}from"./minMax-pIwWJaFp.js";import{g as te}from"./validationUtils-DjJJu90z.js";import{S as re}from"./Plus-Cs-Ta86a.js";const S={type:j.JOBB_I_UTLANDET,fom:"",tom:"",pågående:void 0,arbeidsgiverNavn:"",land:""},k=()=>{const a=U(),d=C(),{fields:s,append:m,remove:g}=L({name:"arbeidIUtlandet",control:d.control}),r=d.watch("arbeidIUtlandet"),o=a.formatMessage({id:"arbeidIUtlandet.navn"});return e.jsxs(e.Fragment,{children:[s.map((f,t)=>e.jsxs(T,{gap:"10",children:[e.jsxs(I,{justify:"space-between",children:[e.jsx(w,{name:`arbeidIUtlandet.${t}.land`,style:{width:"var(--app-text-input-width)"},label:a.formatMessage({id:"arbeidIUtlandet.land"}),validate:[n(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetLand.påkrevd"}))],children:J().map(i=>e.jsx("option",{value:i[0],children:i[1]},i[0]))}),t!==0&&e.jsx(h,{icon:e.jsx(z,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>g(t),children:e.jsx(p,{id:"perioder.varierende.slett"})})]}),e.jsx(P,{name:`arbeidIUtlandet.${t}.arbeidsgiverNavn`,style:{width:"var(--app-text-input-width)"},label:o,validate:[n(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.påkrevd"})),Z(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetNavn.forLang"}),100),ee(i=>a.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:o,ugyldigeTegn:i}))]}),e.jsx(b,{name:`arbeidIUtlandet.${t}.fom`,label:a.formatMessage({id:"arbeidIUtlandet.fom"}),validate:[n(a.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),y(a.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),ae(a.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),i=>r[t].tom?M(a.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),r[t].tom)(i):null],maxDate:v().toDate(),minDate:K}),e.jsxs(q,{name:`arbeidIUtlandet.${t}.pågående`,label:e.jsx(p,{id:"ArbeidIUtlandetFieldArray.næring.pågående"}),validate:[n(a.formatMessage({id:"valideringsfeil.arbeidIUtlandetPågående.påkrevd"}))],children:[e.jsx(c,{value:!0,children:"Ja"}),e.jsx(c,{value:!1,children:"Nei"})]}),r[t].pågående===!1&&e.jsx(b,{name:`arbeidIUtlandet.${t}.tom`,label:a.formatMessage({id:"arbeidIUtlandet.tom"}),description:a.formatMessage({id:"ArbeidIUtlandetFieldArray.arbeid.tom.description"}),validate:[n(a.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),y(a.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),M(a.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),v().add(9,"month")),D(a.formatMessage({id:"valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden"}),W()),D(a.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),r[t].fom)],maxDate:v().add(9,"month").toDate(),minDate:te(r[t].fom,Y)}),t<s.length-1&&e.jsx(X,{})]},f.id)),e.jsx(I,{children:e.jsx(h,{icon:e.jsx(re,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>m(S),children:e.jsx(p,{id:"arbeidIUtlandet.tittel.ny"})})})]})};k.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetFieldArray"};const ie=({mellomlagreSøknadOgNaviger:a,avbrytSøknad:d,arbeidsforhold:s})=>{const m=U(),g=F(s),r=R(a,s),o=u(l.ARBEID_I_UTLANDET),f=A(u(l.OM_BARNET)),t=A(u(l.ARBEIDSFORHOLD_OG_INNTEKT)),i=E(l.ARBEID_I_UTLANDET),x=N=>(i({arbeidIUtlandet:N.arbeidIUtlandet.map(O=>({...O,type:j.JOBB_I_UTLANDET}))}),r.goToStep(B(f.termindato,s,t))),_=H({shouldUnregister:!0,defaultValues:o||{arbeidIUtlandet:[S]}});return e.jsx(Q,{bannerTitle:m.formatMessage({id:"søknad.pageheading"}),onCancel:d,steps:g,onContinueLater:r.fortsettSøknadSenere,onStepChange:r.goToStep,children:e.jsx(V,{formMethods:_,onSubmit:x,children:e.jsxs(T,{gap:"10",children:[e.jsx(G,{}),e.jsx(k,{}),e.jsx($,{goToPreviousStep:r.goToPreviousDefaultStep})]})})})};ie.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{ie as A};
