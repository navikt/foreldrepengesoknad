import{i as a,j as t}from"./iframe-DubCCuBH.js";import{h as r,H as s}from"./index--HMxUv-e.js";import{t as p,m as l}from"./tidslinjeHendelser-SMzfgJ1j.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BAn3AEA1.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-COVzrBmh.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DGlmLL0c.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DiTMgbnp.js";import"./useBackgroundColor-CabR1IC9.js";import"./useSelectedSak-CCRVhSIQ.js";import"./useQuery-fSFm_tzA.js";import"./sakerUtils-C0cihgiZ.js";import"./Snarveier-DmzUJGwi.js";import"./LenkePanel-DXB8_jfa.js";import"./index-D4tGDKij.js";import"./Header-a4zsYGEJ.js";import"./LayoutWrapper-BLMZoI6Q.js";import"./StatusTag-DVQ0DHhx.js";import"./Tag-B1BrqHtw.js";import"./Stroller-CbLRI6PP.js";import"./NoeGikkGalt-CAoZwdYl.js";import"./MinidialogSkjema-CMb4BmQ2.js";import"./HarIkkeSaker-CeYTASno.js";import"./SøkelenkerPanel-CoTG1WiZ.js";import"./HarSaker-a39jrMzI.js";import"./SakLink-BvvT01yF.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dy9UOCzb.js";import"./BekreftelseSendtSøknad-fUwcYWTs.js";import"./KontonummerInfo-BVuqGvKA.js";import"./Accordion-BZt3-akV.js";import"./Svangerskapspenger-Bf7i9FWM.js";import"./DinPlan-4zODCm87.js";import"./Oppgaver-C9gabxut.js";import"./OppgaveLenkepanel-CBrl4TVg.js";import"./KontaktOss-B65eyTNG.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
