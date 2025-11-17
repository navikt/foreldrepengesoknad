import{i as a,j as t}from"./iframe-DCBFZ9Q-.js";import{h as r,H as s}from"./index-BzJfNrrS.js";import{t as p,m as l}from"./tidslinjeHendelser-4NpfSYBA.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-9rwfaLg3.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CJXlTNWe.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-qqXxuGOL.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DdHO-OFm.js";import"./useBackgroundColor-BTLe5R6t.js";import"./useSelectedSak-BqpPsSrx.js";import"./useQuery-C1Vh1U2b.js";import"./sakerUtils-CmoHd0AV.js";import"./Snarveier-Drv9YCYt.js";import"./LenkePanel-DTBdcolN.js";import"./index-DRJqjQMq.js";import"./Header-BlZS7yMK.js";import"./LayoutWrapper-UD0c4_Z4.js";import"./StatusTag-CoxaNhgf.js";import"./Tag-Dx1-Z7aj.js";import"./Stroller-CSaU2C8h.js";import"./NoeGikkGalt-qBqxv1aJ.js";import"./MinidialogSkjema-Cmg5NqKg.js";import"./HarIkkeSaker-D-UO0pql.js";import"./SøkelenkerPanel-DeZucjvB.js";import"./HarSaker-BpfDrv8G.js";import"./SakLink-C9RgVJvl.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bqtzera5.js";import"./BekreftelseSendtSøknad-C2VBHMC6.js";import"./KontonummerInfo-B6zQm0pN.js";import"./Accordion-R0KVqJur.js";import"./Svangerskapspenger-CPBXlPBv.js";import"./DinPlan-BKnG9chZ.js";import"./Oppgaver-BTLs-tjT.js";import"./OppgaveLenkepanel-D3jNVGAC.js";import"./KontaktOss-B8uxgg_Q.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
