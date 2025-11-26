import{k as a,j as t}from"./iframe-CvBO9uPy.js";import{h as r,H as s}from"./index-CS8Thq-9.js";import{t as p,m as l}from"./tidslinjeHendelser-DXGqI5TA.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DEXcKo81.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-C7IFLJQW.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CvzZTRj1.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-zG-1Ayg8.js";import"./useBackgroundColor-ZkCDyZJE.js";import"./useSelectedSak-dqLwXw15.js";import"./useQuery-C4W7Brek.js";import"./sakerUtils-DxfMKcVz.js";import"./Snarveier-D_clk95o.js";import"./LenkePanel-LJkEhCBu.js";import"./index-CxcyeAAl.js";import"./Header-D7SvOtpd.js";import"./LayoutWrapper-skJmpsQ9.js";import"./StatusTag-U-EcESpL.js";import"./Tag-Dk5KXySt.js";import"./Stroller-DNUs_Bjz.js";import"./NoeGikkGalt-B_XG5QgK.js";import"./MinidialogSkjema-DxMHE9Od.js";import"./HarIkkeSaker-DrnxFRoQ.js";import"./SøkelenkerPanel-DB3wlNQU.js";import"./HarSaker-WuIvmALN.js";import"./SakLink-Cz-BAnGJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-_bUQoaNL.js";import"./BekreftelseSendtSøknad-BQd0B6y5.js";import"./KontonummerInfo-7Avw1xoz.js";import"./Accordion-CqeZDodw.js";import"./Svangerskapspenger-BqBGWmnT.js";import"./DinPlan-DtkAnau4.js";import"./Oppgaver-BgRPKn7c.js";import"./OppgaveLenkepanel-qbb6lSUD.js";import"./KontaktOss-6MQHuXiZ.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
