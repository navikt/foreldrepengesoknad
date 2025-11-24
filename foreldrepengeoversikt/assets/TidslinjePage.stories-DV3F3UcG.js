import{i as a,j as t}from"./iframe-DfsHlNQR.js";import{h as r,H as s}from"./index-raj1jvRH.js";import{t as p,m as l}from"./tidslinjeHendelser-4cNZyBwx.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BMwC7KhQ.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BobwpiCU.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-2quodct1.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-1_aaBdl0.js";import"./useBackgroundColor-Ckyso97t.js";import"./useSelectedSak-mmGPTHcw.js";import"./useQuery-C70ERcNt.js";import"./sakerUtils-DNdkQW-p.js";import"./Snarveier-DrCqrjzO.js";import"./LenkePanel-pTVNUYN-.js";import"./index-DtKNVJWL.js";import"./Header-XQwEkZm0.js";import"./LayoutWrapper-CTlBYWxZ.js";import"./StatusTag-D_ebH6BX.js";import"./Tag-CHisrZLt.js";import"./Stroller-B4kHeNOY.js";import"./NoeGikkGalt-CxGoPlj0.js";import"./MinidialogSkjema-DgM8V8SU.js";import"./HarIkkeSaker-DoXmMy_M.js";import"./SøkelenkerPanel-7HJ0g5TB.js";import"./HarSaker-C6E7GPrH.js";import"./SakLink-CEFEizqy.js";import"./guid-CsArkN6i.js";import"./ContentSection-CIaUFNjN.js";import"./BekreftelseSendtSøknad-BwLAcEC5.js";import"./KontonummerInfo-1YgZRwR6.js";import"./Accordion-CEHysiP4.js";import"./Svangerskapspenger-CCHAELEu.js";import"./DinPlan-dUua_KBM.js";import"./Oppgaver-Cdm4X-pE.js";import"./OppgaveLenkepanel-EsTbXvld.js";import"./KontaktOss-CKAQl96m.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
