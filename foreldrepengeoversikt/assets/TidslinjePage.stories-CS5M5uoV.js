import{i as a,j as t}from"./iframe-ubt6hJWh.js";import{h as r,H as s}from"./index-CzSY-LO1.js";import{t as p,m as l}from"./tidslinjeHendelser-BG6mKZ0U.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BdREajoi.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DxMkjOeW.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BDmc9U6A.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-tHcM_3S_.js";import"./useBackgroundColor-D6YEoZZv.js";import"./useSelectedSak-DK28zxEt.js";import"./useQuery-kyeTlV0k.js";import"./sakerUtils-B34RzzG6.js";import"./Snarveier-BoGx1rNg.js";import"./LenkePanel-C3S1pY3h.js";import"./index-D7jn_RLc.js";import"./Header-CIfICO3-.js";import"./LayoutWrapper-CwTwl21z.js";import"./StatusTag-eRQ4n-BD.js";import"./Tag-DFMYqHpl.js";import"./Stroller-Czd140Pb.js";import"./NoeGikkGalt-CANBWk7P.js";import"./MinidialogSkjema-BzJbN4qf.js";import"./HarIkkeSaker-BTggaNAK.js";import"./SøkelenkerPanel-SOJujA3Z.js";import"./HarSaker-DMQ-SRgx.js";import"./SakLink-CJkjPvaN.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dufg6pRV.js";import"./BekreftelseSendtSøknad-AdcJfOrU.js";import"./KontonummerInfo-BBAwf9yx.js";import"./Accordion-RIRX6AIc.js";import"./Svangerskapspenger-BzqVNJXa.js";import"./DinPlan-DoIAiAk-.js";import"./Oppgaver-Cyqzeo6_.js";import"./OppgaveLenkepanel-DOBA5RFX.js";import"./KontaktOss-zpSfw1m_.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
