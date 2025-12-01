import{k as p,j as t}from"./iframe-QmW8yyfr.js";import{h as e,H as r}from"./index-DT5H2IQf.js";import{t as a,m as l}from"./tidslinjeHendelser-Da4letku.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-C0IWmmKb.js";import{A as s}from"./queries-DNPo2YFS.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BZcZgjzo.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-u_aghOKG.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-WzfyCqW0.js";import"./useBackgroundColor-DjWI0hr-.js";import"./useSelectedSak-D7g9ouEy.js";import"./useQuery-msRKoXPE.js";import"./sakerUtils-_hwOIFg4.js";import"./Snarveier-CnGI10PA.js";import"./LenkePanel-C7NXbJru.js";import"./index-Bjj7dcVg.js";import"./Header-8ZC1M_C5.js";import"./LayoutWrapper-B06TOb_9.js";import"./StatusTag-DWvD2uob.js";import"./Tag-D5FF978f.js";import"./Stroller-DNw5-FVJ.js";import"./NoeGikkGalt-KcuN262E.js";import"./MinidialogSkjema-QWx-cL-y.js";import"./HarIkkeSaker-4T-ZRBPl.js";import"./SøkelenkerPanel-BXK4Llpu.js";import"./HarSaker-FFN3GHLp.js";import"./SakLink-BwG_j1c2.js";import"./guid-CsArkN6i.js";import"./ContentSection-CtkPnE1R.js";import"./BekreftelseSendtSøknad-CwdduCUa.js";import"./KontonummerInfo-Bh3o7vvO.js";import"./Accordion-Cr3PsVNm.js";import"./Svangerskapspenger-CqLDPov6.js";import"./DinPlan-BraZXQt-.js";import"./Oppgaver-DWjJcew2.js";import"./OppgaveLenkepanel-CMRhuHQY.js";import"./KontaktOss-BREtBSj0.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
