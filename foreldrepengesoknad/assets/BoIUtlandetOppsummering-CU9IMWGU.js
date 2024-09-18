import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{r as l,R as o}from"./index-CTjT7uj6.js";import{c as p,H as T,L as V,a as F,u as f,M as d}from"./Label-CBuMlGmt.js";import"./apiInterceptor-BUYwhPMO.js";import{b as N,as as B,Z as q,am as H}from"./Uttaksplan-B0V9ipk_.js";import{m as u,x as R,y as C,d as U}from"./Uttaksdagen-B6IzymJM.js";import{V as x}from"./VStack-CXeXbv9J.js";import{N as c}from"./EgenNæring-bnb8Ikwh.js";import{a as M,i as D}from"./ArbeidsforholdOgInntekt-D1ki89wn.js";import{L as J}from"./links-D1Ssr2Sm.js";const Y=()=>{const r=l.useRef(new AbortController);return l.useEffect(()=>()=>{r.current.abort()},[]),r.current.signal};var $=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const z=o.forwardRef((r,t)=>{var{children:a,className:s}=r,i=$(r,["children","className"]);return o.createElement("div",Object.assign({ref:t},i,{className:p("navds-form-summary__answer",s)}),a)});var K=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const G=l.forwardRef((r,t)=>{var{children:a,className:s}=r,i=K(r,["children","className"]);return o.createElement("dl",Object.assign({ref:t},i,{className:p("navds-form-summary__answers",s)}),a)});var W=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const Z=l.forwardRef((r,t)=>{var{children:a="Endre svar",className:s}=r,i=W(r,["children","className"]);return o.createElement(J,Object.assign({ref:t},i,{className:p("navds-form-summary__edit",s)}),a)});var Q=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const X=l.forwardRef((r,t)=>{var{children:a,className:s}=r,i=Q(r,["children","className"]);return o.createElement("header",Object.assign({ref:t},i,{className:p("navds-form-summary__header",s)}),a)}),ee=l.forwardRef((r,t)=>o.createElement(T,Object.assign({ref:t},r,{size:"medium"})));var re=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const ne=l.forwardRef((r,t)=>{var{children:a}=r,s=re(r,["children"]);return o.createElement(V,Object.assign({ref:t},s,{as:"dt"}),a)});var se=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const te=l.forwardRef((r,t)=>{var{children:a,className:s}=r,i=se(r,["children","className"]);return o.createElement(F,Object.assign({ref:t},i,{as:"dd",className:p("navds-form-summary__value",s)}),a)});var ie=function(r,t){var a={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&t.indexOf(s)<0&&(a[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(r);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(r,s[i])&&(a[s[i]]=r[s[i]]);return a};const n=l.forwardRef((r,t)=>{var{children:a,className:s}=r,i=ie(r,["children","className"]);return o.createElement("div",Object.assign({ref:t},i,{className:p("navds-form-summary",s)}),a)});n.Header=X;n.Heading=ee;n.EditLink=Z;n.Answers=G;n.Answer=z;n.Label=ne;n.Value=te;const ae=(r,t,a)=>{if(t==="Engangsstønad")return r.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(t==="Foreldrepenger"&&a!==void 0)return r.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(a);if(t==="Svangerskapspenger")return r.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${t} not supported`)},de=({sendSøknad:r,cancelApplication:t,onContinueLater:a,goToPreviousStep:s,onStepChange:i,stepConfig:y,children:O,appName:v,ekstraSamtykketekst:A})=>{const h=f(),w=Y(),[j,S]=l.useState(!1),[k,L]=l.useState(!1),[E,P]=l.useState(!1),_=()=>{j?(L(!0),r(w)):P(!0)};return e.jsx(N,{onCancel:t,onContinueLater:a,steps:y,onStepChange:i,noFieldsRequired:!0,children:e.jsxs(x,{gap:"10",children:[e.jsx(x,{gap:"3",children:O}),e.jsx(B,{label:ae(h,v,A),onChange:()=>S(I=>!I),checked:j,error:E&&!j&&h.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),e.jsx(q,{goToPreviousStep:s,nextButtonOnClick:_,isDisabledAndLoading:k,isSendButton:!0})]})})};de.__docgenInfo={description:"",methods:[],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(abortSignal: AbortSignal) => Promise<void>",signature:{arguments:[{type:{name:"AbortSignal"},name:"abortSignal"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const le=({arbeidsforholdOgInntekt:r,arbeidsforhold:t,onVilEndreSvar:a})=>r?e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(d,{id:"ArbeidsforholdOppsummering.Arbeid"})}),e.jsx(n.EditLink,{onClick:a,children:e.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.OmArbeidsforhold"})}),e.jsxs(n.Value,{children:[t.length===0&&e.jsx(d,{id:"ArbeidsforholdOppsummering.IngenRegistrerteArbeidsforhold"}),t.length>0&&e.jsx(n.Answers,{children:t.map(s=>e.jsx(oe,{arbeidsforhold:s},s.arbeidsgiverId))})]})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.HarDuJobbetSomFrilans"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:r.harJobbetSomFrilans})})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivende"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:r.harJobbetSomSelvstendigNæringsdrivende})})]}),M(r)&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.HarHattArbeidIUtlandet"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:r.harHattArbeidIUtlandet})})]}),D(r)&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.HarHattAndreInntektskilder"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:r.harHattAndreInntektskilder})})]})]})]}):null,m=({ja:r})=>r?e.jsx(d,{id:"ja"}):e.jsx(d,{id:"nei"}),oe=({arbeidsforhold:r})=>{const t=f();return e.jsxs(n.Answer,{children:[e.jsxs(n.Label,{children:[H(r.arbeidsgiverNavn),","," ",r.stillingsprosent,"%"]}),e.jsxs(n.Value,{children:["Org nr: ",r.arbeidsgiverId,","," ",e.jsx(d,{id:"ArbeidsforholdFormSummaryValue.arbeidsforhold.periode",values:{fom:u(r.fom),tom:r.tom?u(r.tom):t.formatMessage({id:"pågående"})}})]})]})},me=({onVilEndreSvar:r,egenNæring:t})=>t?e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(d,{id:"ArbeidsforholdOppsummering.Næring"})}),e.jsx(n.EditLink,{onClick:r,children:e.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype"})}),e.jsx(n.Value,{children:(()=>{switch(t==null?void 0:t.næringstype){case c.FISKER:return e.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.fiske"});case c.DAGMAMMA:return e.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.dagmamma"});case c.JORDBRUK:return e.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.jordbrukSkogbruk"});case c.ANNET:return e.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.annen"});default:return null}})()})]}),t.navnPåNæringen&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.navnPåNæring"})}),e.jsx(n.Value,{children:t.navnPåNæringen})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.erNæringenRegistrertINorge"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:t.registrertINorge})})]}),t.organisasjonsnummer&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.orgnr"})}),e.jsx(n.Value,{children:t.organisasjonsnummer})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.næring.fom"})}),e.jsx(n.Value,{children:u(t.fomDato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.næring.pågående"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:t.pågående})})]}),!t.pågående&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.næring.tom"})}),e.jsx(n.Value,{children:u(t.tomDato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.næringsinntekt"})}),e.jsx(n.Value,{children:t.næringsinntekt})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.blittYrkesaktivSiste3År"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:!!t.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene})})]}),t.oppstartsdato&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.yrkesaktivDato"})}),e.jsx(n.Value,{children:u(t.oppstartsdato)})]})]})]}):null,ue=({onVilEndreSvar:r,frilans:t})=>t?e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(d,{id:"ArbeidsforholdOppsummering.Frilans"})}),e.jsx(n.EditLink,{onClick:r,children:e.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.Oppstart"})}),e.jsx(n.Value,{children:u(t.oppstart)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"ArbeidsforholdOppsummering.JobberFremdelesSomFrilans"})}),e.jsx(n.Value,{children:e.jsx(m,{ja:t.jobberFremdelesSomFrilans})})]})]})]}):null;le.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOppsummering"};me.__docgenInfo={description:"",methods:[],displayName:"SelvstendigNæringsdrivendeOppsummering"};ue.__docgenInfo={description:"",methods:[],displayName:"FrilansOppsummering"};const b=(r,t)=>C(r)?t.formatMessage({id:"LandOppsummering.IDag"}):u(r),pe=(r,t)=>U(r.fom).isAfter(t.fom,"day")?1:0,g=({utenlandsoppholdListe:r})=>{const t=f();return e.jsx(n.Answers,{children:r.sort(pe).map(a=>e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:R.getName(a.landkode,"nb")}),e.jsx(n.Value,{children:e.jsx(d,{id:"LandOppsummering.periode",values:{fra:b(a.fom,t),til:b(a.tom,t)}})})]},a.landkode))})};g.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering",props:{utenlandsoppholdListe:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""}}};const ce=({onVilEndreSvar:r,tidligereUtenlandsopphold:t,senereUtenlandsopphold:a})=>e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.tittel"})}),e.jsx(n.EditLink,{onClick:r,children:e.jsx(d,{id:"EndreSvar"})})]}),e.jsx(n.Answers,{children:e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel"})}),e.jsx(n.Value,{children:t.length>0?e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet"}):e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge"})})]})}),t.length>0&&e.jsx(n.Answers,{children:e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label",values:{antall:t.length}})}),e.jsx(n.Value,{children:e.jsx(g,{utenlandsoppholdListe:t})})]})}),e.jsx(n.Answers,{children:e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel"})}),e.jsx(n.Value,{children:a.length>0?e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet"}):e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge"})})]})}),a.length>0&&e.jsx(n.Answers,{children:e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label",values:{antall:a.length}})}),e.jsx(n.Value,{children:e.jsx(g,{utenlandsoppholdListe:a})})]})})]});ce.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummering",props:{tidligereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},senereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{le as A,ce as B,n as F,de as O,me as S,ue as a};
