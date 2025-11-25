import{i as a,j as t}from"./iframe-DETKn0nI.js";import{h as r,H as s}from"./index-QwqNUvdl.js";import{t as p,m as l}from"./tidslinjeHendelser-UkB32Xss.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-B2WLJ88x.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CYkhKNv-.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B8KgWJoP.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BAYRu0Fj.js";import"./useBackgroundColor-B82Ve4c_.js";import"./useSelectedSak-BiYxS77j.js";import"./useQuery-BZwjGZQJ.js";import"./sakerUtils-BrjY2W7n.js";import"./Snarveier-DwU3aJKw.js";import"./LenkePanel-Bg7CteLE.js";import"./index-CX2YqcVm.js";import"./Header-CYhTNy5Y.js";import"./LayoutWrapper-ByK5GVig.js";import"./StatusTag-BszkrkIY.js";import"./Tag-Djkq7733.js";import"./Stroller-CxxI9YPl.js";import"./NoeGikkGalt-Df2tIR8-.js";import"./MinidialogSkjema-BfZ0Ytkv.js";import"./HarIkkeSaker-BzMxZoHD.js";import"./SøkelenkerPanel-CHbj3Qrr.js";import"./HarSaker-B4Kqumb6.js";import"./SakLink-Ce4zcrZg.js";import"./guid-CsArkN6i.js";import"./ContentSection-wM5b0R7R.js";import"./BekreftelseSendtSøknad-BvE4rr9R.js";import"./KontonummerInfo-v65cnhJ-.js";import"./Accordion-tIBzKis9.js";import"./Svangerskapspenger-Cde3gzE3.js";import"./DinPlan-u4uyfOLl.js";import"./Oppgaver-BytuHQbV.js";import"./OppgaveLenkepanel-D0VXQ-EH.js";import"./KontaktOss-BRN703MQ.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
