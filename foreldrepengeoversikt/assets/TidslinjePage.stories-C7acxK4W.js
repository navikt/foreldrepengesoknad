import{i as a,j as t}from"./iframe-DEhwS6sp.js";import{h as r,H as s}from"./index-DnOzczH2.js";import{t as p,m as l}from"./tidslinjeHendelser-BvNNvp2U.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-CPfxHqTM.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-j98V4uC5.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BtmiRiL4.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BSzKSMDy.js";import"./useBackgroundColor-Cs2nLKT4.js";import"./useSelectedSak-DZTP3mqH.js";import"./useQuery-DTjTkXx_.js";import"./sakerUtils-CitOY5_8.js";import"./Snarveier-CZY47_h1.js";import"./LenkePanel-BoOsYrDc.js";import"./index-D4MN5hiV.js";import"./Header-CHW8drPn.js";import"./LayoutWrapper-BvnZoIfJ.js";import"./StatusTag-BvqVgydR.js";import"./Tag-D7lHsqNP.js";import"./Stroller-BMIG3Wz_.js";import"./NoeGikkGalt-BRsQBwSl.js";import"./MinidialogSkjema-Ds04HKCn.js";import"./HarIkkeSaker-CTtw1jqM.js";import"./SøkelenkerPanel-CytROjCQ.js";import"./HarSaker-CJqzhri4.js";import"./SakLink-BmKftEIZ.js";import"./guid-CsArkN6i.js";import"./ContentSection-CC2Q0g2S.js";import"./BekreftelseSendtSøknad-CH7PR9wZ.js";import"./KontonummerInfo-DiNzaHFX.js";import"./Accordion-C0Dma9LM.js";import"./Svangerskapspenger-BqmU3qwo.js";import"./DinPlan-vDh76K14.js";import"./Oppgaver-CQsstLYF.js";import"./OppgaveLenkepanel-Bnq-SVlX.js";import"./KontaktOss-8t6QGlF5.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
