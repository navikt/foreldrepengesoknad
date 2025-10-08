import{i as u,r as f,j as s}from"./iframe-BGOG44DK.js";import{h as e,H as t}from"./index-B4Zy9ehy.js";import{a as d}from"./annenPartVedtak-CC3huyYa.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-PYMJp4z8.js";import{s as S}from"./saker-DWfdw2la.js";import{S as A}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-S1eq7z6_.js";import{A as n,D as h}from"./api-CnpsdBLC.js";import{O as m}from"./routes-C7yRzVAD.js";import{S as _}from"./ForeldrepengeoversiktRoutes-CwDnOYXa.js";import{M as c,R as I,a as P}from"./chunk-TMI4QPZX-QwzuWtG2.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-7iJeax4r.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BifAu8VF.js";import"./useSelectedSak-CCMmAbnx.js";import"./useQuery-DT5RNUV5.js";import"./sakerUtils-DK21Rf3m.js";import"./Snarveier-CEI87XI_.js";import"./LenkePanel-Di4qeYeX.js";import"./index-D28VsQrH.js";import"./Dokument-CxVxFRKr.js";import"./dokumenterUtils-BidHPh0H.js";import"./Tag-C68Ae1Iw.js";import"./GrupperteDokumenter-u1UxH7B6.js";import"./guid-CsArkN6i.js";import"./Accordion-T2WuaQdM.js";import"./Header-BBAbsDgm.js";import"./LayoutWrapper-C63bbq19.js";import"./StatusTag-DYtpwxFh.js";import"./Stroller-BJyaYKJ8.js";import"./NoeGikkGalt-BA43qCks.js";import"./MinidialogSkjema-BNydc6-4.js";import"./BekreftelseSendtSøknad-DIsN4R13.js";import"./KontonummerInfo-CYE4uGvD.js";import"./HarIkkeSaker-BpHRxS4X.js";import"./SøkelenkerPanel-SL3qVlsq.js";import"./HarSaker-B-ktagMa.js";import"./SakLink-BZizAoAU.js";import"./ContentSection-RFVCnIcd.js";import"./Svangerskapspenger-CrLk9Oqd.js";import"./DinPlan-BPzKKye2.js";import"./Oppgaver-Cs3AcBdD.js";import"./OppgaveLenkepanel-CchuefCj.js";import"./KontaktOss-C-AsUdZv.js";const fe={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>{const R=f.useRef(!1);return s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(c,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(I,{children:s.jsx(P,{element:s.jsx(_,{...j,isFirstRender:R}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})}},r={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json(S)),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{søkerinfo:p,saksnummer:"352011079"}},a={parameters:{msw:{handlers:[e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(n.tidslinje,()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(n.manglendeVedlegg,()=>t.json()),e.get(n.erOppdatert,()=>t.json(!0)),e.get(n.satser,()=>t.json(h))]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[A]})),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '352011079'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [],
        engangsstønad: [{
          saksnummer: '352011079',
          sakAvsluttet: false,
          gjelderAdopsjon: false,
          familiehendelse: {
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
            antallBarn: 1
          },
          åpenBehandling: {
            tilstand: 'UNDER_BEHANDLING'
          },
          oppdatertTidspunkt: '2024-02-28T21:19:08.911'
        }],
        svangerskapspenger: []
      } satisfies Saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json([{
        type: 'søknad',
        opprettet: '2023-01-31T09:06:46.541655',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [{
          type: 'INNGÅENDE_DOKUMENT',
          mottatt: '2023-01-31T09:06:48',
          saksnummer: '352011079',
          tittel: 'Søknad om foreldrepenger ved fødsel',
          journalpostId: '598115874',
          dokumentId: '624862989'
        }],
        manglendeVedlegg: []
      }])), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json()), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '352011079'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [],
        engangsstønad: [],
        svangerskapspenger: [SAK_1]
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const Se=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,Se as __namedExportsOrder,fe as default};
