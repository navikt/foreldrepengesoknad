import{i as u,j as s}from"./iframe-BL1fXp3Z.js";import{h as e,H as n}from"./index-CtMjQgvb.js";import{a as d}from"./annenPartVedtak-DeLDVQ0F.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-BwK27Q2F.js";import{s as R}from"./saker-eujSxlJW.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-DYTpuEoT.js";import{A as t,D as S}from"./api-QlxCNsBs.js";import{O as m}from"./routes-C7yRzVAD.js";import{S as A}from"./ForeldrepengeoversiktRoutes-DdaGYbo6.js";import{M as h,R as c,a as _}from"./chunk-TMI4QPZX-B017oIpK.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DLD4juAC.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DNqCl1xt.js";import"./useSelectedSak-CgHp6Zaz.js";import"./useQuery-DRSe34mH.js";import"./sakerUtils-CWhnQUyi.js";import"./Snarveier-wXe9-G5_.js";import"./LenkePanel-CjQZjc_e.js";import"./index-BLdhdjp7.js";import"./Header-Caz774L4.js";import"./LayoutWrapper-BD9sgz2m.js";import"./StatusTag-FIffnT_r.js";import"./Tag-BBYKCuCF.js";import"./Stroller-r759M7JH.js";import"./NoeGikkGalt-BcyvNw_2.js";import"./MinidialogSkjema-gLEXvcBT.js";import"./HarIkkeSaker-Cyt0mYRA.js";import"./SøkelenkerPanel-CD8kOGYT.js";import"./HarSaker-DnKdMKF0.js";import"./SakLink-EhhX9t7d.js";import"./guid-CsArkN6i.js";import"./ContentSection-CN-rQiPY.js";import"./BekreftelseSendtSøknad-tZuUcB6P.js";import"./dokumenterUtils-DHPQPJjC.js";import"./KontonummerInfo-D1i_pgJ-.js";import"./Accordion-CMeu16a0.js";import"./Svangerskapspenger-ZAOnlef3.js";import"./DinPlan-DjDyWJ4x.js";import"./Oppgaver-Bi1QeTIy.js";import"./OppgaveLenkepanel-DZ4Ai8Cr.js";import"./KontaktOss-Bc2_DnlC.js";const ke={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(c,{children:s.jsx(_,{element:s.jsx(A,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json(R)),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(t.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(t.manglendeVedlegg,()=>n.json()),e.get(t.satser,()=>n.json(S))]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      }])), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json()), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
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
}`,...o.parameters?.docs?.source}}};const je=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,je as __namedExportsOrder,ke as default};
