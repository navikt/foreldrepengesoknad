import{i as a,j as t}from"./iframe-mJ--PAC2.js";import{h as r,H as o}from"./index-CxtF_tCw.js";import{t as p,m as l}from"./tidslinjeHendelser-DggBZjrB.js";import{s as d}from"./saker-DufbqqUG.js";import{A as s}from"./api-Bhf7waFA.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CPZXxXXf.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX--7RizPfj.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CJ1DjcUt.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BUGDrSoA.js";import"./useSelectedSak-Cd2X_s-G.js";import"./useQuery-xooj_pZC.js";import"./sakerUtils-BNMhmreY.js";import"./Snarveier-BjDTZcIH.js";import"./LenkePanel-DOo9h1br.js";import"./index-DrP1q76Q.js";import"./Header-B8mjh1R-.js";import"./LayoutWrapper-Cn3yrXGD.js";import"./StatusTag-B8ZcT7XY.js";import"./Tag-CsMbggRg.js";import"./Stroller-BI2rboPK.js";import"./NoeGikkGalt-Dw7jIRUa.js";import"./MinidialogSkjema-pxJ1fpEs.js";import"./HarIkkeSaker-MW64OoIw.js";import"./SøkelenkerPanel-BBmW8FE-.js";import"./HarSaker-Dz4Tm9OC.js";import"./SakLink-m5vwtc5V.js";import"./guid-CsArkN6i.js";import"./ContentSection-Czd-Fzpb.js";import"./BekreftelseSendtSøknad-DEkqo-wW.js";import"./KontonummerInfo-DnZbCJhl.js";import"./Accordion-C4D-bFuE.js";import"./Svangerskapspenger-BjhLSkmb.js";import"./DinPlan-CUwEximr.js";import"./Oppgaver-B6zGS0ni.js";import"./OppgaveLenkepanel-aSKjy1Ew.js";import"./KontaktOss-DY7AGywt.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
