import{i as a,j as t}from"./iframe-BfLZ8xTq.js";import{h as r,H as s}from"./index-CmgMjj4v.js";import{t as p,m as l}from"./tidslinjeHendelser-owV1Q-MK.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DGOHdOPj.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DB4Hdm4k.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-_XKpLkts.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-VISD0Cww.js";import"./useBackgroundColor-CdEAe2E3.js";import"./useSelectedSak-xmhUOVqp.js";import"./useQuery-DUAkMzOQ.js";import"./sakerUtils-BivdUTW9.js";import"./Snarveier-CCv549oJ.js";import"./LenkePanel-BwisN7Ph.js";import"./index-DmFydn4h.js";import"./Header-rPXJBc6V.js";import"./LayoutWrapper-dF0rI4D6.js";import"./StatusTag-bOjGSkof.js";import"./Tag-DBQUnhax.js";import"./Stroller-CBBvxxSS.js";import"./NoeGikkGalt-CyHXzr8s.js";import"./MinidialogSkjema-FKqzpObT.js";import"./HarIkkeSaker-EbeBDwot.js";import"./SøkelenkerPanel-B1vKAUgL.js";import"./HarSaker-jHkx7m5h.js";import"./SakLink-7Q-r191X.js";import"./guid-CsArkN6i.js";import"./ContentSection-I8Pcrj8o.js";import"./BekreftelseSendtSøknad-CffCnzX6.js";import"./KontonummerInfo-ChP6SaIt.js";import"./Accordion-K2iS09pY.js";import"./Svangerskapspenger-De0QtqyJ.js";import"./DinPlan-DHyDv-_9.js";import"./Oppgaver-CLVh5HW_.js";import"./OppgaveLenkepanel-WAoCZcca.js";import"./KontaktOss-CUnh2mzi.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
