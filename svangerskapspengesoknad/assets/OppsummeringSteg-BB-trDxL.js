import{j as e,aY as r,M as s,V as C,ac as J,B as $,t as S,aZ as b,aJ as T,a_ as Y,a$ as v,b0 as z,q as j,a0 as W,d as Z,b1 as Q,b2 as X,b3 as ee,b4 as re,b5 as ne}from"./iframe-CxiLTVmp.js";import{e as d,C as u,S as c,f as N}from"./routes-DRrSwzjD.js";import{l as ie,F as h,a as te,m as R,b as I,e as se,f as ae,i as le,n as oe}from"./useSvpNavigator-RJjKfzWX.js";import{A as de}from"./queries-CwaxAKxh.js";import{L as x}from"./List-BSuGekKq.js";import{g as w,a as ue}from"./dateUtils-DV9gAVay.js";function O({tilretteleggingerVedlegg:n,onVilEndreSvar:t,alleArbeidsforhold:l}){return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.dokumentasjon.tittel"})})}),e.jsx(r.Answers,{children:Object.keys(n).map(i=>e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(me,{tilretteleggingId:i,alleArbeidsforhold:l})}),e.jsx(r.Value,{children:e.jsx(C,{children:n[i].map(o=>o.uuid?e.jsx(J,{download:o.filename,href:`${de.hentVedlegg(o.uuid)}`,target:"_blank",children:o.filename},o.id):e.jsx($,{children:o.filename},o.id))})})]},i))}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:t,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}function me({tilretteleggingId:n,alleArbeidsforhold:t}){const l=S();switch(n){case h:return e.jsx(s,{id:"oppsummering.dokumentasjon.frilanser"});case T:return e.jsx(s,{id:"oppsummering.dokumentasjon.selvstendig"});default:{const i=ie(l,n,t);return e.jsx(s,{id:"oppsummering.dokumentasjon.virksomhet",values:{arbeidsforholdNavn:b(i)}})}}}O.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{tilretteleggingerVedlegg:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    error?: AttachmentError;
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"}],raw:"Record<string, Attachment[]>"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    fom: string;
    stillingsprosent: number;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};function P({onVilEndreSvar:n,alleArbeidsforhold:t}){const l=d(u.FERIE);if(!l)return null;const i=Object.values(l).flatMap(a=>a.feriePerioder),o=[...new Set(i.map(a=>L(a.arbeidsforhold)))];return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"ferie.heading"})})}),e.jsx(r.Answers,{children:o.length>1?e.jsx(ge,{avtaltFerie:i,alleArbeidsforhold:t}):e.jsx(D,{avtaltFerie:i})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}const D=({avtaltFerie:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"ferie.harDuPlanlagtFerie.label"})}),e.jsx(Y,{ja:n.length>0})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"ferie.antallPerioder.label"})}),e.jsx(r.Value,{children:n.length})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.ferie.perioder"})}),e.jsx(r.Value,{children:e.jsx(x,{children:n.map(t=>e.jsxs(x.Item,{children:[v(t.fom)," - ",v(t.tom)]},`${t.fom}-${t.tom}`))})})]})]})]}),ge=({avtaltFerie:n,alleArbeidsforhold:t})=>[...new Set(n.map(i=>L(i.arbeidsforhold)))].map(i=>{const o=n.filter(a=>L(a.arbeidsforhold)===i);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:b(t.find(a=>a.arbeidsgiverId===i)?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:e.jsx(D,{avtaltFerie:o})})})]},i)}),L=n=>{switch(n.type){case"frilanser":return"frilanser";case"selvstendig":return"selvstendig";case"privat":return n.id;case"virksomhet":return n.id}};P.__docgenInfo={description:"",methods:[],displayName:"FerieOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    fom: string;
    stillingsprosent: number;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};const F=({onVilEndreSvar:n})=>{const t=d(u.ARBEID_I_UTLANDET),l=S();return t?e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"steps.label.arbeidIUtlandet"})})}),e.jsx(r.Answers,{children:e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.arbeidIUtlandet.tittel",values:{antall:t.arbeidIUtlandet.length}})}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:t.arbeidIUtlandet.map(i=>e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[i.arbeidsgiverNavn," i ",z(i.land,l.locale)]}),e.jsx(r.Value,{children:e.jsx(s,{id:"JobbetIUtlandetOppsummering.arbeidsforhold.periode",values:{fom:v(i.fom),tom:i.tom?v(i.tom):l.formatMessage({id:"pågående"})}})})]},`${i.arbeidsgiverNavn}-${i.land}`))})})]})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]}):null};F.__docgenInfo={description:"",methods:[],displayName:"JobbetIUtlandetOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function V({onVilEndreSvar:n,alleArbeidsforhold:t}){const l=j(d(u.OM_BARNET)),i=w(l);return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.periode.tittel"})})}),e.jsxs(r.Answers,{children:[e.jsx(pe,{alleArbeidsforhold:t,sisteDagForSvangerskapspenger:i,termindato:l.termindato}),e.jsx(ve,{sisteDagForSvangerskapspenger:i}),e.jsx(ce,{sisteDagForSvangerskapspenger:i})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:n,children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]})}function pe({alleArbeidsforhold:n,sisteDagForSvangerskapspenger:t,termindato:l}){const i=j(d(u.TILRETTELEGGINGER)),o=d(u.TILRETTELEGGINGER_PERIODER),a=Object.keys(i).filter(m=>m!==h&&m!==T);return a?a.map(m=>{const g=i[m],p=o?.[m],E=n.find(y=>y.arbeidsgiverId===m),k=te(l,m,n),f=p?R(p,t,k):I(g,t,k);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:b(E?.arbeidsgiverNavn)}),e.jsx(r.Value,{children:e.jsx(r.Answers,{children:f.length===1?e.jsx(_,{periode:f[0]}):e.jsx(G,{perioder:f})})})]},m)}):null}function ve({sisteDagForSvangerskapspenger:n}){const t=j(d(u.TILRETTELEGGINGER)),l=d(u.TILRETTELEGGINGER_PERIODER),i=d(u.FRILANS);if(!Object.keys(t).includes(h)||!i)return null;const a=t[h],m=l?.[h],g=[{fom:i.oppstart,stillingsprosent:100}],p=m?R(m,n,g):I(a,n,g);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.frilans"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.frilanser"})}),e.jsx(r.Value,{children:a.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:a.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"})}),e.jsx(r.Value,{children:v(a.behovForTilretteleggingFom)})]}),p.length===1?e.jsx(_,{periode:p[0]}):e.jsx(G,{perioder:p})]})})]})}function ce({sisteDagForSvangerskapspenger:n}){const t=S(),l=j(d(u.TILRETTELEGGINGER)),i=d(u.TILRETTELEGGINGER_PERIODER),o=d(u.EGEN_NÆRING);if(!Object.keys(l).includes(T)||!o)return null;const m=l[T],g=i?.[T],p=[{fom:o.fom,tom:o.tom,stillingsprosent:100}],E=g?R(g,n,p):I(m,n,p);return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"steps.label.næring"})}),e.jsx(r.Value,{children:e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"skjema.risikofaktorer.selvstendig"})}),e.jsx(r.Value,{children:m.risikofaktorer})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilretteleggingstiltak.label"})}),e.jsx(r.Value,{children:m.tilretteleggingstiltak})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidFom.label.flere",values:{navnArbeidsgiver:b(o.navnPåNæringen??t.formatMessage({id:"egenNæring"}).toLowerCase())}})}),e.jsx(r.Value,{children:v(m.behovForTilretteleggingFom)})]}),E.length===1?e.jsx(_,{periode:E[0]}):e.jsx(G,{perioder:E})]})})]})}function _({periode:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"tilrettelegging.tilrettelagtArbeidType.label.en"})}),e.jsx(r.Value,{children:e.jsx(U,{stillingsprosent:n.type==="delvis"?n.stillingsprosent:void 0,tilretteleggingstype:n.type})})]}),e.jsxs(r.Answer,{children:[e.jsxs(r.Label,{children:[n.type==="ingen"&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),n.type==="delvis"&&e.jsx(s,{id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"})]}),e.jsx(r.Value,{children:e.jsx(M,{periode:n})})]})]})}function G({perioder:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"oppsummering.periode.tittel"})}),e.jsx(r.Value,{children:e.jsx(x,{children:n.map(t=>e.jsxs(x.Item,{children:[e.jsx(M,{periode:t}),":"," ",e.jsx(U,{stillingsprosent:t.type==="delvis"?t.stillingsprosent:void 0,tilretteleggingstype:t.type})]},t.fom))})})]})}function M({periode:n}){const t=j(d(u.OM_BARNET)),l=w(t),i=ue(t);if(W(n.tom).isSame(l,"d")){if(i)return e.jsx(s,{id:"oppsummering.periode.fremTilTreUkerFørTermin",values:{fraDato:v(n.fom)}})}else return e.jsx(s,{id:"oppsummering.periode.fraTil",values:{fraDato:v(n.fom),tilDato:v(n.tom)}});return e.jsx(s,{id:"oppsummering.periode.fremTilFødsel",values:{fraDato:v(n.fom)}})}function U({tilretteleggingstype:n,stillingsprosent:t}){if(n==="hel")return e.jsx(s,{id:"oppsummering.periode.tilbakeIFullJobb"});if(n==="ingen")return e.jsx(s,{id:"oppsummering.periode.ikkeJobbe"});if(n==="delvis"&&t===void 0)throw new Error("Stillingsprosent ikke satt for delvis tilrettelegging");return e.jsx(s,{id:"oppsummering.periode.stillingsprosent",values:{stillingsprosent:t}})}V.__docgenInfo={description:"",methods:[],displayName:"PerioderOppsummering",props:{onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},alleArbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    fom: string;
    stillingsprosent: number;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""}}};const je=({sendSøknad:n,mellomlagreSøknadOgNaviger:t,avbrytSøknad:l,søkerInfo:i})=>{const o=se(i.arbeidsforhold),a=ae(t,i.arbeidsforhold),m=j(d(u.TILRETTELEGGINGER_VEDLEGG)),g=j(d(u.OM_BARNET)),p=j(d(u.ARBEIDSFORHOLD_OG_INNTEKT)),E=d(u.UTENLANDSOPPHOLD_SENERE),k=d(u.UTENLANDSOPPHOLD_TIDLIGERE),f=d(u.VALGTE_ARBEIDSFORHOLD),y=d(u.EGEN_NÆRING),K=d(u.FRILANS),q=le(i.arbeidsforhold,g.termindato),B=q.some(H=>f?.includes(H.arbeidsgiverId)),A=oe(i.arbeidsforhold,g.termindato,p,f);return e.jsx(Z,{pageTitle:e.jsx(s,{id:"søknad.pageheading"}),children:e.jsxs(Q,{appName:"Svangerskapspenger",stepConfig:o,sendSøknad:n,onAvsluttOgSlett:l,goToPreviousStep:a.goToPreviousDefaultStep,onFortsettSenere:a.fortsettSøknadSenere,onStepChange:a.goToStep,children:[e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(s,{id:"oppsummering.omBarnet"})})}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.termindato"})}),e.jsx(r.Value,{children:v(g.termindato)})]}),g.erBarnetFødt&&g.fødselsdato&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(s,{id:"barnet.fødselsdato"})}),e.jsx(r.Value,{children:v(g.fødselsdato)})]})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:()=>a.goToStep(c.BARNET),children:e.jsx(s,{id:"oppsummering.EndreSvar"})})})]}),e.jsx(X,{onVilEndreSvar:()=>a.goToStep(c.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:k??[],senereUtenlandsopphold:E??[]}),e.jsx(ee,{skalViseAlertOmIM:B,arbeidsforholdOgInntekt:p,arbeidsforhold:q,onVilEndreSvar:()=>a.goToStep(c.ARBEIDSFORHOLD_OG_INNTEKT)}),e.jsx(re,{frilans:K,onVilEndreSvar:()=>a.goToStep(c.FRILANS)}),e.jsx(ne,{egenNæring:y,onVilEndreSvar:()=>a.goToStep(c.NÆRING)}),e.jsx(F,{onVilEndreSvar:()=>a.goToStep(c.ARBEID_I_UTLANDET)}),e.jsx(O,{tilretteleggingerVedlegg:m,alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.SKJEMA,A))}),e.jsx(V,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.TILRETTELEGGING,A))}),e.jsx(P,{alleArbeidsforhold:i.arbeidsforhold,onVilEndreSvar:()=>a.goToStep(N(c.FERIE,A))})]})})};je.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    person: PersonDto_fpoversikt;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    fom: string;
    stillingsprosent: number;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]",required:!0}},{key:"person",value:{name:"signature",type:"object",raw:`{
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
    navn?: Navn_fpoversikt;
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
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""}}};export{je as O};
