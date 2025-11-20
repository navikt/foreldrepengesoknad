import{i as a,j as t}from"./iframe-LqrhR6Qg.js";import{h as r,H as s}from"./index-CC4eufGu.js";import{t as p,m as l}from"./tidslinjeHendelser-DxIpnm0s.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-JCy8o_so.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-ikta6sDJ.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Cd80xl5A.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BzRWfLhB.js";import"./useBackgroundColor-Cg65Dyk1.js";import"./useSelectedSak-C3LUCSEO.js";import"./useQuery-B-30Pv-7.js";import"./sakerUtils-B2De3VyN.js";import"./Snarveier-pegVwrVX.js";import"./LenkePanel-Cm5L8OsM.js";import"./index-BObBxIP_.js";import"./Header-B6lMmcwj.js";import"./LayoutWrapper-DDPmsKkY.js";import"./StatusTag-CYi8jD34.js";import"./Tag-DK6zd_DF.js";import"./Stroller-DuL6wJs_.js";import"./NoeGikkGalt-DHws4_c_.js";import"./MinidialogSkjema-Q6nyCnie.js";import"./HarIkkeSaker-CdYifOio.js";import"./SøkelenkerPanel-DJLhoKAi.js";import"./HarSaker-CBq3St8J.js";import"./SakLink-MZFW2L5V.js";import"./guid-CsArkN6i.js";import"./ContentSection-EvLkA6DA.js";import"./BekreftelseSendtSøknad-CPSIaqVn.js";import"./KontonummerInfo-CV0f1a_A.js";import"./Accordion-CSvHDeRg.js";import"./Svangerskapspenger-BEwXzpMl.js";import"./DinPlan-9Fplvm95.js";import"./Oppgaver-DuJ_JGzQ.js";import"./OppgaveLenkepanel-B87cAyTI.js";import"./KontaktOss-B_U4O0qa.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
