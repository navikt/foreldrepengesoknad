import{i as a,j as t}from"./iframe-C7kAMEAX.js";import{h as r,H as s}from"./index-Db3Bve8Q.js";import{t as p,m as l}from"./tidslinjeHendelser-Bl_ToocS.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CeHDg64a.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Pv66CvEg.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DGzXH5et.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-tpE1bfLd.js";import"./useBackgroundColor-6Rteel5-.js";import"./useSelectedSak-CfSEceDb.js";import"./useQuery-CTCyKfzH.js";import"./sakerUtils-CoPWIg_G.js";import"./Snarveier-De1pUKlA.js";import"./LenkePanel-BJIpCzd_.js";import"./index-dIqq18xe.js";import"./Header-DD-nM3oh.js";import"./LayoutWrapper-MSBd1jyg.js";import"./StatusTag-ChtV2VL9.js";import"./Tag-BbRSovK_.js";import"./Stroller-CG0iAFOE.js";import"./NoeGikkGalt-BvKUW3x2.js";import"./MinidialogSkjema-C5w-PDHy.js";import"./HarIkkeSaker-C0f_jNhn.js";import"./SøkelenkerPanel-9Snsl_3G.js";import"./HarSaker-Vbfq9qE3.js";import"./SakLink-B1k_0Gdc.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cix9nrv_.js";import"./BekreftelseSendtSøknad-CyQmlW3x.js";import"./KontonummerInfo-BNjPt0Aj.js";import"./Accordion-Cu4EY5fK.js";import"./Svangerskapspenger-CyvKqwnG.js";import"./DinPlan-L1jUZYrq.js";import"./Oppgaver-CoaNVJRV.js";import"./OppgaveLenkepanel-DgwVpxlO.js";import"./KontaktOss-KW9UfMNw.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      navn: {
        fornavn: 'Olga',
        etternavn: 'Utvikler'
      },
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...e.parameters?.docs?.source}}};const tt=["Default"];export{e as Default,tt as __namedExportsOrder,Z as default};
