import{i as a,j as t}from"./iframe-ewta0zoB.js";import{h as r,H as s}from"./index-DYBx3BJA.js";import{t as p,m as l}from"./tidslinjeHendelser-rqbTzw7z.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C21Jq0o5.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-nWcPGQZX.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CZRXR8Oi.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Cw1q8QEH.js";import"./useBackgroundColor-C3FyfSYs.js";import"./useSelectedSak-C5HrQucG.js";import"./useQuery-BMkCW8yb.js";import"./sakerUtils-abk-UzAL.js";import"./Snarveier-CCosxwoz.js";import"./LenkePanel-CnZRGzcN.js";import"./index-DJHXksu0.js";import"./Header-DYpOQRZc.js";import"./LayoutWrapper-BP5p28Vx.js";import"./StatusTag-CeTr9WS2.js";import"./Tag-DvP8raPO.js";import"./Stroller-Dk3WdcPO.js";import"./NoeGikkGalt-BrIfG0Bn.js";import"./MinidialogSkjema-BnzrnENN.js";import"./HarIkkeSaker-BhcIwSZ8.js";import"./SøkelenkerPanel-CAn8LAJp.js";import"./HarSaker-4YWI71Bo.js";import"./SakLink-jt55ibW3.js";import"./guid-CsArkN6i.js";import"./ContentSection-COhmy0Xe.js";import"./BekreftelseSendtSøknad-BDVsEicl.js";import"./KontonummerInfo-DMVi81gc.js";import"./Accordion-CfMuXmwj.js";import"./Svangerskapspenger-DP8pYzEP.js";import"./DinPlan-B8M1APNT.js";import"./Oppgaver-BE-H1CGp.js";import"./OppgaveLenkepanel-DzE9g4fK.js";import"./KontaktOss-DCtT5Yad.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
