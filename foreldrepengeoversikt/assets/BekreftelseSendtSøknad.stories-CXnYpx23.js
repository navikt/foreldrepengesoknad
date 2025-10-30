import{j as d,i as f}from"./iframe-DNOy4JUF.js";import{h as e,H as n}from"./index-e8ephae1.js";import{s as T,a as A,b,e as D}from"./saker-DfToYMsp.js";import{s as I,a as h}from"./sokerinfo-DTPOLeGc.js";import{S as a}from"./skjemanummer-CFP1_b2a.js";import{A as r}from"./api-DI05QCAf.js";import{O as R}from"./routes-C7yRzVAD.js";import{B as N}from"./BekreftelseSendtSøknad-BuOd1P7c.js";import{M as L,R as y,a as M}from"./chunk-TMI4QPZX-7UmLIOh5.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useQuery-DBYh9zHV.js";import"./useSelectedSak-CvKRdU9u.js";import"./sakerUtils-Ck0a8V8r.js";import"./KontonummerInfo-qVHNHOJK.js";import"./Accordion-CLFqI2GM.js";const _={msw:{handlers:[e.get(r.søkerInfo,()=>n.json(I)),e.get(r.saker,()=>n.json(T))]}},J={title:"BekreftelseSendtSøknad",component:N,decorators:[f],parameters:_,render:({saksnummer:j,...F})=>d.jsx(L,{initialEntries:[`/${R.DIN_PLAN}/${j}`],children:d.jsx(y,{children:d.jsx(M,{element:d.jsx(N,{...F}),path:`/${R.DIN_PLAN}/:saksnummer`})})})},s={args:{saksnummer:"352011079",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},l={args:s.args,parameters:{msw:{handlers:[e.get(r.søkerInfo,()=>n.json(I)),e.get(r.saker,()=>n.json(A))]}}},p={args:s.args,parameters:{msw:{handlers:[e.get(r.søkerInfo,()=>n.json(I)),e.get(r.saker,()=>n.json(b))]}}},g={args:s.args,parameters:{msw:{handlers:[e.get(r.søkerInfo,()=>n.json(I)),e.get(r.saker,()=>n.json(D))]}}},i={args:{...s.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[e.get(r.søkerInfo,()=>n.json(h)),e.get(r.saker,()=>n.json(T))]}}},m={args:{...s.args,manglendeVedlegg:[a.HV_ØVELSE,a.NAV_TILTAK]}},k={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},o={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"ENGANGSSTØNAD",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},u={args:{...o.args,manglendeVedlegg:[a.DEPRECATED_TERMINBEKREFTELSE,a.NAV_TILTAK]}},t={args:{saksnummer:"308",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},S={args:{...t.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[e.get(r.søkerInfo,()=>n.json(h)),e.get(r.saker,()=>n.json(T))]}}},E={args:{saksnummer:"308",relevantNyTidslinjehendelse:{aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},c={args:{...t.args,manglendeVedlegg:[a.DOK_UTDANNING_MOR,a.TERMINBEKREFTELSE]}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    saksnummer: '352011079',
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto_fpoversikt,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(sakerTidligFPSøknad))]
    }
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(sakerVenterPåFpInntektsmelding))]
    }
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(endringFPSøknad))]
    }
  }
}`,...g.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(API_URLS.saker, () => HttpResponse.json(saker))]
    }
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...m.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
    } satisfies TidslinjeHendelseDto_fpoversikt,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...k.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
    } satisfies TidslinjeHendelseDto_fpoversikt,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'ENGANGSSTØNAD',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...u.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    saksnummer: '308',
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto_fpoversikt,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...t.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(API_URLS.saker, () => HttpResponse.json(saker))]
    }
  }
}`,...S.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    saksnummer: '308',
    relevantNyTidslinjehendelse: {
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      opprettet: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto_fpoversikt,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...E.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE]
  }
}`,...c.parameters?.docs?.source}}};const W=["ForForeldrepenger","ForForeldrepengerForTidligSøknad","ForForeldrepengerVenterPåInntektsmelding","ForForeldrepengerEndringsøknad","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{o as ForEngangsstønad,u as ForEngangsstønadManglerDokumentasjon,s as ForForeldrepenger,g as ForForeldrepengerEndringsøknad,l as ForForeldrepengerForTidligSøknad,m as ForForeldrepengerManglerDokumentasjon,i as ForForeldrepengerNårEnIkkeHarArbeidsforhold,k as ForForeldrepengerUtenTidligsteBehandlingsdato,p as ForForeldrepengerVenterPåInntektsmelding,t as ForSvangerskapspenger,c as ForSvangerskapspengerManglerDokumentasjon,S as ForSvangerskapspengerUtenArbeidsforhold,E as ForSvangerskapspengerUtenTidligsteBehandlingsdato,W as __namedExportsOrder,J as default};
