import{i as u,r as f,j as s}from"./iframe-B9B24InY.js";import{h as e,H as t}from"./index-1n_Xk7dt.js";import{a as d}from"./annenPartVedtak-Bep7htDZ.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-CdOIriwH.js";import{s as S}from"./saker-CO7YLNYW.js";import{S as A}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-9a8FY21A.js";import{A as n,D as h}from"./api-CSP2sNTp.js";import{O as m}from"./routes-C7yRzVAD.js";import{S as _}from"./ForeldrepengeoversiktRoutes-Bhumteee.js";import{M as c,R as I,a as P}from"./chunk-TMI4QPZX-Dy2A5nXz.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DaaeGSlc.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-wYwX6DJl.js";import"./useSelectedSak-DG7bT9oy.js";import"./useQuery-ClPdkV49.js";import"./sakerUtils-ymwfUV_S.js";import"./Snarveier-Dcfg7Ld-.js";import"./LenkePanel-C5vIOUpk.js";import"./index-DhaW3C1i.js";import"./Header-BVhYLwR6.js";import"./LayoutWrapper-CbmgYr_o.js";import"./StatusTag-w8vt0jS-.js";import"./Tag-DMXbAgRR.js";import"./Stroller-DTvGppLu.js";import"./NoeGikkGalt-DjTN5zy9.js";import"./MinidialogSkjema-Bpdv1erZ.js";import"./BekreftelseSendtSøknad-CvuNHOIn.js";import"./dokumenterUtils-B2p0j5Z9.js";import"./KontonummerInfo-B26IZ7th.js";import"./Accordion-ClEbAVNQ.js";import"./HarIkkeSaker-CSRo86u9.js";import"./SøkelenkerPanel-kARGyTQ9.js";import"./HarSaker-Bk7rSjkT.js";import"./SakLink-BrZpNebl.js";import"./guid-CsArkN6i.js";import"./ContentSection-BIVPiCvb.js";import"./Svangerskapspenger-DMDzyQQn.js";import"./DinPlan-DkCgkyyh.js";import"./Oppgaver-C5TpCysj.js";import"./OppgaveLenkepanel-DZcQMCvV.js";import"./KontaktOss-j4GMBYs8.js";const Re={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>{const R=f.useRef(!1);return s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(c,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(I,{children:s.jsx(P,{element:s.jsx(_,{...j,isFirstRender:R}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})}},r={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json(S)),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(n.tidslinje,()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(n.manglendeVedlegg,()=>t.json()),e.get(n.erOppdatert,()=>t.json(!0)),e.get(n.satser,()=>t.json(h))]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[A]})),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
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
}`,...o.parameters?.docs?.source}}};const ue=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ue as __namedExportsOrder,Re as default};
