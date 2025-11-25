import{i as a,j as t}from"./iframe-2X5b7wGu.js";import{h as r,H as s}from"./index-BnDizS2s.js";import{t as p,m as l}from"./tidslinjeHendelser-BOsU34y6.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BepJQoDW.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-XJb_G5xg.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-9fLl2Gdr.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BR1Tofgi.js";import"./useBackgroundColor-BcOqZA8f.js";import"./useSelectedSak-oJj7K-OT.js";import"./useQuery-CigvV_nw.js";import"./sakerUtils-BMRlwrb3.js";import"./Snarveier-CDJT9ZwV.js";import"./LenkePanel-CyuOWNYx.js";import"./index-DSLRkqwp.js";import"./Header-CfJyTvF8.js";import"./LayoutWrapper-Dxz58bDi.js";import"./StatusTag-CRI0TLRr.js";import"./Tag-Bo_CkWt6.js";import"./Stroller-D3vX1snq.js";import"./NoeGikkGalt-iy3V9PAQ.js";import"./MinidialogSkjema-CxKJYyHh.js";import"./HarIkkeSaker-BUBraOUE.js";import"./SøkelenkerPanel-DOjJ9b_s.js";import"./HarSaker-n_m9IhcW.js";import"./SakLink-CVznwkbg.js";import"./guid-CsArkN6i.js";import"./ContentSection-BpGyeZmF.js";import"./BekreftelseSendtSøknad-KftILQPZ.js";import"./KontonummerInfo-C257_ati.js";import"./Accordion-Bfjnitq2.js";import"./Svangerskapspenger-DYibz146.js";import"./DinPlan-CIYyFCyo.js";import"./Oppgaver-E90pdjrO.js";import"./OppgaveLenkepanel-BB0jzR2l.js";import"./KontaktOss-CEXkOHHA.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
