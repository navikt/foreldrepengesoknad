import{i as a,j as t}from"./iframe-C6BSzdbg.js";import{h as r,H as s}from"./index-DhDUp3CF.js";import{t as p,m as l}from"./tidslinjeHendelser-CcLYgX6H.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-CwGbAgDD.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-iWgBxYlC.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-6EGvykVZ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BU0ErD8J.js";import"./useBackgroundColor-BkA0NXqe.js";import"./useSelectedSak-C6MZ3m2b.js";import"./useQuery-B2A1GJli.js";import"./sakerUtils-BDS9jc9w.js";import"./Snarveier-CP9TozDv.js";import"./LenkePanel-lHjVeQsG.js";import"./index-Caw6Ge8H.js";import"./Header-g4mFJSzT.js";import"./LayoutWrapper-qFK0cerd.js";import"./StatusTag-D-aHGgLB.js";import"./Tag-tSe1yCyJ.js";import"./Stroller-Db6wdnzi.js";import"./NoeGikkGalt-DDL7PqBL.js";import"./MinidialogSkjema-hLJBAEMR.js";import"./HarIkkeSaker-DxeG2SXm.js";import"./SøkelenkerPanel-Ba3k6Y8M.js";import"./HarSaker-Wh8JAhhy.js";import"./SakLink-BAZFIb5Q.js";import"./guid-CsArkN6i.js";import"./ContentSection-CQjAmU7J.js";import"./BekreftelseSendtSøknad-DKYwOw1y.js";import"./KontonummerInfo-Dgiw2hj2.js";import"./Accordion-DMbNUaFk.js";import"./Svangerskapspenger-BlmqLxvK.js";import"./DinPlan-DNNww9W4.js";import"./Oppgaver-B-fG8awZ.js";import"./OppgaveLenkepanel-BLgiEvD-.js";import"./KontaktOss-BZ2bdBLp.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
