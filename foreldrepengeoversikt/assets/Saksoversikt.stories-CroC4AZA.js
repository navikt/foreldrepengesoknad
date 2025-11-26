import{k as u,j as t}from"./iframe-DRNLMmYE.js";import{h as e,H as n}from"./index-CkkFPX7F.js";import{a as d}from"./annenPartVedtak-CubWeil6.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-BY-Kw5J2.js";import{s as R}from"./saker-D6DZJrGh.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-nkEz20ai.js";import{A as s}from"./queries-BcUe5G4p.js";import{O as m}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-Drly9pVO.js";import{M as h,R as A,a as c}from"./chunk-TMI4QPZX-BngKly09.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-btuYC64-.js";import"./useBackgroundColor-Dj9Mhw7e.js";import"./useSelectedSak-BxTYm4MN.js";import"./useQuery-Civ8Dnm5.js";import"./sakerUtils-hgp4WW7J.js";import"./Snarveier-E9ExDleI.js";import"./LenkePanel-s6GC44pQ.js";import"./index-DeJTEWpZ.js";import"./Header-DwCdhqXx.js";import"./LayoutWrapper-CrcCcvL2.js";import"./StatusTag-heFK2ndb.js";import"./Tag-D3i_kcKy.js";import"./Stroller-BvnyJIEi.js";import"./NoeGikkGalt-B42Mb4yn.js";import"./MinidialogSkjema-CJGLC-KC.js";import"./HarIkkeSaker-B8iY7lVU.js";import"./SøkelenkerPanel-CNYihIl5.js";import"./HarSaker-B0eptRDF.js";import"./SakLink-De7BDsoU.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bg42jfKz.js";import"./BekreftelseSendtSøknad-Bz4PYXNm.js";import"./KontonummerInfo-BLE1AQOX.js";import"./Accordion-Bs3Hp_4f.js";import"./Svangerskapspenger-cXcJmkwk.js";import"./DinPlan-D7g6KPAt.js";import"./Oppgaver-C0F7sApH.js";import"./OppgaveLenkepanel-_337-uD2.js";import"./KontaktOss-BBOVwqh8.js";const ie={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>t.jsx("div",{className:"bg-ax-brand-blue-100",children:t.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:t.jsx(A,{children:t.jsx(c,{element:t.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json(R)),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(s.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(s.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '1'
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
      } satisfies Saker_fpoversikt)), http.get(API_URLS.tidslinje, () => HttpResponse.json([{
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
      }])), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json())]
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
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const ge=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ge as __namedExportsOrder,ie as default};
