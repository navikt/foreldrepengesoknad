import{k as u,j as s}from"./iframe-BrVtwM1F.js";import{h as e,H as n}from"./index-Bb_5sEZn.js";import{a as d}from"./annenPartVedtak-CubWeil6.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-DzGSWoeU.js";import{s as R}from"./saker-thaWTfcA.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-D-dH3lXc.js";import{A as t}from"./queries-CA5FgVZg.js";import{O as m}from"./routes-BgSQQwXh.js";import{S}from"./ForeldrepengeoversiktRoutes-Xoiw7B7W.js";import{M as h,R as A,a as c}from"./chunk-WWGJGFF6-mCXAEmp8.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BuxCcM9G.js";import"./useBackgroundColor--CVPekAk.js";import"./useSelectedSak-B4ANB44j.js";import"./useQuery-FyjR84PV.js";import"./sakerUtils-evnrITWe.js";import"./Snarveier-B7QajpLp.js";import"./LenkePanel-PpTISz6U.js";import"./index-DhpvLroL.js";import"./Header-BDF6gHOK.js";import"./LayoutWrapper-CrWYTw9z.js";import"./StatusTag-DxpFxH0b.js";import"./Tag-D8-6odH6.js";import"./Stroller-SKSyAeWL.js";import"./BabyWrapped-CYHPIIK_.js";import"./NoeGikkGalt-CuyiNWWx.js";import"./MinidialogSkjema-nYWnzzKY.js";import"./HarIkkeSaker-mQlU1m0L.js";import"./SøkelenkerPanel-DbSIHifn.js";import"./HarSaker-CXq5XSrd.js";import"./SakLink-DQ9n84Ua.js";import"./guid-CsArkN6i.js";import"./ContentSection-B2-ruMRv.js";import"./BekreftelseSendtSøknad-BBjaPty6.js";import"./tidslinjeUtils-C2hPmZU2.js";import"./KontonummerInfo-Dizjp13I.js";import"./Accordion-BJd-xntX.js";import"./Svangerskapspenger-D71ZoPYc.js";import"./DinPlan-B5mQO9EL.js";import"./Oppgaver-CUTSDw6b.js";import"./OppgaveLenkepanel-CZ3iNsWs.js";import"./Tidslinje-DO66NMFn.js";import"./Paperplane-CqMoBgOQ.js";import"./KontaktOss-C5X32DZM.js";const je={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(A,{children:s.jsx(c,{element:s.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json(R)),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(t.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(t.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ue=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ue as __namedExportsOrder,je as default};
