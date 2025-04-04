import{j as e}from"./index-DDg3ir62.js";import{u,C as m,a as j,c as R}from"./routes-BC9Z9msW.js";import{k as K,F as E,l as B,n as S,o as I,T,u as C,a as J,g as z,p as $}from"./useSvpNavigator-FkxZn0Mt.js";import{M as t,V as W,Q,u as L,N as y,P as c,R as X,d as Y,C as Z,H as ee}from"./VeiviserPage-C3BBY14v.js";import{F as r,J as re,O as ne,B as ie,A as se,a as te,S as ae}from"./BoIUtlandetOppsummering-DlhbgsFu.js";import"./index-CR__hKHy.js";import{l as k,E as b,n as h}from"./minMax-CFgVdHHF.js";import{g as F,a as le}from"./dateUtils-SixV03qB.js";function P({tilretteleggingerVedlegg:n,onVilEndreSvar:s,alleArbeidsforhold:l}){return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.dokumentasjon.tittel"})}),e.jsx(r.EditLink,{onClick:s,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:Object.keys(n).map(i=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(de,{tilretteleggingId:i,alleArbeidsforhold:l})}),e.jsx(r.Value,{children:e.jsx(W,{children:n[i].map(o=>e.jsx(Q,{href:o.url,target:"_blank",children:o.filename},o.id))})})]},i))})]})}function de({tilretteleggingId:n,alleArbeidsforhold:s}){const l=L();switch(n){case E:return e.jsx(t,{id:"oppsummering.dokumentasjon.frilanser"});case b:return e.jsx(t,{id:"oppsummering.dokumentasjon.selvstendig"});default:{const i=K(l,n,s);return e.jsx(t,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:k(i)}})}}}P.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilretteleggingerVedlegg:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};function _({onVilEndreSvar:n,alleArbeidsforhold:s}){const l=u(m.FERIE);if(!l)return null;const i=Object.values(l).flatMap(a=>a.feriePerioder),o=[...new Set(i.map(a=>a.arbeidsforhold.id))];return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"ferie.heading"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:o.length>1?e.jsx(oe,{avtaltFerie:i,alleArbeidsforhold:s}):e.jsx(G,{avtaltFerie:i})})]})}const G=({avtaltFerie:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"ferie.harDuPlanlagtFerie.label"})}),e.jsx(re,{ja:n.length>0})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"ferie.antallPerioder.label"})}),e.jsx(r.Value,{children:n.length})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.ferie.perioder"})}),e.jsx(r.Value,{children:e.jsx(y,{children:n.map(s=>e.jsxs(y.Item,{children:[c(s.fom)," - ",c(s.tom)]},`${s.fom}-${s.tom}`))})})]})]})]}),oe=({avtaltFerie:n,alleArbeidsforhold:s})=>[...new Set(n.map(i=>i.arbeidsforhold.id))].map(i=>{var a;const o=n.filter(d=>d.arbeidsforhold.id===i);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:k((a=s.find(d=>d.arbeidsgiverId===i))==null?void 0:a.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:e.jsx(G,{avtaltFerie:o})})})]},i)});_.__docgenInfo={description:"",methods:[],displayName:"FerieOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const O=({onVilEndreSvar:n})=>{const s=u(m.ARBEID_I_UTLANDET),l=L();return s?e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"steps.label.arbeidIUtlandet"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})]}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:s.arbeidIUtlandet.length}})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:s.arbeidIUtlandet.map(i=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[i.arbeidsgiverNavn," i ",X(i.land,l.locale)]}),e.jsx(r.Value,{children:e.jsx(t,{id:"JobbetIUtlandetOppsummering.arbeidsforhold.periode",values:{fom:c(i.fom),tom:i.tom?c(i.tom):l.formatMessage({id:"pågående"})}})})]},`${i.arbeidsgiverNavn}-${i.land}`))})})]})})]}):null};O.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function D({onVilEndreSvar:n,alleArbeidsforhold:s}){const l=h(u(m.OM_BARNET)),i=F(l);return e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.periode.tittel"})}),e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsx(ue,{alleArbeidsforhold:s,sisteDagForSvangerskapspenger:i,termindato:l.termindato}),e.jsx(me,{sisteDagForSvangerskapspenger:i}),e.jsx(ge,{sisteDagForSvangerskapspenger:i})]})]})}function ue({alleArbeidsforhold:n,sisteDagForSvangerskapspenger:s,termindato:l}){const i=h(u(m.TILRETTELEGGINGER)),o=u(m.TILRETTELEGGINGER_PERIODER),a=Object.keys(i).filter(d=>d!==E&&d!==b);return a?a.map(d=>{const g=i[d],p=o==null?void 0:o[d],v=n.find(A=>A.arbeidsgiverId===d),f=B(l,d,n),x=p?S(p,s,f):I(g,s,f);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:k(v==null?void 0:v.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:x.length===1?e.jsx(q,{periode:x[0]}):e.jsx(w,{perioder:x})})})]},d)}):null}function me({sisteDagForSvangerskapspenger:n}){const s=h(u(m.TILRETTELEGGINGER)),l=u(m.TILRETTELEGGINGER_PERIODER),i=u(m.FRILANS);if(!Object.keys(s).some(v=>v===E)||!i)return null;const a=s[E],d=l==null?void 0:l[E],g=[{fom:i.oppstart,stillingsprosent:100}],p=d?S(d,n,g):I(a,n,g);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:a.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:a.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:c(a.behovForTilretteleggingFom)})]}),p.length===1?e.jsx(q,{periode:p[0]}):e.jsx(w,{perioder:p})]})})]})}function ge({sisteDagForSvangerskapspenger:n}){const s=L(),l=h(u(m.TILRETTELEGGINGER)),i=u(m.TILRETTELEGGINGER_PERIODER),o=u(m.EGEN_NÆRING);if(!Object.keys(l).some(f=>f===b)||!o)return null;const d=l[b],g=i==null?void 0:i[b],p=[{fom:o.fom,tom:o.tom,stillingsprosent:100}],v=g?S(g,n,p):I(d,n,p);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:d.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:d.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:k(o.navnPåNæringen??s.formatMessage({id:"egenNæring"}).toLowerCase())}})}),e.jsx(r.Value,{children:c(d.behovForTilretteleggingFom)})]}),v.length===1?e.jsx(q,{periode:v[0]}):e.jsx(w,{perioder:v})]})})]})}function q({periode:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(M,{stillingsprosent:n.stillingsprosent,tilretteleggingstype:n.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.type===T.INGEN&&e.jsx(t,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),n.type===T.DELVIS&&e.jsx(t,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(V,{periode:n})})]})]})}function w({perioder:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(y,{children:n.map(s=>e.jsxs(y.Item,{children:[e.jsx(V,{periode:s}),":"," ",e.jsx(M,{stillingsprosent:s.stillingsprosent,tilretteleggingstype:s.type})]},s.fom))})})]})}function V({periode:n}){const s=h(u(m.OM_BARNET)),l=F(s),i=le(s);if(Y(n.tom).isSame(l,"d")){if(i)return e.jsx(t,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:c(n.fom)}})}else return e.jsx(t,{id:"oppsummering.periode.fraTil",values:{fraDato:c(n.fom),tilDato:c(n.tom)}});return e.jsx(t,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:c(n.fom)}})}function M({tilretteleggingstype:n,stillingsprosent:s}){if(n===T.HEL)return e.jsx(t,{id:"oppsummering.periode.tilbakeIFullJobb"});if(n===T.INGEN)return e.jsx(t,{id:"oppsummering.periode.ikkeJobbe"});if(n===T.DELVIS&&s===void 0)throw new Error("Stillingsprosent ikke satt for delvis tilrettelegging");return e.jsx(t,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:s}})}D.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const pe=({sendSøknad:n,mellomlagreSøknadOgNaviger:s,avbrytSøknad:l,søkerInfo:i})=>{const o=C(i.arbeidsforhold),a=J(s,i.arbeidsforhold),d=h(u(m.TILRETTELEGGINGER_VEDLEGG)),g=h(u(m.OM_BARNET)),p=h(u(m.ARBEIDSFORHOLD_OG_INNTEKT)),v=u(m.UTENLANDSOPPHOLD_SENERE),f=u(m.UTENLANDSOPPHOLD_TIDLIGERE),x=u(m.VALGTE_ARBEIDSFORHOLD),A=u(m.EGEN_NÆRING),U=u(m.FRILANS),H=z(i.arbeidsforhold,g.termindato),N=$(i.arbeidsforhold,g.termindato,p,x);return e.jsxs(Z,{children:[e.jsx(ee,{size:"large",children:e.jsx(t,{id:"søknad.pageheading"})}),e.jsxs(ne,{appName:"Svangerskapspenger",stepConfig:o,sendSøknad:n,cancelApplication:l,goToPreviousStep:a.goToPreviousDefaultStep,onContinueLater:a.fortsettSøknadSenere,onStepChange:a.goToStep,children:[e.jsxs(r,{children:[e.jsxs(r.Header,{children:[e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.omBarnet"})}),e.jsx(r.EditLink,{onClick:()=>a.goToStep(j.BARNET),children:e.jsx(t,{id:"oppsummering.EndreSvar"})})]}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:c(g.termindato)})]}),g.erBarnetFødt&&g.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:c(g.fødselsdato)})]})]})]}),e.jsx(ie,{onVilEndreSvar:()=>a.goToStep(j.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:f??[],senereUtenlandsopphold:v??[]}),e.jsx(se,{arbeidsforholdOgInntekt:p,arbeidsforhold:H,onVilEndreSvar:()=>a.goToStep(j.ARBEIDSFORHOLD_OG_INNTEKT)}),e.jsx(te,{frilans:U,onVilEndreSvar:()=>a.goToStep(j.FRILANS)}),e.jsx(ae,{egenNæring:A,onVilEndreSvar:()=>a.goToStep(j.NÆRING)}),e.jsx(O,{onVilEndreSvar:()=>a.goToStep(j.ARBEID_I_UTLANDET)}),e.jsx(P,{tilretteleggingerVedlegg:d,alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(R(j.SKJEMA,N))}),e.jsx(D,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(R(j.TILRETTELEGGING,N))}),e.jsx(_,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(R(j.FERIE,N))})]})]})};pe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: 'M' | 'K';
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: string;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]",required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?:
        | 'UOPPGITT'
        | 'UGIFT'
        | 'GIFT'
        | 'ENKE_ELLER_ENKEMANN'
        | 'SKILT'
        | 'SEPARERT'
        | 'REGISTRERT_PARTNER'
        | 'SEPARERT_PARTNER'
        | 'SKILT_PARTNER'
        | 'GJENLEVENDE_PARTNER';
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""}}};export{pe as O};
