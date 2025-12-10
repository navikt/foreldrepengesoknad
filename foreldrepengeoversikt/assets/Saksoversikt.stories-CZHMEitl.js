import{k as u,j as t}from"./iframe-CW6M0nGA.js";import{h as e,H as n}from"./index-duR-1gme.js";import{a as d}from"./annenPartVedtak-CubWeil6.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-85NK9tA2.js";import{s as R}from"./saker-thaWTfcA.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-BOIaN2FU.js";import{A as s}from"./queries-L2qXoV6o.js";import{O as m}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-ClblZ0iF.js";import{M as h,R as A,a as c}from"./chunk-4WY6JWTD-TVRJbD7a.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-Bby465Ql.js";import"./useBackgroundColor-BfZHn52b.js";import"./useSelectedSak-BK6YKcQR.js";import"./useQuery-DdR1GfKI.js";import"./sakerUtils-BaMAncC3.js";import"./Snarveier--gVCvDwx.js";import"./LenkePanel-Cw4o44YE.js";import"./index-BIgVRAxi.js";import"./Header-CgTHO41i.js";import"./LayoutWrapper-BChjku0Q.js";import"./StatusTag-BVvnnqOB.js";import"./Tag-Drj8VGqP.js";import"./Stroller-Y9rWqZLn.js";import"./NoeGikkGalt-C0E1brnN.js";import"./MinidialogSkjema-BbUZygOg.js";import"./HarIkkeSaker-Bo9Od1pc.js";import"./SøkelenkerPanel-BqVSMPMN.js";import"./HarSaker-kl6m7CEZ.js";import"./SakLink-BuFSAxM7.js";import"./guid-CsArkN6i.js";import"./ContentSection-wlkxUvZa.js";import"./BekreftelseSendtSøknad-CwINt3yM.js";import"./KontonummerInfo-BWFTk5Tq.js";import"./Accordion-DRVI6B5N.js";import"./Svangerskapspenger-BEMvDZ0-.js";import"./DinPlan-Dhi_CeFX.js";import"./Oppgaver-WJ0A7r7t.js";import"./OppgaveLenkepanel-D7cMRSuh.js";import"./KontaktOss-DLRkhu0Q.js";const ie={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>t.jsx("div",{className:"bg-ax-brand-blue-100",children:t.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:t.jsx(A,{children:t.jsx(c,{element:t.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json(R)),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(s.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(s.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
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
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const ge=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ge as __namedExportsOrder,ie as default};
