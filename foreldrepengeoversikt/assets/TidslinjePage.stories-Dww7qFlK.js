import{i as p,j as t}from"./iframe-CcBOHSS2.js";import{h as e,H as o}from"./index-CykT5Li_.js";import{t as a,m as l}from"./tidslinjeHendelser-BgjVfB6U.js";import{s as d}from"./saker-CI5AA6iY.js";import{A as s}from"./api-DN1waq4L.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-fa58-Ass.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CzCOg6Ei.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BnAmnx1h.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DztxFp_-.js";import"./useSelectedSak-D6ohSfj8.js";import"./useQuery-DhMnrYQL.js";import"./sakerUtils-C8P93cPZ.js";import"./Snarveier-C53S4wnm.js";import"./LenkePanel-B10YXDB2.js";import"./index-BggOb6ce.js";import"./Header-B6GfEkXW.js";import"./LayoutWrapper-BtdteCcN.js";import"./StatusTag-BnIGtfIS.js";import"./Tag-C6pIc_Qv.js";import"./Stroller-DljhvyMB.js";import"./NoeGikkGalt-BZFjLcNz.js";import"./MinidialogSkjema-BcoaurJm.js";import"./HarIkkeSaker-DD_ftD0S.js";import"./SøkelenkerPanel-L7VaowWh.js";import"./HarSaker-DWXiGN_n.js";import"./SakLink-CXJdeDUf.js";import"./guid-CsArkN6i.js";import"./ContentSection-CtdC4mI8.js";import"./BekreftelseSendtSøknad-ybCC-t9A.js";import"./dokumenterUtils-CfsBjkIS.js";import"./KontonummerInfo-BQxVfnSa.js";import"./Accordion-Dz7bmdDo.js";import"./Svangerskapspenger-CIKrCs8F.js";import"./DinPlan-B3hVL7ux.js";import"./Oppgaver-DgQx4QSh.js";import"./OppgaveLenkepanel-jan2rp-9.js";import"./KontaktOss-Brrvjpwr.js";const rt={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
