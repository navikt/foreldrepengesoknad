import{i as u,j as s}from"./iframe-mJ--PAC2.js";import{h as e,H as n}from"./index-CxtF_tCw.js";import{a as d}from"./annenPartVedtak-B28pqsBi.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-DggBZjrB.js";import{s as R}from"./saker-DufbqqUG.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-BxqbpZMn.js";import{A as t}from"./api-Bhf7waFA.js";import{O as m}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-CPZXxXXf.js";import{M as h,R as A,a as c}from"./chunk-TMI4QPZX--7RizPfj.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CJ1DjcUt.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BUGDrSoA.js";import"./useSelectedSak-Cd2X_s-G.js";import"./useQuery-xooj_pZC.js";import"./sakerUtils-BNMhmreY.js";import"./Snarveier-BjDTZcIH.js";import"./LenkePanel-DOo9h1br.js";import"./index-DrP1q76Q.js";import"./Header-B8mjh1R-.js";import"./LayoutWrapper-Cn3yrXGD.js";import"./StatusTag-B8ZcT7XY.js";import"./Tag-CsMbggRg.js";import"./Stroller-BI2rboPK.js";import"./NoeGikkGalt-Dw7jIRUa.js";import"./MinidialogSkjema-pxJ1fpEs.js";import"./HarIkkeSaker-MW64OoIw.js";import"./SøkelenkerPanel-BBmW8FE-.js";import"./HarSaker-Dz4Tm9OC.js";import"./SakLink-m5vwtc5V.js";import"./guid-CsArkN6i.js";import"./ContentSection-Czd-Fzpb.js";import"./BekreftelseSendtSøknad-DEkqo-wW.js";import"./KontonummerInfo-DnZbCJhl.js";import"./Accordion-C4D-bFuE.js";import"./Svangerskapspenger-BjhLSkmb.js";import"./DinPlan-CUwEximr.js";import"./Oppgaver-B6zGS0ni.js";import"./OppgaveLenkepanel-aSKjy1Ew.js";import"./KontaktOss-DY7AGywt.js";const ge={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(A,{children:s.jsx(c,{element:s.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json(R)),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(t.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(t.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const le=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,le as __namedExportsOrder,ge as default};
