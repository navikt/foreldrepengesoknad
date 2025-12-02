import{k as p,j as t}from"./iframe-CQDbWM54.js";import{h as e,H as r}from"./index-CcuaQ2wO.js";import{t as a,m as l}from"./tidslinjeHendelser-IWzUbdw8.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-BpzyWDgE.js";import{A as s}from"./queries-DEUm2iDm.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CBXzeEri.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-B_qEXbOt.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DLMOd8Qg.js";import"./useBackgroundColor-CYaovsM4.js";import"./useSelectedSak-BgTDBGB9.js";import"./useQuery-bPZDoRQi.js";import"./sakerUtils-DI0mgC_7.js";import"./Snarveier-7a1f3CaR.js";import"./LenkePanel-GpT0N5bL.js";import"./index-CusbnjVo.js";import"./Header-ISm-YVSp.js";import"./LayoutWrapper-tJlF9cc0.js";import"./StatusTag-CsL6rjVp.js";import"./Tag-POYWkw4-.js";import"./Stroller-Bj795bX5.js";import"./NoeGikkGalt-OKentaEx.js";import"./MinidialogSkjema-Didm-54m.js";import"./HarIkkeSaker-mRKbZux_.js";import"./SøkelenkerPanel-DYB3X2pC.js";import"./HarSaker-g2jS9WQN.js";import"./SakLink-CoE-VgdX.js";import"./guid-CsArkN6i.js";import"./ContentSection-DLcpelZ-.js";import"./BekreftelseSendtSøknad-D2QeG_xE.js";import"./KontonummerInfo-9isTj-wo.js";import"./Accordion-ViM7JzVb.js";import"./Svangerskapspenger-Bd0x8ljO.js";import"./DinPlan-Cz25UtyY.js";import"./Oppgaver-C58o_8jl.js";import"./OppgaveLenkepanel-DYs3qLlG.js";import"./KontaktOss-VkcqcSZL.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
