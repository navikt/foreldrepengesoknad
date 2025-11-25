import{i as a,j as t}from"./iframe-BgqFkKjw.js";import{h as r,H as s}from"./index-CLByNgfh.js";import{t as p,m as l}from"./tidslinjeHendelser-DG65Zz52.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-Bjz2qbyA.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BqMbmAtU.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Br77_rPi.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-3GI8Sna1.js";import"./useBackgroundColor-DVWsYkGY.js";import"./useSelectedSak-D7522buz.js";import"./useQuery-DpaFm0bq.js";import"./sakerUtils-DHx5H944.js";import"./Snarveier-Dls8hVOk.js";import"./LenkePanel-B1vguzGt.js";import"./index-B1wNwUa4.js";import"./Header-2YXB4QJy.js";import"./LayoutWrapper-CC5sXv3W.js";import"./StatusTag-CvS9rvcm.js";import"./Tag-DTynPW2q.js";import"./Stroller-CUaEuPAc.js";import"./NoeGikkGalt-D5EvzKsH.js";import"./MinidialogSkjema-u8U7c8xG.js";import"./HarIkkeSaker-pM-vYkPo.js";import"./SøkelenkerPanel-t-eS7qOh.js";import"./HarSaker-BkDMdfLV.js";import"./SakLink-CxPPZFDv.js";import"./guid-CsArkN6i.js";import"./ContentSection-CX6JgoWi.js";import"./BekreftelseSendtSøknad-BTq0zYlg.js";import"./KontonummerInfo-hJlwiLlJ.js";import"./Accordion-Dma-Mi8M.js";import"./Svangerskapspenger-BeM8eh0w.js";import"./DinPlan-BRTZbhoZ.js";import"./Oppgaver-DnR92F_6.js";import"./OppgaveLenkepanel-Ba7fjHhO.js";import"./KontaktOss-D79trC1F.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
