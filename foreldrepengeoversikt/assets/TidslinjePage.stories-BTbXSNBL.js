import{k as p,j as t}from"./iframe-BjlKaXeH.js";import{h as e,H as r}from"./index-xGhD4f9l.js";import{t as a,m as l}from"./tidslinjeHendelser-DPteT6yT.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-BK8SqheW.js";import{A as s}from"./queries-ApZ5HlLW.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BGlp2_pz.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-C8cv5mIt.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DKu_vsWF.js";import"./useBackgroundColor-gWs1wuiL.js";import"./useSelectedSak-6HWFh3gy.js";import"./useQuery-BjJxPG7d.js";import"./sakerUtils-CbUnUW2R.js";import"./Snarveier-B_yODw6T.js";import"./LenkePanel-cSapLc6u.js";import"./index-pwP9y4Ft.js";import"./Header-ClV9TLSa.js";import"./LayoutWrapper-BQpHQ1Ih.js";import"./StatusTag-C8Xh1ZAy.js";import"./Tag-_QYEH3MK.js";import"./Stroller-CycKOKxz.js";import"./NoeGikkGalt-YyrXwoqz.js";import"./MinidialogSkjema-CyJnughZ.js";import"./HarIkkeSaker-Kyk26pH9.js";import"./SøkelenkerPanel-NCXHFl64.js";import"./HarSaker-DalpbYjL.js";import"./SakLink-BOzdJPVK.js";import"./guid-CsArkN6i.js";import"./ContentSection-DD5OJOFf.js";import"./BekreftelseSendtSøknad-BYLZDmJP.js";import"./KontonummerInfo-B-fcikkB.js";import"./Accordion-DBvPYA90.js";import"./Svangerskapspenger-Du3gs_Q-.js";import"./DinPlan-DM5bMxk3.js";import"./Oppgaver-CvNmB7fX.js";import"./OppgaveLenkepanel-DUyz41BR.js";import"./KontaktOss-Nu6E4xs2.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
