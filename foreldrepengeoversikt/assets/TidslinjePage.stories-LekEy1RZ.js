import{i as a,j as t}from"./iframe-DeMdVyFz.js";import{h as r,H as o}from"./index-DFxF8LTV.js";import{t as p,m as l}from"./tidslinjeHendelser-C5tru24R.js";import{s as d}from"./saker-DiIhyAtc.js";import{A as s}from"./api-CTIc8dU1.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-RRoxTlZ5.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B8o3QBJc.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DbHCJ3yV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CGjg97Uv.js";import"./useSelectedSak-B43wDVhB.js";import"./useQuery-BVsQ5Qo4.js";import"./sakerUtils-CGZCxgOb.js";import"./Snarveier-BlVkb3kk.js";import"./LenkePanel-9SRWpbrR.js";import"./index-p-IrSs3w.js";import"./Header-Bawpcy7T.js";import"./LayoutWrapper-Dvhpr5mW.js";import"./StatusTag-7Fi4dN2_.js";import"./Tag-B7QtLav8.js";import"./Stroller-CqCHd3u8.js";import"./NoeGikkGalt-kjfJ13xG.js";import"./MinidialogSkjema-CECB1mwg.js";import"./HarIkkeSaker-D6xalwPN.js";import"./SøkelenkerPanel-DWosoRj4.js";import"./HarSaker-O9X1xpRL.js";import"./SakLink-Dcd5ZEsU.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bzb957AZ.js";import"./BekreftelseSendtSøknad-bKMO9Ay0.js";import"./KontonummerInfo-CHwWxxZ8.js";import"./Accordion-DPJOPdDZ.js";import"./Svangerskapspenger-BTOCcvS6.js";import"./DinPlan-CNXy-J6N.js";import"./Oppgaver-DZeFTbxQ.js";import"./OppgaveLenkepanel-DaqFCHHM.js";import"./KontaktOss-bZh-AyLo.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const et=["Default"];export{e as Default,et as __namedExportsOrder,tt as default};
