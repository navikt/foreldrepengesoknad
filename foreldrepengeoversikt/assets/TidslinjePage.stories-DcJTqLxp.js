import{i as a,j as t}from"./iframe-Dib8nPCd.js";import{h as r,H as s}from"./index-BrURP0OY.js";import{t as p,m as l}from"./tidslinjeHendelser-BQ2miAo8.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-Bik5e3WR.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-m2ojaw3n.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BhqFHsFy.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DT6QFji2.js";import"./useBackgroundColor-cCi0KcSJ.js";import"./useSelectedSak-RFtfQODM.js";import"./useQuery-CZ4QNHCz.js";import"./sakerUtils-BPTee7Vw.js";import"./Snarveier-C868I0fT.js";import"./LenkePanel-7U0XSOHl.js";import"./index-D87WEy0j.js";import"./Header-KgbOx2gZ.js";import"./LayoutWrapper-Baf7as36.js";import"./StatusTag-BUHKYnuU.js";import"./Tag-DHZzuPUy.js";import"./Stroller-Cmn9Neus.js";import"./NoeGikkGalt-D1faA3xU.js";import"./MinidialogSkjema-Br7cG9H1.js";import"./HarIkkeSaker-UCYU-dIv.js";import"./SøkelenkerPanel-tb_23aIT.js";import"./HarSaker-Bi09yLwe.js";import"./SakLink-SWn65jyo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CqrMxuqt.js";import"./BekreftelseSendtSøknad-D-D8qc2h.js";import"./KontonummerInfo-C8zqKUWE.js";import"./Accordion-D1LyrSy3.js";import"./Svangerskapspenger-DJik5uQS.js";import"./DinPlan-BwBHHpFG.js";import"./Oppgaver-MJjrl_Pn.js";import"./OppgaveLenkepanel-CJzAqjuv.js";import"./KontaktOss-BaIVzbSL.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
