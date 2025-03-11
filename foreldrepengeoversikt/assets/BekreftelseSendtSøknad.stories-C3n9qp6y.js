import{j as u}from"./jsx-runtime-CLpGMVip.js";import{S as t}from"./skjemanummer-DfIZjofp.js";import"./dates-C5Vjd-yy.js";import{D as a}from"./dokumenterUtils-D7dIe_oU.js";import{Y as s}from"./Ytelse-7td-ciMh.js";import{B as S}from"./BekreftelseSendtSøknad-D3oeVZ3E.js";import{M as q}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./api-l2Seuk3V.js";import"./UttaksdagenString-B8Yb1Gis.js";import"./stringUtils-xBoGBqui.js";import"./index-DjWdgH6H.js";import"./links-B36SqOas.js";import"./routes-DFMVI8wI.js";import"./useQuery-D4bRZ7iC.js";import"./File-lmocubeF.js";import"./useId-CID_lvh_.js";import"./Link-C1mNwB7b.js";import"./Label-vuqQZ1tj.js";import"./KontonummerInfo-CX3gHwI7.js";import"./Accordion-DXsYMTU8.js";import"./ChevronDown-CtB47T9y.js";import"./composeEventHandlers-BV8udL3-.js";import"./VStack-BZkCtxmu.js";import"./Button-DEopYVou.js";import"./message-CzTHpKKo.js";import"./Checkmark-DJs5cfYY.js";const he={title:"BekreftelseSendtSøknad",component:S,render:C=>u.jsx(q,{children:u.jsx(S,{...C})})},e={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),tidligstBehandlingsDato:new Date().toISOString(),dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date().toISOString(),saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.FORELDREPENGER,harMinstEttArbeidsforhold:!0}},o={args:{...e.args,harMinstEttArbeidsforhold:!1}},d={args:{...e.args,manglendeVedlegg:[t.HV_ØVELSE,t.NAV_TILTAK],saksnummer:"12345"}},m={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date().toISOString(),saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.FORELDREPENGER,harMinstEttArbeidsforhold:!0}},r={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),tidligstBehandlingsDato:new Date().toISOString(),dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date().toISOString(),saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.ENGANGSSTØNAD,harMinstEttArbeidsforhold:!0}},i={args:{...r.args,manglendeVedlegg:[t.DEPRECATED_TERMINBEKREFTELSE,t.NAV_TILTAK],saksnummer:"12345"}},n={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),tidligstBehandlingsDato:new Date().toISOString(),dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date().toISOString(),saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.SVANGERSKAPSPENGER,harMinstEttArbeidsforhold:!0}},l={args:{...n.args,harMinstEttArbeidsforhold:!1}},p={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",type:a.ARBEIDSGIVER,journalpostId:"1",mottatt:new Date().toISOString(),saksnummer:"1212",tittel:"Søknad",url:"test"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:s.SVANGERSKAPSPENGER,harMinstEttArbeidsforhold:!0}},g={args:{...n.args,manglendeVedlegg:[t.DOK_UTDANNING_MOR,t.TERMINBEKREFTELSE],saksnummer:"12345"}};var k,E,I;e.parameters={...e.parameters,docs:{...(k=e.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      tidligstBehandlingsDato: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date().toISOString(),
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
}`,...(I=(E=e.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var c,D,h;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(h=(D=o.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var R,A,b;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(b=(A=d.parameters)==null?void 0:A.docs)==null?void 0:b.source}}};var T,N,F;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date().toISOString(),
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
}`,...(F=(N=m.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var j,y,O;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      tidligstBehandlingsDato: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date().toISOString(),
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
}`,...(O=(y=r.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var f,v,G;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(G=(v=i.parameters)==null?void 0:v.docs)==null?void 0:G.source}}};var M,V,B;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      tidligstBehandlingsDato: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date().toISOString(),
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
}`,...(B=(V=n.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var w,L,_;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(_=(L=l.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var K,P,U;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        type: DokumentType.ARBEIDSGIVER,
        journalpostId: '1',
        mottatt: new Date().toISOString(),
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
}`,...(U=(P=p.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var Y,x,H;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE],
    saksnummer: '12345'
  }
}`,...(H=(x=g.parameters)==null?void 0:x.docs)==null?void 0:H.source}}};const Re=["ForForeldrepenger","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{r as ForEngangsstønad,i as ForEngangsstønadManglerDokumentasjon,e as ForForeldrepenger,d as ForForeldrepengerManglerDokumentasjon,o as ForForeldrepengerNårEnIkkeHarArbeidsforhold,m as ForForeldrepengerUtenTidligsteBehandlingsdato,n as ForSvangerskapspenger,g as ForSvangerskapspengerManglerDokumentasjon,l as ForSvangerskapspengerUtenArbeidsforhold,p as ForSvangerskapspengerUtenTidligsteBehandlingsdato,Re as __namedExportsOrder,he as default};
