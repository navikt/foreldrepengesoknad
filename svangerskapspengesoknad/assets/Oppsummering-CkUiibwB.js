import{j as e}from"./tslib.es6-C_-gbNBy.js";import{d as L,e as D,c as K,H as R,B as Y,a as s,u as P}from"./Modal-jpjfRTmg.js";import{F as r,O as W,B as Q}from"./BoIUtlandetOppsummeringspunkt-DwjtoM9k.js";import{E as g,P as X,V as Z,F as ee,d as re,C as ne}from"./CalendarLabel-BOjWYyGG.js";import{r as S,R as u}from"./index-CTjT7uj6.js";import{n as x,A as N,d as y,u as se,a as ie,g as te}from"./useSvpNavigator-CcE3CUWV.js";import"./dateFormValidation-ChXBOKMN.js";import{u as c,C as o,b as le,a as h}from"./routes-BKH065He.js";import{N as T}from"./EgenNæring-DdBVG6ty.js";import{g as A,a as ae}from"./dateUtils-hgx9jYdj.js";import{m as V}from"./tilretteleggingUtils-H0_0zdtK.js";const w=S.createContext({listType:"ul",isNested:null,size:"medium"});var de=function(n,i){var l={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&i.indexOf(t)<0&&(l[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(n);a<t.length;a++)i.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(n,t[a])&&(l[t[a]]=n[t[a]]);return l};const G=S.forwardRef((n,i)=>{var{className:l,children:t,title:a,icon:d}=n,j=de(n,["className","children","title","icon"]);const{listType:m,size:p}=S.useContext(w);return m==="ol"&&d&&console.warn("<List />: Icon prop is not supported for ordered lists. Please remove the icon prop."),u.createElement("li",Object.assign({},j,{ref:i,className:L("navds-list__item",l)}),m==="ul"&&u.createElement("div",{className:L({"navds-list__item-marker--icon":d,"navds-list__item-marker--bullet":!d})},d||u.createElement("svg",{width:"6",height:"6",viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,focusable:!1,role:"img"},u.createElement("rect",{width:"6",height:"6",rx:"3",fill:"currentColor"}))),u.createElement(D,{as:"div",size:p,className:"navds-list__item-content"},a&&u.createElement(D,{as:"p",size:p,weight:"semibold"},a),t))});G.displayName="List.Item";var oe=function(n,i){var l={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&i.indexOf(t)<0&&(l[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(n);a<t.length;a++)i.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(n,t[a])&&(l[t[a]]=n[t[a]]);return l};const I=S.forwardRef((n,i)=>{var l,{children:t,className:a,as:d="ul",title:j,description:m,headingTag:p="h3",size:f}=n,k=oe(n,["children","className","as","title","description","headingTag","size"]);const b=K(),{isNested:_,size:$}=S.useContext(w),E=(l=f??$)!==null&&l!==void 0?l:"medium";return u.createElement(w.Provider,{value:{listType:d,isNested:_!==null,size:E}},u.createElement("div",Object.assign({},k,{ref:i,className:L("navds-list",`navds-list--${E}`,a,{"navds-list--nested":_!==null})}),j&&u.createElement(R,{id:`tittel-${b}`,size:E==="medium"?"small":"xsmall",as:p},j),m&&u.createElement(Y,{size:E,id:`description-${b}`},m),u.createElement(d,{"aria-labelledby":j&&`tittel-${b}`,"aria-describedby":m&&`description-${b}`},t)))});I.Item=G;function H({arbeidsforhold:n,onVilEndreSvar:i}){const l=x(c(o.INNTEKTSINFORMASJON));return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.arbeid"})}),e.jsx(r.EditLink,{onClick:i,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.omArbeidsforhold"})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:n.map(t=>e.jsx(ge,{arbeidsforhold:t},t.arbeidsgiverId))})})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"inntektsinformasjon.harDuJobbetSomFrilans"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:l.harJobbetSomFrilans})})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:l.harJobbetSomSelvstendigNæringsdrivende})})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"inntektsinformasjon.hattArbeidIUtlandet"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:l.harHattArbeidIUtlandet})})]})]})]})}function v({ja:n}){return n?e.jsx(s,{id:"ja"}):e.jsx(s,{id:"nei"})}function ge({arbeidsforhold:n}){const i=P();return e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.arbeidsgiverNavn,", ",n.stillingsprosent,"%"]}),e.jsxs(r.Value,{children:["Org nr: ",n.arbeidsgiverId,","," ",e.jsx(s,{id:"inntektsinformasjon.arbeidsforhold.periode",values:{fom:g(n.fom),tom:n.tom?g(n.tom):i.formatMessage({id:"pågående"})}})]})]})}function C({onVilEndreSvar:n}){const i=c(o.EGEN_NÆRING);return i?e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.næring"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.næringstype"})}),e.jsx(r.Value,{children:(()=>{switch(i==null?void 0:i.næringstype){case T.FISKER:return e.jsx(s,{id:"egenNæring.næringstype.fiske"});case T.DAGMAMMA:return e.jsx(s,{id:"egenNæring.næringstype.dagmamma"});case T.JORDBRUK:return e.jsx(s,{id:"egenNæring.næringstype.jordbrukSkogbruk"});case T.ANNET:return e.jsx(s,{id:"egenNæring.næringstype.annen"});default:return null}})()})]}),i.navnPåNæringen&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.navnPåNæring"})}),e.jsx(r.Value,{children:i.navnPåNæringen})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.erNæringenRegistrertINorge"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:i.registrertINorge})})]}),i.organisasjonsnummer&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.orgnr"})}),e.jsx(r.Value,{children:i.organisasjonsnummer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.næring.fom"})}),e.jsx(r.Value,{children:g(i.fomDato)})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.næring.pågående"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:i.pågående})})]}),!i.pågående&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.næring.tom"})}),e.jsx(r.Value,{children:g(i.tomDato)})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.næringsinntekt"})}),e.jsx(r.Value,{children:i.næringsinntekt})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.blittYrkesaktivSiste3År"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:!!i.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene})})]}),i.oppstartsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"egenNæring.yrkesaktivDato"})}),e.jsx(r.Value,{children:g(i.oppstartsdato)})]})]})]}):null}function M({onVilEndreSvar:n}){const i=c(o.FRILANS);return i?e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.frilans"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"frilans.oppstart"})}),e.jsx(r.Value,{children:g(i.oppstart)})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"frilans.jobberFremdelesSomFrilans"})}),e.jsx(r.Value,{children:e.jsx(v,{ja:i.jobberFremdelesSomFrilans})})]})]})]}):null}function U({onVilEndreSvar:n}){const i=c(o.ARBEID_I_UTLANDET),l=P();return i?e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.arbeidIUtlandet"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[e.jsx(s,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:i.arbeidIUtlandet.length}})," "]}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:i.arbeidIUtlandet.map(t=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[t.arbeidsgiverNavn," i ",X(t.land,l.locale)]}),e.jsx(r.Value,{children:e.jsx(s,{id:"inntektsinformasjon.arbeidsforhold.periode",values:{fom:g(t.fom),tom:t.tom?g(t.tom):l.formatMessage({id:"pågående"})}})})]},`${t.arbeidsgiverNavn}-${t.land}`))})})]})})]}):null}H.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOppsummering",props:{arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"SelvstendigNæringsdrivendeSummary",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};M.__docgenInfo={description:"",methods:[],displayName:"FrilansSummary",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};U.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetSummary",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function B({tilrettelegginger:n,onVilEndreSvar:i}){return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.dokumentasjon.tittel"})}),e.jsx(r.EditLink,{onClick:i,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:n.map(l=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(ce,{tilrettelegging:l})}),e.jsx(r.Value,{children:e.jsx(Z,{children:l.vedlegg.map(t=>e.jsx(ee,{href:t.url,target:"_blank",children:t.filename},t.id))})})]},l.id))})]})}function ce({tilrettelegging:n}){switch(n.arbeidsforhold.type){case N.FRILANSER:return e.jsx(s,{id:"oppsummering.dokumentasjon.frilanser"});case N.SELVSTENDIG:return e.jsx(s,{id:"oppsummering.dokumentasjon.selvstendig"});default:return e.jsx(s,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:n.arbeidsforhold.navn}})}}B.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilrettelegginger:{required:!0,tsType:{name:"Array",elements:[{name:"Tilrettelegging"}],raw:"Tilrettelegging[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};function q({onVilEndreSvar:n}){return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.periode.tittel"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsx(me,{}),e.jsx(je,{}),e.jsx(ue,{})]})]})}function me(){const n=x(c(o.OM_BARNET)),l=x(c(o.TILRETTELEGGINGER)).filter(d=>[N.VIRKSOMHET,N.PRIVAT].includes(d.arbeidsforhold.type)),t=A(n),a=V(l,t);return l.map(d=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:d.arbeidsforhold.navn}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:a.length===1?e.jsx(O,{periode:a[0]}):e.jsx(F,{perioder:a})})})]},d.id))}function je(){const n=x(c(o.OM_BARNET)),l=x(c(o.TILRETTELEGGINGER)).find(d=>d.arbeidsforhold.type===N.FRILANSER);if(!l)return null;const t=A(n),a=V([l],t);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:l.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:l.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:g(l.behovForTilretteleggingFom)})]}),a.length===1?e.jsx(O,{periode:a[0]}):e.jsx(F,{perioder:a})]})})]})}function ue(){const n=x(c(o.OM_BARNET)),l=x(c(o.TILRETTELEGGINGER)).find(d=>d.arbeidsforhold.type===N.SELVSTENDIG);if(!l)return null;const t=A(n),a=V([l],t);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:l.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:l.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:l.arbeidsforhold.navn}})}),e.jsx(r.Value,{children:g(l.behovForTilretteleggingFom)})]}),a.length===1?e.jsx(O,{periode:a[0]}):e.jsx(F,{perioder:a})]})})]})}function O({periode:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(J,{stillingsprosent:n.stillingsprosent,tilretteleggingstype:n.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.type===y.INGEN&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),n.type===y.DELVIS&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(z,{periode:n})})]})]})}function F({perioder:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(I,{children:n.map(i=>e.jsxs(I.Item,{children:[e.jsx(z,{periode:i}),":"," ",e.jsx(J,{stillingsprosent:i.stillingsprosent,tilretteleggingstype:i.type})]},i.fom))})})]})}function z({periode:n}){const i=x(c(o.OM_BARNET)),l=ae(i),t=A(i);if(re(n.tom).isSame(t,"d")){if(l)return e.jsx(s,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:g(n.fom)}})}else return e.jsx(s,{id:"oppsummering.periode.fraTil",values:{fraDato:g(n.fom),tilDato:g(n.tom)}});return e.jsx(s,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:g(n.fom)}})}function J({tilretteleggingstype:n,stillingsprosent:i}){return n===y.HEL?e.jsx(s,{id:"oppsummering.periode.tilbakeIFullJobb"}):n===y.INGEN?e.jsx(s,{id:"oppsummering.periode.ikkeJobbe"}):e.jsx(s,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:i}})}q.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};const xe=({sendSøknad:n,mellomlagreSøknadOgNaviger:i,avbrytSøknad:l,søkerInfo:t})=>{const a=se(t.arbeidsforhold),d=ie(i,t.arbeidsforhold),j=x(c(o.TILRETTELEGGINGER)),m=x(c(o.OM_BARNET)),p=c(o.UTENLANDSOPPHOLD_SENERE),f=c(o.UTENLANDSOPPHOLD_TIDLIGERE),k=le(o.VALGT_TILRETTELEGGING_ID),b=te(t.arbeidsforhold,m.termindato);return e.jsxs(ne,{children:[e.jsx(R,{size:"large",children:e.jsx(s,{id:"søknad.pageheading"})}),e.jsxs(W,{appName:"Svangerskapspenger",stepConfig:a,sendSøknad:n,cancelApplication:l,goToPreviousStep:()=>{k(j[(j==null?void 0:j.length)-1].id),d.goToPreviousDefaultStep()},onContinueLater:d.fortsettSøknadSenere,onStepChange:d.goToNextStep,children:[e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.omBarnet"})}),e.jsx(r.EditLink,{onClick:()=>d.goToNextStep(h.BARNET),children:e.jsx(s,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:g(m.termindato)})]}),m.erBarnetFødt&&m.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:g(m.fødselsdato)})]})]})]}),e.jsx(Q,{onVilEndreSvar:()=>d.goToNextStep(h.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:(f==null?void 0:f.utenlandsoppholdSiste12Mnd)??[],senereUtenlandsopphold:(p==null?void 0:p.utenlandsoppholdNeste12Mnd)??[]}),e.jsx(H,{arbeidsforhold:b,onVilEndreSvar:()=>d.goToNextStep(h.INNTEKTSINFORMASJON)}),e.jsx(M,{onVilEndreSvar:()=>d.goToNextStep(h.FRILANS)}),e.jsx(C,{onVilEndreSvar:()=>d.goToNextStep(h.NÆRING)}),e.jsx(U,{onVilEndreSvar:()=>d.goToNextStep(h.ARBEID_I_UTLANDET)}),e.jsx(B,{tilrettelegginger:j,onVilEndreSvar:()=>d.goToNextStep(h.SKJEMA)}),e.jsx(q,{onVilEndreSvar:()=>d.goToNextStep(h.TILRETTELEGGING)})]})]})};xe.__docgenInfo={description:"",methods:[],displayName:"Oppsummering"};export{xe as O};
