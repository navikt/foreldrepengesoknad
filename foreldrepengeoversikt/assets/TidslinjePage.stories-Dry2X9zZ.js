import{k as p,j as t}from"./iframe-CkI39tJu.js";import{h as e,H as r}from"./index-B2Wutxgb.js";import{t as a,m as l}from"./tidslinjeHendelser-CMeM-2mc.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-D9CMKm4Y.js";import{A as s}from"./queries-DCgPOBfN.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BAbEFxem.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-CBIeJUBQ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-_7reR6Ll.js";import"./useBackgroundColor-Bo3ju4Wr.js";import"./useSelectedSak-DYCsjWg4.js";import"./useQuery-du_UWgRf.js";import"./sakerUtils-CpKX21uN.js";import"./Snarveier-Be_OSzmX.js";import"./LenkePanel-B1kVU7T1.js";import"./index-CMskxzv8.js";import"./Header-CQi6JQV8.js";import"./LayoutWrapper-CmLhLp4U.js";import"./StatusTag-D5pphNnU.js";import"./Tag-D83tNWUB.js";import"./Stroller-CGjL-hlB.js";import"./NoeGikkGalt-CrmP7vpt.js";import"./MinidialogSkjema-ChegOyip.js";import"./HarIkkeSaker-DGxz3FKf.js";import"./SøkelenkerPanel-h35Admpu.js";import"./HarSaker-BiFxqA8z.js";import"./SakLink-ChvZ9inw.js";import"./guid-CsArkN6i.js";import"./ContentSection-SFSj46vN.js";import"./BekreftelseSendtSøknad-CbVxpOyd.js";import"./KontonummerInfo-3LGr383u.js";import"./Accordion-DCnoUWWL.js";import"./Svangerskapspenger-BT6HTN2S.js";import"./DinPlan-1haX1x7D.js";import"./Oppgaver-BQcmckyT.js";import"./OppgaveLenkepanel-BI3d1sG9.js";import"./KontaktOss-BtiouI7K.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
