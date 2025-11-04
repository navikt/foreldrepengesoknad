import{i as a,j as t}from"./iframe-CNM7jKP8.js";import{h as r,H as s}from"./index-DfjDPPpX.js";import{t as p,m as l}from"./tidslinjeHendelser-DT_Juip0.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-BiRAonq1.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-1TJ2zd0P.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DtByHWjA.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D_bK0CsP.js";import"./useBackgroundColor-ueKmzNLl.js";import"./useSelectedSak-BOLE0djR.js";import"./useQuery-BN8ns4DF.js";import"./sakerUtils-C3myTzcF.js";import"./Snarveier-DwE0tC6P.js";import"./LenkePanel-D5CLO0_y.js";import"./index-Ce6wbFI1.js";import"./Header-NqzAtqlN.js";import"./LayoutWrapper-Bai452xE.js";import"./StatusTag-BE1DZbDZ.js";import"./Tag-GCYOxzLb.js";import"./Stroller-BOncqYWi.js";import"./NoeGikkGalt-BF30SWtw.js";import"./MinidialogSkjema-B5dca6PC.js";import"./HarIkkeSaker-CwBoe6q_.js";import"./SøkelenkerPanel-Cxpf9C-G.js";import"./HarSaker-DjHspJj0.js";import"./SakLink-DASm3hOJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dlwe2N8X.js";import"./BekreftelseSendtSøknad-COZCNvvf.js";import"./KontonummerInfo-xBbEJa3z.js";import"./Accordion-CZMt4dYn.js";import"./Svangerskapspenger-DISl0Pip.js";import"./DinPlan-DF7zXwuq.js";import"./Oppgaver-DAODHhts.js";import"./OppgaveLenkepanel-BagcywU7.js";import"./KontaktOss-vnXQ9wXq.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
