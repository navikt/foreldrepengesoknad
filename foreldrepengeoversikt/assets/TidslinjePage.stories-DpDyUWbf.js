import{k as a,j as t}from"./iframe-DTODTPHR.js";import{h as r,H as s}from"./index-Bc6S1zUE.js";import{t as p,m as l}from"./tidslinjeHendelser-D_Vnc323.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C_0kUz1k.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-k2r8NlTv.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DtUuJCRE.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-3oSpPfdv.js";import"./useBackgroundColor-EeogsClN.js";import"./useSelectedSak-DUjNtUDR.js";import"./useQuery-BX1JfT0i.js";import"./sakerUtils-BsdnL673.js";import"./Snarveier-BT7Yd6Ak.js";import"./LenkePanel--t6vfv_U.js";import"./index-lFLYpifo.js";import"./Header-B-aa_y8t.js";import"./LayoutWrapper-D_tBs0kY.js";import"./StatusTag-DZYeoQto.js";import"./Tag-DhoN168a.js";import"./Stroller-mqBKAGdg.js";import"./NoeGikkGalt-DrvX-nCc.js";import"./MinidialogSkjema-DKO0vdMH.js";import"./HarIkkeSaker-CbQiPQc5.js";import"./SøkelenkerPanel-BC-K-9bV.js";import"./HarSaker-Cgs1hyeF.js";import"./SakLink-B0lPv8t6.js";import"./guid-CsArkN6i.js";import"./ContentSection-DmAzdz7M.js";import"./BekreftelseSendtSøknad-C2DtTJiV.js";import"./KontonummerInfo-C0FDLIHF.js";import"./Accordion-DLtDqG1D.js";import"./Svangerskapspenger-DGEggDA-.js";import"./DinPlan-5zQ34PoE.js";import"./Oppgaver-D-3mWMeC.js";import"./OppgaveLenkepanel-BXTiJl8x.js";import"./KontaktOss-BXIodSvl.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
