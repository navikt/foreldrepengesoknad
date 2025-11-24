import{i as a,j as t}from"./iframe-CKap-5tI.js";import{h as r,H as s}from"./index-ChtrbyNz.js";import{t as p,m as l}from"./tidslinjeHendelser-DvRgI4PG.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C-2EcKci.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-UNGSwxB5.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B7URwL11.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CR2wNr2n.js";import"./useBackgroundColor-DuVhRFve.js";import"./useSelectedSak-CCGD1kji.js";import"./useQuery-BqOd_gCr.js";import"./sakerUtils-ggNI-g3q.js";import"./Snarveier-2GZBJsnl.js";import"./LenkePanel-WM7UPQg0.js";import"./index-BslUTrHP.js";import"./Header-B9A2rxJc.js";import"./LayoutWrapper-MbjlbN2A.js";import"./StatusTag-DBW5vAdv.js";import"./Tag-DKTrpx5a.js";import"./Stroller-C4iXffgL.js";import"./NoeGikkGalt-50kOmgAv.js";import"./MinidialogSkjema-B5lfvxbo.js";import"./HarIkkeSaker-trUkn3Ym.js";import"./SøkelenkerPanel-U9x6mCRz.js";import"./HarSaker-B4ZqQ0Ey.js";import"./SakLink-CIRY2O19.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dc_VinSM.js";import"./BekreftelseSendtSøknad-B1TA7r4a.js";import"./KontonummerInfo-B9a-lcvl.js";import"./Accordion-D2Y6Sq71.js";import"./Svangerskapspenger-GmOiCTdT.js";import"./DinPlan-DcTRCvCs.js";import"./Oppgaver-BalenQMr.js";import"./OppgaveLenkepanel-wtHRKBwX.js";import"./KontaktOss-BTUsk6dh.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
