import{j as s}from"./jsx-runtime-Cw0GR0a5.js";import{u as O,C as x,b as C,a as q}from"./routes-B9jRY1rx.js";import{T as N,d as T,u as ee,a as te}from"./useSvpNavigator-BT5X0qrb.js";import{r as V,R as B}from"./index-CTjT7uj6.js";import{e as re,f as ie,c as $,a as se,b as z,h as oe,u as ne,R as ae,E as de,S as le}from"./ErrorSummaryHookForm-BCiVvF9_.js";import{e as b,q as me,f as l,k as ge,I as Q,U as j,u as W,V as I,Q as fe,a as U,B as H,N as pe,M as v,d as ce,F as ve,H as X,J as ue,c as Te}from"./VeiviserPage-Bfd_9S15.js";import{g as ye,b as K,a as Se}from"./dateUtils-YYzuOPnu.js";import{n as D,i as G,a as J,l as R,e as he}from"./minMax-DB7FAiJQ.js";import{B as Me}from"./Bedriftsbanner-rWEEopVL.js";import{g as je}from"./tilretteleggingUtils-BEo3Cgx1.js";import{g as y}from"./numberUtils-DCxWcr3S.js";import{h as F,b as L}from"./validationUtils-BWaayDvp.js";import{R as Ee}from"./ReadMore-CyQyhVF9.js";import{S as De}from"./Plus-frUulwkJ.js";var _e=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(r[o[i]]=e[o[i]]);return r};const ke=V.forwardRef((e,t)=>{var{children:r,className:o,variant:i,size:n="medium",icon:a}=e,g=_e(e,["children","className","variant","size","icon"]);return B.createElement(b,Object.assign({},g,{ref:t,as:"span",size:n==="medium"?"medium":"small",className:me("navds-tag",o,`navds-tag--${i}`,`navds-tag--${n}`)}),a&&B.createElement("span",{className:"navds-tag__icon--left"},a),r)}),xe=(e,t)=>l(e.fom).isBetween(t.fom,t.tom,"day","[]")||l(e.tom).isBetween(t.fom,t.tom,"day","[]")||l(t.fom).isBetween(e.fom,e.tom,"day","[]")||l(t.tom).isBetween(e.fom,e.tom,"day","[]"),Ie=(e,t,r)=>!!e&&F(t.fom)&&F(t.stillingsprosent)&&l(t.fom).isAfter(e.fom,"day")&&(r>0&&y(t.stillingsprosent)<r||r===0&&y(t.stillingsprosent)<100),be=(e,t,r)=>{const i={...r.find(a=>a.id===e),varierendePerioder:t.varierendePerioder.map(a=>({...a,type:N.DELVIS}))};return r.map(a=>a.id===e?i:a)},Fe=(e,t)=>e?e.find(r=>t>0?F(r.stillingsprosent)&&y(r.stillingsprosent)===t:F(r.stillingsprosent)&&y(r.stillingsprosent)===100):void 0,Ae=(e,t)=>e&&ge(e)?l(e).toDate():t,Oe=(e,t,r,o,i)=>{var a;const n=i&&i[e].tomType===T.SISTE_DAG_MED_SVP;if((a=i==null?void 0:i[e])!=null&&a.fom&&(n||i[e].tom)){const g=i[e].fom,d=i[e].tomType===T.SISTE_DAG_MED_SVP?t:l(i[e].tom).format(Q),f=l(d).diff(g,"days")+1,m=Math.floor(f/7),u=f-m*7;let p=j(d);return n&&(p=o?r.formatMessage({id:"PerioderStep.TreUkerFørTermin"}):r.formatMessage({id:"PerioderStep.Fødsel"})),`${j(g)} - ${p} (${r.formatMessage({id:"PerioderStep.tidsperiode"},{ukeAntall:m,dagAntall:u})})`}return r.formatMessage({id:"ny.periode"})},Ge=(e,t)=>{if(!t||t.length===0)return"";const r=t.filter(i=>i.tom||i.tomType===T.SISTE_DAG_MED_SVP).map(i=>i.tomType===T.SISTE_DAG_MED_SVP?l(e).add(1,"d"):l(i.tom)),o=r.length>0?l.max(r):void 0;return o?o.add(1,"d").format(Q):""},Re=(e,t)=>({fom:Ge(e,t),tom:"",stillingsprosent:"",tomType:void 0,type:N.DELVIS}),Ne=(e,t)=>!t||t.trim()===""?e.formatMessage({id:"valideringsfeil.stillingsprosent.required"}):y(t)===void 0?e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreEtTall"}):void 0,Ve=(e,t,r,o,i)=>n=>{const a=Ne(e,n);if(a)return a;const g=y(n);if(g&&i>0&&g>i)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEllerLikOpprinneligStillingsprosent"},{prosent:i});if(g&&i===0&&g>100)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEllerLik100Prosent"},{prosent:i});if(i>0&&(o!=null&&o.every(d=>d.stillingsprosent&&y(d.stillingsprosent)===i)))return e.formatMessage({id:"valideringsfeil.periode.stillingsprosent.kunFullTilrettelegging"},{prosent:i});if(i===0&&(o!=null&&o.every(d=>d.stillingsprosent&&y(d.stillingsprosent)===100)))return e.formatMessage({id:"valideringsfeil.periode.stillingsprosent.kun100Prosent"},{prosent:i});if(t&&r)return e.formatMessage({id:"valideringsfeil.periode.stillingsprosent.nySøknad"},{fom:j(r.fom)})},Le=(e,t,r,o,i,n,a)=>g=>{const d=r&&r.length>0?r[t].tom:void 0,f=r&&r.length>0?r[t].tomType:void 0;if(g&&o&&l(g).isBefore(l(o),"d"))return e.formatMessage({id:"valideringsfeil.periode.fom.førBehovForTilretteleggingFom"});if(a&&l(g).isAfter(l(a),"d")){const u=L(a,e);return e.formatMessage({id:"valideringsfeil.periode.fom.etterSluttDatoArbeid"},{dato:j(a),navn:n,slutteTekst:u})}const m=Ce(g,d,f,r,t,e,i);return m||qe(g,r,i,e)},we=(e,t,r)=>o=>{if(r&&l(o).isAfter(l(r),"d")){const i=L(r,e);return e.formatMessage({id:"valideringsfeil.periode.tom.etterSluttDatoArbeid"},{dato:j(r),navn:t,slutteTekst:i})}},Pe=(e,t,r,o)=>i=>{if(o&&i===T.SISTE_DAG_MED_SVP&&l(t).isAfter(l(o),"d")){const n=L(o,e);return e.formatMessage({id:"valideringsfeil.periode.tomType.etterSluttDatoArbeid"},{navn:r,slutteTekst:n})}},Ce=(e,t,r,o,i,n,a)=>{if((t||r)&&e&&o&&o.length>0){const d=o.filter((f,m)=>m>i).filter(f=>{let m;return f.tomType&&f.tomType===T.SISTE_DAG_MED_SVP&&(m=a),f.tom&&(m=f.tom),m?xe({fom:e,tom:t||a},{fom:f.fom,tom:m}):!1});if(d.length>0){const f=d[0].tom?d[0].tom:a;return n.formatMessage({id:"valideringsfeil.periode.overlapper"},{fom:j(d[0].fom),tom:j(f)})}}},qe=(e,t,r,o)=>{const i=t?t.filter(d=>d.fom).map(d=>l(d.fom)):void 0,n=i?l.min(i):void 0;if(n&&l(e).isSameOrBefore(n,"day"))return;const a=t?t.filter(d=>d.tom||d.tomType===T.SISTE_DAG_MED_SVP).map(d=>d.tomType===T.SISTE_DAG_MED_SVP?l(r):l(d.tom)):void 0;if(!(a?a.find(d=>l(e).subtract(1,"d").isSame(l(d),"day")):void 0))return o.formatMessage({id:"valideringsfeil.periode.ikkeSammenhengende"})},Be={type:N.DELVIS,fom:"",tom:"",stillingsprosent:"",tomType:void 0},Y=({tilrettelegginger:e,barn:t,valgtTilretteleggingId:r,kanHaSVPFremTilTreUkerFørTermin:o})=>{const i=ue("perioderStep"),n=W(),a=re(),{fields:g,append:d,remove:f}=ie({name:"varierendePerioder",control:a.control}),m=a.watch("varierendePerioder"),u=D(e.find(M=>M.id===r)),p=ye(t),S=u.arbeidsforhold.sluttdato,h=S?D(l.min(l(p),l(S))):p,_=new Date(u.behovForTilretteleggingFom),k=je(m,u.arbeidsforhold.stillinger),E=Fe(m,k),A=Re(p,m);return s.jsx(s.Fragment,{children:g.map((M,c)=>{const w=Ie(E,m[c],k),P=Ae(m[c].fom,_),Z=K(P,h);return s.jsxs(V.Fragment,{children:[s.jsxs(I,{gap:"1",children:[s.jsx(fe,{}),s.jsxs(U,{justify:"space-between",align:"center",children:[s.jsx(ke,{variant:"info-moderate",className:i.element("tag"),children:Oe(c,p,n,o,m)}),c!==0&&s.jsx(H,{icon:s.jsx(pe,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>f(c),children:s.jsx(v,{id:"perioder.varierende.slett"})})]})]}),s.jsx($,{name:`varierendePerioder.${c}.fom`,label:n.formatMessage({id:"perioder.varierende.fom.label"}),minDate:_,maxDate:h,validate:[G(n.formatMessage({id:"valideringsfeil.periode.fom.påkrevd"})),J(n.formatMessage({id:"valideringsfeil.periode.fom.gyldigDato"})),R(n.formatMessage({id:"valideringsfeil.periode.fom.førTilDato"}),m[c].tom),R(o?n.formatMessage({id:"valideringsfeil.periode.fom.etterTreUkerFørTermin"}):n.formatMessage({id:"valideringsfeil.periode.fom.etterFødsel"}),p),Le(n,c,m,u.behovForTilretteleggingFom,p,u.arbeidsforhold.navn||"",S)],defaultMonth:K(_,h)}),s.jsxs(se,{name:`varierendePerioder.${c}.tomType`,label:s.jsx(v,{id:"perioder.varierende.tomType.label"}),validate:[G(o?n.formatMessage({id:"valideringsfeil.periode.tomType.påkrevd.termin"}):n.formatMessage({id:"valideringsfeil.periode.tomType.påkrevd.fødsel"})),Pe(n,p,u.arbeidsforhold.navn||"",S)],children:[s.jsx(z,{value:T.VALGFRI_DATO,children:s.jsx(v,{id:"perioder.varierende.tomType.valgfriDato"})}),s.jsx(z,{value:T.SISTE_DAG_MED_SVP,children:o?s.jsx(v,{id:"perioder.varierende.tomType.treUkerFørTermin"}):s.jsx(v,{id:"perioder.varierende.tomType.dagenFørFødsel"})})]}),m[c].tomType===T.VALGFRI_DATO&&s.jsx($,{name:`varierendePerioder.${c}.tom`,label:n.formatMessage({id:"perioder.varierende.tom.label"}),validate:[G(n.formatMessage({id:"valideringsfeil.periode.tom.påkrevd"})),J(n.formatMessage({id:"valideringsfeil.periode.tom.gyldigDato"})),he(n.formatMessage({id:"valideringsfeil.periode.tom.etterTilDato"}),m[c].fom),R(o?n.formatMessage({id:"valideringsfeil.periode.tom.etterTreUkerFørTermin"}):n.formatMessage({id:"valideringsfeil.periode.tom.etterFødsel"}),p),we(n,u.arbeidsforhold.navn||"",S)],minDate:P,maxDate:h,defaultMonth:Z}),s.jsxs("div",{children:[s.jsx(oe,{name:`varierendePerioder.${c}.stillingsprosent`,label:n.formatMessage({id:"perioder.varierende.stillingsprosent.label"}),className:i.element("stillingsprosent"),description:n.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}),validate:[Ve(n,w,E,m,k)]}),s.jsx(Ee,{onOpenChange:ce("Svangerskapspenger","Ikke_har_100%_stilling"),size:"medium",header:n.formatMessage({id:"tilrettelegging.varierendePerioderStillingsprosent.info.tittel"}),children:s.jsxs(I,{gap:"2",children:[s.jsx(b,{children:s.jsx(v,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"})}),s.jsx(b,{children:s.jsx(v,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"})})]})})]}),w&&s.jsx(ve,{variant:"warning",children:s.jsxs(I,{gap:"4",children:[s.jsx(X,{size:"small",children:s.jsx(v,{id:"perioder.alert.nySøknad.title"})}),s.jsx("div",{children:s.jsx(v,{id:"perioder.alert.nySøknad.del1"})}),s.jsx(v,{id:"perioder.alert.nySøknad.del2"})]})}),m&&c===m.length-1&&s.jsx(U,{children:s.jsx(H,{icon:s.jsx(De,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>d(A),children:s.jsx(v,{id:"perioder.varierende.leggTil"})})})]},M.id)})})};Y.__docgenInfo={description:"",methods:[],displayName:"PerioderFieldArray"};const $e=(e,t)=>{if(t===void 0&&e.length>0)return e[0].id;const r=e.findIndex(o=>o.id===t)+1;if(r!==e.length)return e[r].id},ze=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:t,arbeidsforhold:r})=>{const o=W(),i=ee(r),n=te(e,r),a=D(O(x.TILRETTELEGGINGER)),g=D(O(x.OM_BARNET)),d=D(O(x.VALGT_TILRETTELEGGING_ID)),[f]=V.useState(d),m=C(x.TILRETTELEGGINGER),u=C(x.VALGT_TILRETTELEGGING_ID),p=D(a.find(E=>E.id===f)),S=a.length>1,h=Se(g),_=E=>{const A=be(f,E,a);m(A);const M=$e(a,f);return M&&u(M),n.goToNextStep(M?q.SKJEMA:q.OPPSUMMERING)},k=ne({shouldUnregister:!0,defaultValues:{varierendePerioder:p.varierendePerioder&&p.varierendePerioder.length>0?p.varierendePerioder:[Be]}});return s.jsx(Te,{bannerTitle:o.formatMessage({id:"søknad.pageheading"}),onCancel:t,steps:i,onContinueLater:n.fortsettSøknadSenere,onStepChange:n.goToNextStep,children:s.jsx(ae,{formMethods:k,onSubmit:_,children:s.jsxs(I,{gap:"10",children:[s.jsx(de,{}),S&&s.jsx(Me,{arbeid:p.arbeidsforhold}),s.jsxs("div",{children:[s.jsx(X,{size:"small",children:s.jsx(v,{id:"perioder.varierende.heading"})}),s.jsx(b,{children:h?s.jsx(v,{id:"perioder.varierende.description.termin"}):s.jsx(v,{id:"perioder.varierende.description.fødsel"})})]}),s.jsx(Y,{valgtTilretteleggingId:f,barn:g,tilrettelegginger:a,kanHaSVPFremTilTreUkerFørTermin:h}),s.jsx(le,{goToPreviousStep:n.goToPreviousDefaultStep})]})})})};ze.__docgenInfo={description:"",methods:[],displayName:"PerioderStep",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{ze as P};
