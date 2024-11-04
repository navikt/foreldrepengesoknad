import{j as k}from"./jsx-runtime-Cw0GR0a5.js";import{S as r}from"./skjemanummer-CsrY1khI.js";import"./dates-JCHAmx_r.js";import{D as a}from"./dokumenterUtils-CxImUWLB.js";import{Y as s}from"./Ytelse-7td-ciMh.js";import{B as g}from"./BekreftelseSendtSøknad-BUECh3qv.js";import{M as q}from"./index-qfvvJAWu.js";import"./index-CTjT7uj6.js";import"./api-CHgiDyvl.js";import"./UttaksdagenString-DBxOpWvb.js";import"./index-CCQ3W5xA.js";import"./stringUtils-BhrNUKGk.js";import"./index-BXq8hJNt.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./links-XBeNlE0K.js";import"./useQuery-D15qCwmj.js";import"./bemUtils-DmNyTjfb.js";import"./routes-D6j-qr5i.js";import"./File-CBdzl0Ak.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Link-gwHVuC8x.js";import"./Label-BeJqMiuK.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./composeEventHandlers-DeH74NdU.js";import"./VStack-Cmqt2b2v.js";import"./Button-Cz42euBq.js";import"./message-DyNkxP6Y.js";const be={title:"BekreftelseSendtSøknad",component:g,render:C=>k.jsx(q,{children:k.jsx(g,{...C})})},e={args:{relevantNyTidslinjehendelse:{opprettet:new Date,tidligstBehandlingsDato:new Date,dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date,saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.FORELDREPENGER,harMinstEttArbeidsforhold:!0}},o={args:{...e.args,harMinstEttArbeidsforhold:!1}},d={args:{...e.args,manglendeVedlegg:[r.HV_ØVELSE,r.NAV_TILTAK],saksnummer:"12345"}},m={args:{relevantNyTidslinjehendelse:{opprettet:new Date,dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date,saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.FORELDREPENGER,harMinstEttArbeidsforhold:!0}},t={args:{relevantNyTidslinjehendelse:{opprettet:new Date,tidligstBehandlingsDato:new Date,dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date,saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.ENGANGSSTØNAD,harMinstEttArbeidsforhold:!0}},l={args:{...t.args,manglendeVedlegg:[r.DEPRECATED_TERMINBEKREFTELSE,r.NAV_TILTAK],saksnummer:"12345"}},n={args:{relevantNyTidslinjehendelse:{opprettet:new Date,tidligstBehandlingsDato:new Date,dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date,saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.SVANGERSKAPSPENGER,harMinstEttArbeidsforhold:!0}},p={args:{...n.args,harMinstEttArbeidsforhold:!1}},i={args:{relevantNyTidslinjehendelse:{opprettet:new Date,dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date,saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.SVANGERSKAPSPENGER,harMinstEttArbeidsforhold:!0}},u={args:{...n.args,manglendeVedlegg:[r.DOK_UTDANNING_MOR,r.TERMINBEKREFTELSE],saksnummer:"12345"}};var E,S,c;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date(),
      tidligstBehandlingsDato: new Date(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date(),
        saksnummer: '1212',
        tittel: 'Søknad',
        url: 'test'
      }]
    } as Tidslinjehendelse,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: Ytelse.FORELDREPENGER,
    harMinstEttArbeidsforhold: true
  }
}`,...(c=(S=e.parameters)==null?void 0:S.docs)==null?void 0:c.source}}};var D,h,R;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(R=(h=o.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};var A,I,b;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(b=(I=d.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var T,N,F;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date(),
        saksnummer: '1212',
        tittel: 'Søknad',
        url: 'test'
      }]
    } as Tidslinjehendelse,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: Ytelse.FORELDREPENGER,
    harMinstEttArbeidsforhold: true
  }
}`,...(F=(N=m.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var j,y,f;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date(),
      tidligstBehandlingsDato: new Date(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date(),
        saksnummer: '1212',
        tittel: 'Søknad',
        url: 'test'
      }]
    } as Tidslinjehendelse,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: Ytelse.ENGANGSSTØNAD,
    harMinstEttArbeidsforhold: true
  }
}`,...(f=(y=t.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var v,G,M;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(M=(G=l.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var V,B,w;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date(),
      tidligstBehandlingsDato: new Date(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date(),
        saksnummer: '1212',
        tittel: 'Søknad',
        url: 'test'
      }]
    } as Tidslinjehendelse,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: Ytelse.SVANGERSKAPSPENGER,
    harMinstEttArbeidsforhold: true
  }
}`,...(w=(B=n.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var L,_,K;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(K=(_=p.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var P,O,U;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date(),
        saksnummer: '1212',
        tittel: 'Søknad',
        url: 'test'
      }]
    } as Tidslinjehendelse,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: Ytelse.SVANGERSKAPSPENGER,
    harMinstEttArbeidsforhold: true
  }
}`,...(U=(O=i.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var Y,x,H;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE],
    saksnummer: '12345'
  }
}`,...(H=(x=u.parameters)==null?void 0:x.docs)==null?void 0:H.source}}};const Te=["ForForeldrepenger","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{t as ForEngangsstønad,l as ForEngangsstønadManglerDokumentasjon,e as ForForeldrepenger,d as ForForeldrepengerManglerDokumentasjon,o as ForForeldrepengerNårEnIkkeHarArbeidsforhold,m as ForForeldrepengerUtenTidligsteBehandlingsdato,n as ForSvangerskapspenger,u as ForSvangerskapspengerManglerDokumentasjon,p as ForSvangerskapspengerUtenArbeidsforhold,i as ForSvangerskapspengerUtenTidligsteBehandlingsdato,Te as __namedExportsOrder,be as default};
