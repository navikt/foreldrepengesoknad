import{j as e,aV as r,M as t,V as B,a9 as H,B as C,p as I,aW as E,aG as k,aX as J,aY as v,aZ as $,o as j,Z as z,d as W,a_ as Z,a$ as X,b0 as Y,b1 as Q,b2 as ee}from"./iframe-CqLsoD9B.js";import{e as d,C as u,S as c,f as A}from"./routes-4Bmah8_o.js";import{l as re,F as x,a as ne,m as R,b as q,e as ie,f as se,i as te,n as ae}from"./useSvpNavigator-B5FCyKRu.js";import{A as le}from"./queries-CzYUnvm3.js";import{L as b}from"./List-DcLBjSJ6.js";import{g as _,a as oe}from"./dateUtils-wgXM9zyH.js";function P({tilretteleggingerVedlegg:n,onVilEndreSvar:s,alleArbeidsforhold:l}){return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.dokumentasjon.tittel"})})}),e.jsx(r.Answers,{children:Object.keys(n).map(i=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(de,{tilretteleggingId:i,alleArbeidsforhold:l})}),e.jsx(r.Value,{children:e.jsx(B,{children:n[i].map(o=>o.uuid?e.jsx(H,{download:o.filename,href:`${le.hentVedlegg(o.uuid)}`,target:"_blank",children:o.filename},o.id):e.jsx(C,{children:o.filename},o.id))})})]},i))}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:s,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})})]})}function de({tilretteleggingId:n,alleArbeidsforhold:s}){const l=I();switch(n){case x:return e.jsx(t,{id:"oppsummering.dokumentasjon.frilanser"});case k:return e.jsx(t,{id:"oppsummering.dokumentasjon.selvstendig"});default:{const i=re(l,n,s);return e.jsx(t,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:E(i)}})}}}P.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilretteleggingerVedlegg:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"}],raw:"Record<string, Attachment[]>"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};function F({onVilEndreSvar:n,alleArbeidsforhold:s}){const l=d(u.FERIE);if(!l)return null;const i=Object.values(l).flatMap(a=>a.feriePerioder),o=[...new Set(i.map(a=>S(a.arbeidsforhold)))];return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"ferie.heading"})})}),e.jsx(r.Answers,{children:o.length>1?e.jsx(ue,{avtaltFerie:i,alleArbeidsforhold:s}):e.jsx(D,{avtaltFerie:i})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})})]})}const D=({avtaltFerie:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"ferie.harDuPlanlagtFerie.label"})}),e.jsx(J,{ja:n.length>0})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"ferie.antallPerioder.label"})}),e.jsx(r.Value,{children:n.length})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.ferie.perioder"})}),e.jsx(r.Value,{children:e.jsx(b,{children:n.map(s=>e.jsxs(b.Item,{children:[v(s.fom)," - ",v(s.tom)]},`${s.fom}-${s.tom}`))})})]})]})]}),ue=({avtaltFerie:n,alleArbeidsforhold:s})=>[...new Set(n.map(i=>S(i.arbeidsforhold)))].map(i=>{const o=n.filter(a=>S(a.arbeidsforhold)===i);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:E(s.find(a=>a.arbeidsgiverId===i)?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:e.jsx(D,{avtaltFerie:o})})})]},i)}),S=n=>{switch(n.type){case"frilanser":return"frilanser";case"selvstendig":return"selvstendig";case"privat":return n.id;case"virksomhet":return n.id}};F.__docgenInfo={description:"",methods:[],displayName:"FerieOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};const G=({onVilEndreSvar:n})=>{const s=d(u.ARBEID_I_UTLANDET),l=I();return s?e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"steps.label.arbeidIUtlandet"})})}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:s.arbeidIUtlandet.length}})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:s.arbeidIUtlandet.map(i=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[i.arbeidsgiverNavn," i ",$(i.land,l.locale)]}),e.jsx(r.Value,{children:e.jsx(t,{id:"JobbetIUtlandetOppsummering.arbeidsforhold.periode",values:{fom:v(i.fom),tom:i.tom?v(i.tom):l.formatMessage({id:"pågående"})}})})]},`${i.arbeidsgiverNavn}-${i.land}`))})})]})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})})]}):null};G.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function O({onVilEndreSvar:n,alleArbeidsforhold:s}){const l=j(d(u.OM_BARNET)),i=_(l);return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.periode.tittel"})})}),e.jsxs(r.Answers,{children:[e.jsx(me,{alleArbeidsforhold:s,sisteDagForSvangerskapspenger:i,termindato:l.termindato}),e.jsx(ge,{sisteDagForSvangerskapspenger:i}),e.jsx(pe,{sisteDagForSvangerskapspenger:i})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(t,{id:"oppsummering.EndreSvar"})})})]})}function me({alleArbeidsforhold:n,sisteDagForSvangerskapspenger:s,termindato:l}){const i=j(d(u.TILRETTELEGGINGER)),o=d(u.TILRETTELEGGINGER_PERIODER),a=Object.keys(i).filter(m=>m!==x&&m!==k);return a?a.map(m=>{const g=i[m],p=o?.[m],f=n.find(T=>T.arbeidsgiverId===m),y=ne(l,m,n),h=p?R(p,s,y):q(g,s,y);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:E(f?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:h.length===1?e.jsx(L,{periode:h[0]}):e.jsx(w,{perioder:h})})})]},m)}):null}function ge({sisteDagForSvangerskapspenger:n}){const s=j(d(u.TILRETTELEGGINGER)),l=d(u.TILRETTELEGGINGER_PERIODER),i=d(u.FRILANS);if(!Object.keys(s).includes(x)||!i)return null;const a=s[x],m=l?.[x],g=[{fom:i.oppstart,stillingsprosent:100}],p=m?R(m,n,g):q(a,n,g);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:a.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:a.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:v(a.behovForTilretteleggingFom)})]}),p.length===1?e.jsx(L,{periode:p[0]}):e.jsx(w,{perioder:p})]})})]})}function pe({sisteDagForSvangerskapspenger:n}){const s=I(),l=j(d(u.TILRETTELEGGINGER)),i=d(u.TILRETTELEGGINGER_PERIODER),o=d(u.EGEN_NÆRING);if(!Object.keys(l).includes(k)||!o)return null;const m=l[k],g=i?.[k],p=[{fom:o.fom,tom:o.tom,stillingsprosent:100}],f=g?R(g,n,p):q(m,n,p);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:m.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:m.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:E(o.navnPåNæringen??s.formatMessage({id:"egenNæring"}).toLowerCase())}})}),e.jsx(r.Value,{children:v(m.behovForTilretteleggingFom)})]}),f.length===1?e.jsx(L,{periode:f[0]}):e.jsx(w,{perioder:f})]})})]})}function L({periode:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(U,{stillingsprosent:n.type==="delvis"?n.stillingsprosent:void 0,tilretteleggingstype:n.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.type==="ingen"&&e.jsx(t,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),n.type==="delvis"&&e.jsx(t,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(V,{periode:n})})]})]})}function w({perioder:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(b,{children:n.map(s=>e.jsxs(b.Item,{children:[e.jsx(V,{periode:s}),":"," ",e.jsx(U,{stillingsprosent:s.type==="delvis"?s.stillingsprosent:void 0,tilretteleggingstype:s.type})]},s.fom))})})]})}function V({periode:n}){const s=j(d(u.OM_BARNET)),l=_(s),i=oe(s);if(z(n.tom).isSame(l,"d")){if(i)return e.jsx(t,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:v(n.fom)}})}else return e.jsx(t,{id:"oppsummering.periode.fraTil",values:{fraDato:v(n.fom),tilDato:v(n.tom)}});return e.jsx(t,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:v(n.fom)}})}function U({tilretteleggingstype:n,stillingsprosent:s}){if(n==="hel")return e.jsx(t,{id:"oppsummering.periode.tilbakeIFullJobb"});if(n==="ingen")return e.jsx(t,{id:"oppsummering.periode.ikkeJobbe"});if(n==="delvis"&&s===void 0)throw new Error("Stillingsprosent ikke satt for delvis tilrettelegging");return e.jsx(t,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:s}})}O.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};const ve=({sendSøknad:n,mellomlagreSøknadOgNaviger:s,avbrytSøknad:l,søkerInfo:i})=>{const o=ie(i.arbeidsforhold),a=se(s,i.arbeidsforhold),m=j(d(u.TILRETTELEGGINGER_VEDLEGG)),g=j(d(u.OM_BARNET)),p=j(d(u.ARBEIDSFORHOLD_OG_INNTEKT)),f=d(u.UTENLANDSOPPHOLD_SENERE),y=d(u.UTENLANDSOPPHOLD_TIDLIGERE),h=d(u.VALGTE_ARBEIDSFORHOLD),T=d(u.EGEN_NÆRING),M=d(u.FRILANS),K=te(i.arbeidsforhold,g.termindato),N=ae(i.arbeidsforhold,g.termindato,p,h);return e.jsx(W,{pageTitle:e.jsx(t,{id:"søknad.pageheading"}),children:e.jsxs(Z,{appName:"Svangerskapspenger",stepConfig:o,sendSøknad:n,onAvsluttOgSlett:l,goToPreviousStep:a.goToPreviousDefaultStep,onFortsettSenere:a.fortsettSøknadSenere,onStepChange:a.goToStep,children:[e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"oppsummering.omBarnet"})})}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:v(g.termindato)})]}),g.erBarnetFødt&&g.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:v(g.fødselsdato)})]})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:()=>a.goToStep(c.BARNET),children:e.jsx(t,{id:"oppsummering.EndreSvar"})})})]}),e.jsx(X,{onVilEndreSvar:()=>a.goToStep(c.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:y??[],senereUtenlandsopphold:f??[]}),e.jsx(Y,{arbeidsforholdOgInntekt:p,arbeidsforhold:K,onVilEndreSvar:()=>a.goToStep(c.ARBEIDSFORHOLD_OG_INNTEKT)}),e.jsx(Q,{frilans:M,onVilEndreSvar:()=>a.goToStep(c.FRILANS)}),e.jsx(ee,{egenNæring:T,onVilEndreSvar:()=>a.goToStep(c.NÆRING)}),e.jsx(G,{onVilEndreSvar:()=>a.goToStep(c.ARBEID_I_UTLANDET)}),e.jsx(P,{tilretteleggingerVedlegg:m,alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(A(c.SKJEMA,N))}),e.jsx(O,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(A(c.TILRETTELEGGING,N))}),e.jsx(F,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(A(c.FERIE,N))})]})})};ve.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    person: PersonDto_fpoversikt;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]",required:!0}},{key:"person",value:{name:"signature",type:"object",raw:`{
    aktørid?: string;
    bankkonto?: Bankkonto_fpoversikt;
    barn: BarnDto_fpoversikt[];
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    målform?: Målform_fpoversikt;
    navn: Navn_fpoversikt;
    sivilstand?: Sivilstand_fpoversikt;
}`,signature:{properties:[{key:"aktørid",value:{name:"string",required:!1}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    banknavn?: string;
    kontonummer?: string;
}`,signature:{properties:[{key:"banknavn",value:{name:"string",required:!1}},{key:"kontonummer",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    annenPart?: AnnenForelderDto_fpoversikt;
    dødsdato?: string;
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]},required:!1}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]}}],raw:"BarnDto_fpoversikt[]",required:!0}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"målform",value:{name:"union",raw:"'NB' | 'NN' | 'EN' | 'E'",elements:[{name:"literal",value:"'NB'"},{name:"literal",value:"'NN'"},{name:"literal",value:"'EN'"},{name:"literal",value:"'E'"}],required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?: SivilstandType_fpoversikt;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""}}};export{ve as O};
