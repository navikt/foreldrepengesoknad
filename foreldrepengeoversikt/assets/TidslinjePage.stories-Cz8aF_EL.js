import{k as a,j as t}from"./iframe-C0aYCwxQ.js";import{h as r,H as s}from"./index-z12xrPHv.js";import{t as p,m as l}from"./tidslinjeHendelser-DdtXjmLB.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-Bwobjia3.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CH9Ku271.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CMFQeyIP.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BRWEFZVL.js";import"./useBackgroundColor-DHt9F9S_.js";import"./useSelectedSak-D1ik6fT0.js";import"./useQuery-COq4C8h2.js";import"./sakerUtils-CwAYkhQJ.js";import"./Snarveier-B7eQ2Rdz.js";import"./LenkePanel-DTk2ip2K.js";import"./index-A1dX0y8K.js";import"./Header-DwpNx8C1.js";import"./LayoutWrapper-daRpoAUB.js";import"./StatusTag-YtwA-yqY.js";import"./Tag-C2gL6K-x.js";import"./Stroller-CaD07pnW.js";import"./NoeGikkGalt-B_E8PuxP.js";import"./MinidialogSkjema-B6SUqsiH.js";import"./HarIkkeSaker-BKQD0H2G.js";import"./SøkelenkerPanel-D0jhZSeT.js";import"./HarSaker-Bv7enaJ5.js";import"./SakLink-Dnfm-qcX.js";import"./guid-CsArkN6i.js";import"./ContentSection-CstgAsUG.js";import"./BekreftelseSendtSøknad-1M-uQdyI.js";import"./KontonummerInfo-DxN2AME-.js";import"./Accordion-CWBQikJz.js";import"./Svangerskapspenger-BktbUHH1.js";import"./DinPlan-Dub99uCA.js";import"./Oppgaver-D2WdLJUz.js";import"./OppgaveLenkepanel-B5BCCaMO.js";import"./KontaktOss-BjS-P0bo.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
