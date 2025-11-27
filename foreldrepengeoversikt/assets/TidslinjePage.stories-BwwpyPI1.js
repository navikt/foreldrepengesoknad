import{k as a,j as t}from"./iframe-hE7ZueP_.js";import{h as r,H as s}from"./index-9WkplJto.js";import{t as p,m as l}from"./tidslinjeHendelser-VpBGO2m1.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DZZ2G4UG.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-ClR8qPIN.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BIhfeY9W.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DbW30xAb.js";import"./useBackgroundColor-C7OKkwPt.js";import"./useSelectedSak-Cnd1d-Nl.js";import"./useQuery-B78uqvSY.js";import"./sakerUtils-tIIPIWoU.js";import"./Snarveier-dgp7IPf3.js";import"./LenkePanel-BzJW49e_.js";import"./index-C3ly5VTD.js";import"./Header-CO-arhRG.js";import"./LayoutWrapper-B1tGDz5o.js";import"./StatusTag-DS8qWndv.js";import"./Tag-AEFQA7EM.js";import"./Stroller-BUs_HgQf.js";import"./NoeGikkGalt-Bl94mmYU.js";import"./MinidialogSkjema-6ayH0-eH.js";import"./HarIkkeSaker-CBjINRiF.js";import"./SøkelenkerPanel-B5CMRjS9.js";import"./HarSaker-CwZW7QRF.js";import"./SakLink-C3kxB0oQ.js";import"./guid-CsArkN6i.js";import"./ContentSection-CR12qQuR.js";import"./BekreftelseSendtSøknad-D9HGmP6p.js";import"./KontonummerInfo-BV7CIt-Z.js";import"./Accordion-CSTTjjNc.js";import"./Svangerskapspenger-ClnyTLSu.js";import"./DinPlan-BUYf3qyf.js";import"./Oppgaver-BlNHy49d.js";import"./OppgaveLenkepanel-B24nEYiV.js";import"./KontaktOss-G6tiI2FX.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
