import{j as e,aV as r,M as s,V as B,a9 as H,B as C,p as I,aW as T,aG as f,aX as J,aY as v,aZ as $,o as j,Z as z,d as W,a_ as Z,a$ as X,b0 as Y,b1 as Q,b2 as ee}from"./iframe-Wt6Th-Uj.js";import{e as o,C as u,S as c,f as N}from"./routes-BrX1-9YX.js";import{l as re,F as b,a as ne,m as q,b as w,e as ie,f as te,i as se,n as ae}from"./useSvpNavigator-BC9jzFXE.js";import{A as le}from"./queries-X1f9_7CU.js";import{L as k}from"./List-CQLSsDxU.js";import{g as F,a as de}from"./dateUtils-4xdEmi5A.js";function P({tilretteleggingerVedlegg:n,onVilEndreSvar:t,alleArbeidsforhold:l}){return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.dokumentasjon.tittel"})})}),e.jsx(r.Answers,{children:Object.keys(n).map(i=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(oe,{tilretteleggingId:i,alleArbeidsforhold:l})}),e.jsx(r.Value,{children:e.jsx(B,{children:n[i].map(d=>d.uuid?e.jsx(H,{download:d.filename,href:`${le.hentVedlegg(d.uuid)}`,target:"_blank",children:d.filename},d.id):e.jsx(C,{children:d.filename},d.id))})})]},i))}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:t,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}function oe({tilretteleggingId:n,alleArbeidsforhold:t}){const l=I();switch(n){case b:return e.jsx(s,{id:"oppsummering.dokumentasjon.frilanser"});case f:return e.jsx(s,{id:"oppsummering.dokumentasjon.selvstendig"});default:{const i=re(l,n,t);return e.jsx(s,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:T(i)}})}}}P.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilretteleggingerVedlegg:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"}],raw:"Record<string, Attachment[]>"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};function D({onVilEndreSvar:n,alleArbeidsforhold:t}){const l=o(u.FERIE);if(!l)return null;const i=Object.values(l).flatMap(a=>a.feriePerioder),d=[...new Set(i.map(a=>S(a.arbeidsforhold)))];return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"ferie.heading"})})}),e.jsx(r.Answers,{children:d.length>1?e.jsx(ue,{avtaltFerie:i,alleArbeidsforhold:t}):e.jsx(G,{avtaltFerie:i})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}const G=({avtaltFerie:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"ferie.harDuPlanlagtFerie.label"})}),e.jsx(J,{ja:n.length>0})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"ferie.antallPerioder.label"})}),e.jsx(r.Value,{children:n.length})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.ferie.perioder"})}),e.jsx(r.Value,{children:e.jsx(k,{children:n.map(t=>e.jsxs(k.Item,{children:[v(t.fom)," - ",v(t.tom)]},`${t.fom}-${t.tom}`))})})]})]})]}),ue=({avtaltFerie:n,alleArbeidsforhold:t})=>[...new Set(n.map(i=>S(i.arbeidsforhold)))].map(i=>{const d=n.filter(a=>S(a.arbeidsforhold)===i);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:T(t.find(a=>a.arbeidsgiverId===i)?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:e.jsx(G,{avtaltFerie:d})})})]},i)}),S=n=>{switch(n.type){case"frilanser":return"frilanser";case"selvstendig":return"selvstendig";case"privat":return n.id;case"virksomhet":return n.id}};D.__docgenInfo={description:"",methods:[],displayName:"FerieOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const O=({onVilEndreSvar:n})=>{const t=o(u.ARBEID_I_UTLANDET),l=I();return t?e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.arbeidIUtlandet"})})}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:t.arbeidIUtlandet.length}})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:t.arbeidIUtlandet.map(i=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[i.arbeidsgiverNavn," i ",$(i.land,l.locale)]}),e.jsx(r.Value,{children:e.jsx(s,{id:"JobbetIUtlandetOppsummering.arbeidsforhold.periode",values:{fom:v(i.fom),tom:i.tom?v(i.tom):l.formatMessage({id:"pågående"})}})})]},`${i.arbeidsgiverNavn}-${i.land}`))})})]})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]}):null};O.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function _({onVilEndreSvar:n,alleArbeidsforhold:t}){const l=j(o(u.OM_BARNET)),i=F(l);return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.periode.tittel"})})}),e.jsxs(r.Answers,{children:[e.jsx(me,{alleArbeidsforhold:t,sisteDagForSvangerskapspenger:i,termindato:l.termindato}),e.jsx(ge,{sisteDagForSvangerskapspenger:i}),e.jsx(pe,{sisteDagForSvangerskapspenger:i})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}function me({alleArbeidsforhold:n,sisteDagForSvangerskapspenger:t,termindato:l}){const i=j(o(u.TILRETTELEGGINGER)),d=o(u.TILRETTELEGGINGER_PERIODER),a=Object.keys(i).filter(m=>m!==b&&m!==f);return a?a.map(m=>{const g=i[m],p=d?.[m],y=n.find(E=>E.arbeidsgiverId===m),x=ne(l,m,n),h=p?q(p,t,x):w(g,t,x);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:T(y?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:h.length===1?e.jsx(R,{periode:h[0]}):e.jsx(L,{perioder:h})})})]},m)}):null}function ge({sisteDagForSvangerskapspenger:n}){const t=j(o(u.TILRETTELEGGINGER)),l=o(u.TILRETTELEGGINGER_PERIODER),i=o(u.FRILANS);if(!Object.keys(t).includes(b)||!i)return null;const a=t[b],m=l?.[b],g=[{fom:i.oppstart,stillingsprosent:100}],p=m?q(m,n,g):w(a,n,g);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:a.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:a.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:v(a.behovForTilretteleggingFom)})]}),p.length===1?e.jsx(R,{periode:p[0]}):e.jsx(L,{perioder:p})]})})]})}function pe({sisteDagForSvangerskapspenger:n}){const t=I(),l=j(o(u.TILRETTELEGGINGER)),i=o(u.TILRETTELEGGINGER_PERIODER),d=o(u.EGEN_NÆRING);if(!Object.keys(l).includes(f)||!d)return null;const m=l[f],g=i?.[f],p=[{fom:d.fom,tom:d.tom,stillingsprosent:100}],y=g?q(g,n,p):w(m,n,p);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:m.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:m.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:T(d.navnPåNæringen??t.formatMessage({id:"egenNæring"}).toLowerCase())}})}),e.jsx(r.Value,{children:v(m.behovForTilretteleggingFom)})]}),y.length===1?e.jsx(R,{periode:y[0]}):e.jsx(L,{perioder:y})]})})]})}function R({periode:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(U,{stillingsprosent:n.type==="delvis"?n.stillingsprosent:void 0,tilretteleggingstype:n.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.type==="ingen"&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),n.type==="delvis"&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(V,{periode:n})})]})]})}function L({perioder:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(k,{children:n.map(t=>e.jsxs(k.Item,{children:[e.jsx(V,{periode:t}),":"," ",e.jsx(U,{stillingsprosent:t.type==="delvis"?t.stillingsprosent:void 0,tilretteleggingstype:t.type})]},t.fom))})})]})}function V({periode:n}){const t=j(o(u.OM_BARNET)),l=F(t),i=de(t);if(z(n.tom).isSame(l,"d")){if(i)return e.jsx(s,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:v(n.fom)}})}else return e.jsx(s,{id:"oppsummering.periode.fraTil",values:{fraDato:v(n.fom),tilDato:v(n.tom)}});return e.jsx(s,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:v(n.fom)}})}function U({tilretteleggingstype:n,stillingsprosent:t}){if(n==="hel")return e.jsx(s,{id:"oppsummering.periode.tilbakeIFullJobb"});if(n==="ingen")return e.jsx(s,{id:"oppsummering.periode.ikkeJobbe"});if(n==="delvis"&&t===void 0)throw new Error("Stillingsprosent ikke satt for delvis tilrettelegging");return e.jsx(s,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:t}})}_.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const ve=({sendSøknad:n,mellomlagreSøknadOgNaviger:t,avbrytSøknad:l,søkerInfo:i})=>{const d=ie(i.arbeidsforhold),a=te(t,i.arbeidsforhold),m=j(o(u.TILRETTELEGGINGER_VEDLEGG)),g=j(o(u.OM_BARNET)),p=j(o(u.ARBEIDSFORHOLD_OG_INNTEKT)),y=o(u.UTENLANDSOPPHOLD_SENERE),x=o(u.UTENLANDSOPPHOLD_TIDLIGERE),h=o(u.VALGTE_ARBEIDSFORHOLD),E=o(u.EGEN_NÆRING),M=o(u.FRILANS),K=se(i.arbeidsforhold,g.termindato),A=ae(i.arbeidsforhold,g.termindato,p,h);return e.jsx(W,{pageTitle:e.jsx(s,{id:"søknad.pageheading"}),children:e.jsxs(Z,{appName:"Svangerskapspenger",stepConfig:d,sendSøknad:n,onAvsluttOgSlett:l,goToPreviousStep:a.goToPreviousDefaultStep,onFortsettSenere:a.fortsettSøknadSenere,onStepChange:a.goToStep,children:[e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.omBarnet"})})}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:v(g.termindato)})]}),g.erBarnetFødt&&g.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:v(g.fødselsdato)})]})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:()=>a.goToStep(c.BARNET),children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]}),e.jsx(X,{onVilEndreSvar:()=>a.goToStep(c.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:x??[],senereUtenlandsopphold:y??[]}),e.jsx(Y,{arbeidsforholdOgInntekt:p,arbeidsforhold:K,onVilEndreSvar:()=>a.goToStep(c.ARBEIDSFORHOLD_OG_INNTEKT)}),e.jsx(Q,{frilans:M,onVilEndreSvar:()=>a.goToStep(c.FRILANS)}),e.jsx(ee,{egenNæring:E,onVilEndreSvar:()=>a.goToStep(c.NÆRING)}),e.jsx(O,{onVilEndreSvar:()=>a.goToStep(c.ARBEID_I_UTLANDET)}),e.jsx(P,{tilretteleggingerVedlegg:m,alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.SKJEMA,A))}),e.jsx(_,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.TILRETTELEGGING,A))}),e.jsx(D,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.FERIE,A))})]})})};ve.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]",required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?: SivilstandType;
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""}}};export{ve as O};
