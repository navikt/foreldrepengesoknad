import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u,C as g,a as v}from"./routes-B1fb87EI.js";import{h as J,F as y,i as K,m as L,n as O,T as E,u as $,a as W,g as Q}from"./useSvpNavigator-yfJ1o2OX.js";import{u as X}from"./useTilretteleggingerHelper-D-6BeEDu.js";import{q as A,r as G,H as q,e as Y,M as l,V as Z,T as ee,u as w,_ as re,R as x,f as ne,C as ie}from"./VeiviserPage-DPeYfbGG.js";import{F as r,O as se,B as te,A as ae,a as le,S as oe}from"./BoIUtlandetOppsummering-DUnhUZ29.js";import{r as k,R as h}from"./index-CTjT7uj6.js";import{j as R,E as T,n as b}from"./minMax-BeRBV8CB.js";import{g as D,a as de}from"./dateUtils-DnafmBGO.js";const S=k.createContext({listType:"ul",size:"medium"});var me=function(i,s){var a={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&s.indexOf(n)<0&&(a[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(i);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(i,n[t])&&(a[n[t]]=i[n[t]]);return a};const V=k.forwardRef((i,s)=>{var{className:a,children:n,title:t,icon:m}=i,o=me(i,["className","children","title","icon"]);const{listType:c,size:d}=k.useContext(S);return c==="ol"&&m&&console.warn("<List />: Icon prop is not supported for ordered lists. Please remove the icon prop."),h.createElement("li",Object.assign({},o,{ref:s,className:A("navds-list__item",a)}),c==="ul"&&h.createElement("div",{className:A("navds-list__item-marker",{"navds-list__item-marker--icon":m,"navds-list__item-marker--bullet":!m})},m||h.createElement("svg",{width:"0.375rem",height:"0.375rem",viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,focusable:!1,role:"img"},h.createElement("rect",{width:"6",height:"6",rx:"3",fill:"currentColor"}))),h.createElement("div",null,t&&h.createElement(G,{as:"p",size:d,weight:"semibold"},t),n))});V.displayName="List.Item";var ue=function(i,s){var a={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&s.indexOf(n)<0&&(a[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(i);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(i,n[t])&&(a[n[t]]=i[n[t]]);return a};const ge={small:"xsmall",medium:"small",large:"medium"},I=k.forwardRef((i,s)=>{var{children:a,className:n,as:t="ul",title:m,description:o,headingTag:c="h3",size:d}=i,p=ue(i,["children","className","as","title","description","headingTag","size"]);const{size:f}=k.useContext(S),j=d??f;return h.createElement(S.Provider,{value:{listType:t,size:j}},h.createElement(G,Object.assign({as:"div"},p,{size:j,ref:s,className:A("navds-list",`navds-list--${j}`,n)}),m&&h.createElement(q,{size:ge[j],as:c},m),o&&h.createElement(Y,{size:j},o),h.createElement(t,{role:"list"},a)))});I.Item=V;function P({tilretteleggingerVedlegg:i,onVilEndreSvar:s,alleArbeidsforhold:a}){return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(l,{id:"oppsummering.dokumentasjon.tittel"})}),e.jsx(r.EditLink,{onClick:s,children:e.jsx(l,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:Object.keys(i).map(n=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(ce,{tilretteleggingId:n,alleArbeidsforhold:a})}),e.jsx(r.Value,{children:e.jsx(Z,{children:i[n].map(t=>e.jsx(ee,{href:t.url,target:"_blank",children:t.filename},t.id))})})]},n))})]})}function ce({tilretteleggingId:i,alleArbeidsforhold:s}){const a=w();switch(i){case y:return e.jsx(l,{id:"oppsummering.dokumentasjon.frilanser"});case T:return e.jsx(l,{id:"oppsummering.dokumentasjon.selvstendig"});default:{const n=J(a,i,s);return e.jsx(l,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:R(n)}})}}}P.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilretteleggingerVedlegg:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"}],raw:"Record<string, Attachment[]>"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const M=({onVilEndreSvar:i})=>{const s=u(g.ARBEID_I_UTLANDET),a=w();return s?e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(l,{id:"steps.label.arbeidIUtlandet"})}),e.jsx(r.EditLink,{onClick:i,children:e.jsx(l,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:s.arbeidIUtlandet.length}})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:s.arbeidIUtlandet.map(n=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.arbeidsgiverNavn," i ",re(n.land,a.locale)]}),e.jsx(r.Value,{children:e.jsx(l,{id:"JobbetIUtlandetOppsummering.arbeidsforhold.periode",values:{fom:x(n.fom),tom:n.tom?x(n.tom):a.formatMessage({id:"pågående"})}})})]},`${n.arbeidsgiverNavn}-${n.land}`))})})]})})]}):null};M.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function C({onVilEndreSvar:i,alleArbeidsforhold:s}){const a=b(u(g.OM_BARNET)),n=D(a);return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(l,{id:"oppsummering.periode.tittel"})}),e.jsx(r.EditLink,{onClick:i,children:e.jsx(l,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsx(pe,{alleArbeidsforhold:s,sisteDagForSvangerskapspenger:n,termindato:a.termindato}),e.jsx(je,{sisteDagForSvangerskapspenger:n}),e.jsx(he,{sisteDagForSvangerskapspenger:n})]})]})}function pe({alleArbeidsforhold:i,sisteDagForSvangerskapspenger:s,termindato:a}){const n=b(u(g.TILRETTELEGGINGER)),t=u(g.TILRETTELEGGINGER_PERIODER),m=Object.keys(n).filter(o=>o!==y&&o!==T);return m?m.map(o=>{const c=n[o],d=t==null?void 0:t[o],p=i.find(N=>N.arbeidsgiverId===o),f=K(a,o,i),j=d?L(d,s,f):O(c,s,f);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:R(p==null?void 0:p.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:j.length===1?e.jsx(_,{periode:j[0]}):e.jsx(F,{perioder:j})})})]},o)}):null}function je({sisteDagForSvangerskapspenger:i}){const s=b(u(g.TILRETTELEGGINGER)),a=u(g.TILRETTELEGGINGER_PERIODER),n=u(g.FRILANS);if(!Object.keys(s).some(p=>p===y)||!n)return null;const m=s[y],o=a==null?void 0:a[y],c=[{fom:n.oppstart,stillingsprosent:100}],d=o?L(o,i,c):O(m,i,c);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:m.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:m.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:x(m.behovForTilretteleggingFom)})]}),d.length===1?e.jsx(_,{periode:d[0]}):e.jsx(F,{perioder:d})]})})]})}function he({sisteDagForSvangerskapspenger:i}){const s=w(),a=b(u(g.TILRETTELEGGINGER)),n=u(g.TILRETTELEGGINGER_PERIODER),t=u(g.EGEN_NÆRING);if(!Object.keys(a).some(f=>f===T)||!t)return null;const o=a[T],c=n==null?void 0:n[T],d=[{fom:t.fom,tom:t.tom,stillingsprosent:100}],p=c?L(c,i,d):O(o,i,d);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:o.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:o.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:R(t.navnPåNæringen??s.formatMessage({id:"egenNæring"}).toLowerCase())}})}),e.jsx(r.Value,{children:x(o.behovForTilretteleggingFom)})]}),p.length===1?e.jsx(_,{periode:p[0]}):e.jsx(F,{perioder:p})]})})]})}function _({periode:i}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(z,{stillingsprosent:i.stillingsprosent,tilretteleggingstype:i.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[i.type===E.INGEN&&e.jsx(l,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),i.type===E.DELVIS&&e.jsx(l,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(U,{periode:i})})]})]})}function F({perioder:i}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(I,{children:i.map(s=>e.jsxs(I.Item,{children:[e.jsx(U,{periode:s}),":"," ",e.jsx(z,{stillingsprosent:s.stillingsprosent,tilretteleggingstype:s.type})]},s.fom))})})]})}function U({periode:i}){const s=b(u(g.OM_BARNET)),a=D(s),n=de(s);if(ne(i.tom).isSame(a,"d")){if(n)return e.jsx(l,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:x(i.fom)}})}else return e.jsx(l,{id:"oppsummering.periode.fraTil",values:{fraDato:x(i.fom),tilDato:x(i.tom)}});return e.jsx(l,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:x(i.fom)}})}function z({tilretteleggingstype:i,stillingsprosent:s}){if(i===E.HEL)return e.jsx(l,{id:"oppsummering.periode.tilbakeIFullJobb"});if(i===E.INGEN)return e.jsx(l,{id:"oppsummering.periode.ikkeJobbe"});if(i===E.DELVIS&&s===void 0)throw new Error("Stillingsprosent ikke satt for delvis tilrettelegging");return e.jsx(l,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:s}})}C.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const xe=({sendSøknad:i,mellomlagreSøknadOgNaviger:s,avbrytSøknad:a,søkerInfo:n})=>{const t=$(n.arbeidsforhold),m=W(s,n.arbeidsforhold),{fjernValgtTilretteleggingOgNavigerTilbakeTil:o}=X(),c=b(u(g.TILRETTELEGGINGER_VEDLEGG)),d=b(u(g.OM_BARNET)),p=u(g.UTENLANDSOPPHOLD_SENERE),f=u(g.UTENLANDSOPPHOLD_TIDLIGERE),j=b(u(g.ARBEIDSFORHOLD_OG_INNTEKT)),N=u(g.EGEN_NÆRING),H=u(g.FRILANS),B=Q(n.arbeidsforhold,d.termindato);return e.jsxs(ie,{children:[e.jsx(q,{size:"large",children:e.jsx(l,{id:"søknad.pageheading"})}),e.jsxs(se,{appName:"Svangerskapspenger",stepConfig:t,sendSøknad:i,cancelApplication:a,goToPreviousStep:m.goToPreviousDefaultStep,onContinueLater:m.fortsettSøknadSenere,children:[e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(l,{id:"oppsummering.omBarnet"})}),e.jsx(r.EditLink,{onClick:()=>o(v.BARNET),children:e.jsx(l,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:x(d.termindato)})]}),d.erBarnetFødt&&d.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(l,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:x(d.fødselsdato)})]})]})]}),e.jsx(te,{onVilEndreSvar:()=>o(v.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:f??[],senereUtenlandsopphold:p??[]}),e.jsx(ae,{arbeidsforholdOgInntekt:j,arbeidsforhold:B,onVilEndreSvar:()=>o(v.INNTEKTSINFORMASJON)}),e.jsx(le,{frilans:H,onVilEndreSvar:()=>o(v.FRILANS)}),e.jsx(oe,{egenNæring:N,onVilEndreSvar:()=>o(v.NÆRING)}),e.jsx(M,{onVilEndreSvar:()=>o(v.ARBEID_I_UTLANDET)}),e.jsx(P,{tilretteleggingerVedlegg:c,alleArbeidsforhold:n.arbeidsforhold,onVilEndreSvar:()=>o(v.SKJEMA)}),e.jsx(C,{alleArbeidsforhold:n.arbeidsforhold,onVilEndreSvar:()=>o(v.TILRETTELEGGING)})]})]})};xe.__docgenInfo={description:"",methods:[],displayName:"Oppsummering"};export{xe as O};
