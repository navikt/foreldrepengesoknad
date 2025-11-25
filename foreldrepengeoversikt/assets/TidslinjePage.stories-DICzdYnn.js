import{i as a,j as t}from"./iframe-BeW5ADCm.js";import{h as r,H as s}from"./index-BUOfnOkT.js";import{t as p,m as l}from"./tidslinjeHendelser-B53AJCIU.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BH4KLwBi.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Byd01xRO.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dk_UqrSs.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Df-TI4XS.js";import"./useBackgroundColor-BugMtMUr.js";import"./useSelectedSak-CiJ-2Xpm.js";import"./useQuery-CPalgW4U.js";import"./sakerUtils-BkrYbWU7.js";import"./Snarveier-CCdNdP21.js";import"./LenkePanel-Bc1Xu7Vi.js";import"./index-B0snz123.js";import"./Header-D1suKacR.js";import"./LayoutWrapper-D8vRJCuG.js";import"./StatusTag-wwfugI4c.js";import"./Tag-w-7DVBGA.js";import"./Stroller-8tv-l7GK.js";import"./NoeGikkGalt-CyQtQoXX.js";import"./MinidialogSkjema-DX9Mv1sb.js";import"./HarIkkeSaker-DojZ7Ae-.js";import"./SøkelenkerPanel-D6wvV6fQ.js";import"./HarSaker-CGRkxmj3.js";import"./SakLink-ZW8jgwtB.js";import"./guid-CsArkN6i.js";import"./ContentSection-DHuHoKID.js";import"./BekreftelseSendtSøknad-BPul81Y5.js";import"./KontonummerInfo-4knc8qtG.js";import"./Accordion-lMd_lbf_.js";import"./Svangerskapspenger-oYea9znC.js";import"./DinPlan-DaqsQYRA.js";import"./Oppgaver-B7iWmwSu.js";import"./OppgaveLenkepanel-T5_l8i2O.js";import"./KontaktOss-DwDz0YUy.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
