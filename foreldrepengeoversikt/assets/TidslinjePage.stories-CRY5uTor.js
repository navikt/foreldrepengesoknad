import{i as a,j as t}from"./iframe-DO4-5H3J.js";import{h as r,H as s}from"./index-CuPY0oaQ.js";import{t as p,m as l}from"./tidslinjeHendelser-DY4fj7TG.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BjBSrtqM.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-jGe-8L-h.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CqoCmG_Q.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CQJkfp3G.js";import"./useBackgroundColor-DoWyr0ix.js";import"./useSelectedSak-BrSeUB06.js";import"./useQuery-BJF_ZjCT.js";import"./sakerUtils-D3sNUIqL.js";import"./Snarveier-BYxngD4H.js";import"./LenkePanel-DvI2u8Iw.js";import"./index-CuYij3o6.js";import"./Header-Bgt_25ao.js";import"./LayoutWrapper-zPCmexM3.js";import"./StatusTag-DoWEC6XK.js";import"./Tag-CVRwEArw.js";import"./Stroller-CjEXeA4f.js";import"./NoeGikkGalt-C6OvKvVl.js";import"./MinidialogSkjema-DYimfWtq.js";import"./HarIkkeSaker-BoLAHHu2.js";import"./SøkelenkerPanel-CwH8UM0f.js";import"./HarSaker-BT2Vmue6.js";import"./SakLink-DCErYapA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DLlVaBTK.js";import"./BekreftelseSendtSøknad-7LJYq5qG.js";import"./KontonummerInfo-B9dkVcmc.js";import"./Accordion-DPPMsRyf.js";import"./Svangerskapspenger-DHgn_sPt.js";import"./DinPlan-CMMHRWjf.js";import"./Oppgaver-DRxI8qst.js";import"./OppgaveLenkepanel-DfLnplK5.js";import"./KontaktOss-DISy9P-B.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
