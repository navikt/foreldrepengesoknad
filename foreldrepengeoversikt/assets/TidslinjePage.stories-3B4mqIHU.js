import{i as a,j as t}from"./iframe-CDh7LS05.js";import{h as r,H as s}from"./index-DrOnfQ8j.js";import{t as p,m as l}from"./tidslinjeHendelser-BGeRvhaT.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CT5Ry5RB.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BWamefw0.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DZPPIY51.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-IU9wTeTb.js";import"./useBackgroundColor-Byos69Bd.js";import"./useSelectedSak-D5BB6SOt.js";import"./useQuery-Bf_ICF7R.js";import"./sakerUtils-CiEf4Vt-.js";import"./Snarveier-Bc1bGlrm.js";import"./LenkePanel-DN4j56A_.js";import"./index-f2M_q7F4.js";import"./Header-BqPEIu1L.js";import"./LayoutWrapper-BcbXs8FG.js";import"./StatusTag-9R-N5snm.js";import"./Tag-HNSj6flu.js";import"./Stroller-dS5rDCxg.js";import"./NoeGikkGalt-DXpQOWMs.js";import"./MinidialogSkjema-BPmSCB-f.js";import"./HarIkkeSaker-D6zIhHe0.js";import"./SøkelenkerPanel-CwWaBwsh.js";import"./HarSaker-CwZNQdC5.js";import"./SakLink-BqvdnCMw.js";import"./guid-CsArkN6i.js";import"./ContentSection-DfnkuDGg.js";import"./BekreftelseSendtSøknad-BUptABgt.js";import"./KontonummerInfo-DRwKbX1v.js";import"./Accordion-C-y4PEDh.js";import"./Svangerskapspenger-XvZwB59b.js";import"./DinPlan-DEnwdxW7.js";import"./Oppgaver-B47zwSiT.js";import"./OppgaveLenkepanel-C2Gb2m9U.js";import"./KontaktOss-DAb0x47t.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
