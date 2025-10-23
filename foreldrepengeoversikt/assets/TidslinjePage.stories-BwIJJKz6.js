import{i as p,j as t}from"./iframe-B9B24InY.js";import{h as e,H as o}from"./index-1n_Xk7dt.js";import{t as a,m as l}from"./tidslinjeHendelser-CdOIriwH.js";import{s as d}from"./saker-CO7YLNYW.js";import{A as s}from"./api-CSP2sNTp.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Bhumteee.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dy2A5nXz.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DaaeGSlc.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-wYwX6DJl.js";import"./useSelectedSak-DG7bT9oy.js";import"./useQuery-ClPdkV49.js";import"./sakerUtils-ymwfUV_S.js";import"./Snarveier-Dcfg7Ld-.js";import"./LenkePanel-C5vIOUpk.js";import"./index-DhaW3C1i.js";import"./Header-BVhYLwR6.js";import"./LayoutWrapper-CbmgYr_o.js";import"./StatusTag-w8vt0jS-.js";import"./Tag-DMXbAgRR.js";import"./Stroller-DTvGppLu.js";import"./NoeGikkGalt-DjTN5zy9.js";import"./MinidialogSkjema-Bpdv1erZ.js";import"./BekreftelseSendtSøknad-CvuNHOIn.js";import"./dokumenterUtils-B2p0j5Z9.js";import"./KontonummerInfo-B26IZ7th.js";import"./Accordion-ClEbAVNQ.js";import"./HarIkkeSaker-CSRo86u9.js";import"./SøkelenkerPanel-kARGyTQ9.js";import"./HarSaker-Bk7rSjkT.js";import"./SakLink-BrZpNebl.js";import"./guid-CsArkN6i.js";import"./ContentSection-BIVPiCvb.js";import"./Svangerskapspenger-DMDzyQQn.js";import"./DinPlan-DkCgkyyh.js";import"./Oppgaver-C5TpCysj.js";import"./OppgaveLenkepanel-DZcQMCvV.js";import"./KontaktOss-j4GMBYs8.js";const rt={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...r.parameters?.docs?.source}}};const et=["Default"];export{r as Default,et as __namedExportsOrder,rt as default};
