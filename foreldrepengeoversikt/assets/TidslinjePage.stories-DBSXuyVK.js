import{i as a,j as t}from"./iframe-D8Z13nFP.js";import{h as r,H as s}from"./index-BteYz7Ol.js";import{t as p,m as l}from"./tidslinjeHendelser-BL7i9EEL.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DHjpFEai.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-AvA7X8us.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-r5aUDDL9.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-xABSSrIY.js";import"./useBackgroundColor-DzMPCJiY.js";import"./useSelectedSak-ByhrDQQ_.js";import"./useQuery-BzOtqp34.js";import"./sakerUtils-D08-BRMZ.js";import"./Snarveier-BJOsQgEJ.js";import"./LenkePanel-BnSNkWkj.js";import"./index-CUTh_jqY.js";import"./Header-Cy3CJQKF.js";import"./LayoutWrapper-CjakT9OF.js";import"./StatusTag-DdP1cYLU.js";import"./Tag-DoZ103Zs.js";import"./Stroller-CIWCbzEo.js";import"./NoeGikkGalt-BkML9l7n.js";import"./MinidialogSkjema-DeaFAnzg.js";import"./HarIkkeSaker-DUQnZfeS.js";import"./SøkelenkerPanel-CkbCQIm1.js";import"./HarSaker-ChEvSYYu.js";import"./SakLink-DGnF1SvA.js";import"./guid-CsArkN6i.js";import"./ContentSection-YdZALREM.js";import"./BekreftelseSendtSøknad-BHNxl-HT.js";import"./KontonummerInfo-DiVA_cY6.js";import"./Accordion-rQNBk5in.js";import"./Svangerskapspenger-C2TB6NvG.js";import"./DinPlan-pH5G6HEU.js";import"./Oppgaver-BKmxmciK.js";import"./OppgaveLenkepanel-CkFLO8o6.js";import"./KontaktOss-Bu1WAnJ9.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
