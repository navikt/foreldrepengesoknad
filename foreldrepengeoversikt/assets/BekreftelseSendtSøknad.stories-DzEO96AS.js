import{j as p}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./List-whWw6Hq_.js";import"./dates-efjv5HSM.js";import{B as k}from"./BekreftelseSendtSøknad-CGLeRj7F.js";import{M as C}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./index-DQLiH3RP.js";import"./Label-DalfrUzn.js";import"./index-ClyUrrHr.js";import"./links-CxU1E266.js";import"./UttaksdagenString-DRcuPL2E.js";import"./routes-C7yRzVAD.js";import"./useQuery-Km81jHJP.js";import"./QueryClientProvider-DTI5uWLr.js";import"./api-By2d6bGs.js";import"./stringUtils-DGs1tyYX.js";import"./dokumenterUtils-DF5bl9zu.js";import"./File-Do6CElhQ.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./KontonummerInfo-CIesi5MU.js";import"./Accordion-C2gXj9Z6.js";import"./useId-B11Gq5wf.js";import"./ChevronDown-w7HrHItv.js";import"./composeEventHandlers-DeH74NdU.js";import"./VStack-C9FgvL9l.js";import"./Button-D10r1vdM.js";import"./message-DohILNTk.js";import"./Checkmark-BSY2UjC4.js";const Ne={title:"BekreftelseSendtSøknad",component:k,render:x=>p.jsx(C,{children:p.jsx(k,{...x})})},e={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0}},s={args:{...e.args,harMinstEttArbeidsforhold:!1}},a={args:{...e.args,manglendeVedlegg:[r.HV_ØVELSE,r.NAV_TILTAK],saksnummer:"12345"}},o={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0}},t={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"ENGANGSSTØNAD",harMinstEttArbeidsforhold:!0}},d={args:{...t.args,manglendeVedlegg:[r.DEPRECATED_TERMINBEKREFTELSE,r.NAV_TILTAK],saksnummer:"12345"}},n={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0}},i={args:{...n.args,harMinstEttArbeidsforhold:!1}},l={args:{relevantNyTidslinjehendelse:{aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0}},m={args:{...n.args,manglendeVedlegg:[r.DOK_UTDANNING_MOR,r.TERMINBEKREFTELSE],saksnummer:"12345"}};var g,E,u;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true
  }
}`,...(u=(E=e.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var S,T,c;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(c=(T=s.parameters)==null?void 0:T.docs)==null?void 0:c.source}}};var N,I,R;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(R=(I=a.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var j,b,h;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true
  }
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var D,F,A;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'ENGANGSSTØNAD',
    harMinstEttArbeidsforhold: true
  }
}`,...(A=(F=t.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var y,M,f;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK],
    saksnummer: '12345'
  }
}`,...(f=(M=d.parameters)==null?void 0:M.docs)==null?void 0:f.source}}};var K,L,v;n.parameters={...n.parameters,docs:{...(K=n.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true
  }
}`,...(v=(L=n.parameters)==null?void 0:L.docs)==null?void 0:v.source}}};var G,B,H;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  }
}`,...(H=(B=i.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var O,U,V;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      opprettet: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true
  }
}`,...(V=(U=l.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var _,P,w;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE],
    saksnummer: '12345'
  }
}`,...(w=(P=m.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};const Ie=["ForForeldrepenger","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{t as ForEngangsstønad,d as ForEngangsstønadManglerDokumentasjon,e as ForForeldrepenger,a as ForForeldrepengerManglerDokumentasjon,s as ForForeldrepengerNårEnIkkeHarArbeidsforhold,o as ForForeldrepengerUtenTidligsteBehandlingsdato,n as ForSvangerskapspenger,m as ForSvangerskapspengerManglerDokumentasjon,i as ForSvangerskapspengerUtenArbeidsforhold,l as ForSvangerskapspengerUtenTidligsteBehandlingsdato,Ie as __namedExportsOrder,Ne as default};
