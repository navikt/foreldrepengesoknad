import{k as a,j as t}from"./iframe-lV1Vpc_y.js";import{h as r,H as s}from"./index-BJ_fqUdM.js";import{t as p,m as l}from"./tidslinjeHendelser-D0gRGovu.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-WoULN4uW.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CZHbA8b5.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-n2F1wNQD.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BVtgdeK6.js";import"./useBackgroundColor-COcCQNGm.js";import"./useSelectedSak-B2nt6-oM.js";import"./useQuery-BpZkVbXQ.js";import"./sakerUtils-DJaFIMyA.js";import"./Snarveier-Dkp6mcYV.js";import"./LenkePanel-CUt17TzL.js";import"./index-4u36ggc3.js";import"./Header-WJv01Yrx.js";import"./LayoutWrapper-Dfla3ZvI.js";import"./StatusTag-Cmn7DnXX.js";import"./Tag-DzlXzEeD.js";import"./Stroller-Ch6Nki6m.js";import"./NoeGikkGalt-DpeSqXCl.js";import"./MinidialogSkjema-C_xJ8Xh9.js";import"./HarIkkeSaker-vuzlXEi5.js";import"./SøkelenkerPanel-Dz2qQVTf.js";import"./HarSaker-BTtGYkca.js";import"./SakLink-Bw_mEA7e.js";import"./guid-CsArkN6i.js";import"./ContentSection-hWW1YPdI.js";import"./BekreftelseSendtSøknad-D3enWbTZ.js";import"./KontonummerInfo-BCVORf6H.js";import"./Accordion-BroNNizd.js";import"./Svangerskapspenger-BR-6Hca8.js";import"./DinPlan-Du2Xun9M.js";import"./Oppgaver-WykKXgvI.js";import"./OppgaveLenkepanel-D-2WnhjL.js";import"./KontaktOss-CzPWhEov.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
