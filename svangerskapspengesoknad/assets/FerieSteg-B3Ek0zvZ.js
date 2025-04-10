import{j as e}from"./index-DDg3ir62.js";import{u as P,C as p,b as V,c as _,a as T}from"./routes-BC9Z9msW.js";import{e as I,u as w,a as O,f as L,h as G}from"./useSvpNavigator-BGXLT_W_.js";import{u as A,b as $,V as c,M as i,c as C,a as z,B as k,J as U,d as x,N as J}from"./VeiviserPage-CXDregug.js";import{u as K,R as X,E as Q,a as W,b as M,S as Y,d as Z,e as ee,h as re}from"./ErrorSummaryHookForm-B2xaFH72.js";import{g as ae}from"./dateUtils-GFt3q6Ne.js";import"./index-CR__hKHy.js";import{n as F,i as b,a as D,j as S,e as R,k as ie}from"./minMax-B0CngfSv.js";import{R as N}from"./ReadMore-B6jWhBgr.js";import{T as te}from"./Tag-Dznp7XLX.js";import{S as se}from"./Plus-v0WzNjzy.js";const oe="_leggTilFerieperiodeButton_t015w_1",ne={leggTilFerieperiodeButton:oe},E={skalHaFerie:void 0,feriePerioder:[{fom:void 0,tom:void 0}]};function de({mellomlagreSøknadOgNaviger:r,avbrytSøknad:h,arbeidsforhold:d}){const l=A(),g=I(),s=w(d),o=O(r,d),t=F(g.tilretteleggingId),m=P(p.VALGTE_ARBEIDSFORHOLD),v=V(p.FERIE),n=P(p.FERIE),j=n==null?void 0:n[t],f=K({mode:"onSubmit",defaultValues:j||E}),a=u=>{const H=(u.skalHaFerie?u.feriePerioder:[]).map(q=>({...q,arbeidsforhold:{id:t,type:L(t,d)}})),B={...n,[t]:{skalHaFerie:u.skalHaFerie,feriePerioder:H}};v(B);const y=G(t,m);return o.goToStep(y?_(T.SKJEMA,y):T.OPPSUMMERING)};return e.jsx($,{bannerTitle:l.formatMessage({id:"søknad.pageheading"}),onCancel:h,steps:s,onStepChange:o.goToStep,onContinueLater:o.fortsettSøknadSenere,children:e.jsx(X,{formMethods:f,onSubmit:a,children:e.jsxs(c,{gap:"10",children:[e.jsx(Q,{}),e.jsxs(c,{gap:"4",children:[e.jsxs(W,{name:"skalHaFerie",onChange:u=>{u?f.setValue("feriePerioder",E.feriePerioder):f.setValue("feriePerioder",[])},label:l.formatMessage({id:"ferie.harDuPlanlagtFerie.label"}),validate:[b(l.formatMessage({id:"ferie.harDuPlanlagtFerie.validering"}))],children:[e.jsx(M,{value:!0,children:e.jsx(i,{id:"ja"})}),e.jsx(M,{value:!1,children:e.jsx(i,{id:"nei"})})]}),e.jsx(N,{header:l.formatMessage({id:"ferie.readmore.hvordanPlanlegge.header"}),children:e.jsx(C,{children:e.jsx(i,{id:"ferie.readmore.hvordanPlanlegge.body"})})})]}),e.jsx(le,{}),e.jsx(Y,{goToPreviousStep:o.goToPreviousDefaultStep})]})})})}function le(){const r=A(),h=I(),d=F(h.tilretteleggingId),g=F(P(p.TILRETTELEGGINGER))[d].behovForTilretteleggingFom,{watch:s}=Z(),o=s("skalHaFerie"),t=F(P(p.OM_BARNET)),m=ae(t),{fields:v,append:n,remove:j}=ee({name:"feriePerioder"});return o?e.jsxs(c,{gap:"4",children:[e.jsx(c,{gap:"6",children:v.map((f,a)=>e.jsxs(c,{gap:"4",className:"feriePeriode",children:[e.jsxs(z,{justify:"space-between",align:"center",children:[e.jsx(te,{variant:"info-moderate",children:e.jsx(i,{id:"ferie.heading"})}),a>0&&e.jsx(k,{onClick:()=>j(a),size:"small",variant:"tertiary",type:"button","aria-label":`Fjern ${a+1}. periode`,icon:e.jsx(U,{}),children:e.jsx(i,{id:"ferie.periode.slett"})})]}),e.jsx(re,{labelFrom:e.jsx(i,{id:"ferie.periode.førsteDag"}),labelTo:e.jsx(i,{id:"ferie.periode.sisteDag"}),nameFrom:`feriePerioder.${a}.fom`,nameTo:`feriePerioder.${a}.tom`,maxDate:x(m),minDate:x(g),validateFrom:[b(r.formatMessage({id:"ferie.antallPerioder.validering.dato.obligatorisk"})),D(r.formatMessage({id:"ferie.antallPerioder.validering.dato.gyldig"})),S(r.formatMessage({id:"ferie.antallPerioder.validering.dato.førTilDato"}),s(`feriePerioder.${a}.tom`)),S(r.formatMessage({id:"ferie.antallPerioder.validering.dato.førSisteFraværsDag"}),m),R(r.formatMessage({id:"ferie.antallPerioder.validering.dato.etterFørsteFraværsDag"}),g),ie(r.formatMessage({id:"ferie.antallPerioder.validering.dato.overlapp"},{periode:a}),{date:s(`feriePerioder.${a}.tom`),isStartDate:!1},[s("feriePerioder")[a-1]??[]].flat())],validateTo:[b(r.formatMessage({id:"ferie.antallPerioder.validering.dato.obligatorisk"})),D(r.formatMessage({id:"ferie.antallPerioder.validering.dato.gyldig"})),S(r.formatMessage({id:"ferie.antallPerioder.validering.dato.førSisteFraværsDag"}),m),R(r.formatMessage({id:"ferie.antallPerioder.validering.dato.etterFørsteFraværsDag"}),g)]}),a<v.length-1&&e.jsx(J,{})]},f.id))}),e.jsx(k,{onClick:()=>n({fom:void 0,tom:void 0}),size:"small",className:ne.leggTilFerieperiodeButton,type:"button",variant:"secondary",icon:e.jsx(se,{}),children:e.jsx(i,{id:"ferie.periode.leggTil"})}),e.jsx(N,{header:r.formatMessage({id:"ferie.antallPerioder.readmore.label"}),children:e.jsx(C,{children:e.jsx(i,{id:"ferie.antallPerioder.readmore.body"})})})]}):null}de.__docgenInfo={description:"",methods:[],displayName:"FerieSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{de as F};
