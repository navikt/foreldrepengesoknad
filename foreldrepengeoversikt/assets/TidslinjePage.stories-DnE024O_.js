import{k as p,j as t}from"./iframe-B9HSP4qp.js";import{h as e,H as r}from"./index-9iwXPaj4.js";import{t as a,m as l}from"./tidslinjeHendelser-BKYnDvPT.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-FGFcAlJL.js";import{A as s}from"./queries-DSExmaaY.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-JStjYdXE.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DtADhXcR.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BXy5Numa.js";import"./useBackgroundColor-Bc5DUcE1.js";import"./useSelectedSak-Co5tv0WF.js";import"./useQuery-D9LfzJmJ.js";import"./sakerUtils-BATY1Oe2.js";import"./Snarveier-Cu4Uld-K.js";import"./LenkePanel-CqhZs_xM.js";import"./index-muUyurbi.js";import"./Header-DIuiN90_.js";import"./LayoutWrapper-C6MSbLx_.js";import"./StatusTag-DYRadPNX.js";import"./Tag-91CngL8I.js";import"./Stroller-DuDPoM5T.js";import"./NoeGikkGalt-B0_mLrIM.js";import"./MinidialogSkjema-ydq-e4vS.js";import"./HarIkkeSaker-yOObQw3l.js";import"./SøkelenkerPanel-DJACNlF1.js";import"./HarSaker-B0ByfHOh.js";import"./SakLink-BAyDdCz4.js";import"./guid-CsArkN6i.js";import"./ContentSection-CdlJxfAi.js";import"./BekreftelseSendtSøknad-BkhdoB_7.js";import"./KontonummerInfo-DUGELnay.js";import"./Accordion-CHHxxy_z.js";import"./Svangerskapspenger-CX-gurM_.js";import"./DinPlan-D8_Qn6-l.js";import"./Oppgaver-DXsxeApa.js";import"./OppgaveLenkepanel-CygVlwqD.js";import"./KontaktOss-1AupsRPI.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
