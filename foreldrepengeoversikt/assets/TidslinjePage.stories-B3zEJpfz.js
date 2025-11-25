import{i as a,j as t}from"./iframe-DfhuOm1p.js";import{h as r,H as s}from"./index-DcuUSPxh.js";import{t as p,m as l}from"./tidslinjeHendelser-CqA7pp9S.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CoKyF7VU.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Cu57kEJ3.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Cz6h9mYr.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Ce6nUcUV.js";import"./useBackgroundColor-DXbtYaFH.js";import"./useSelectedSak-BqcLUMeI.js";import"./useQuery-CqrCJ8LB.js";import"./sakerUtils-D2sBMFwH.js";import"./Snarveier-BOYFvx8N.js";import"./LenkePanel-DQ0jg2Ni.js";import"./index-C1vfcNr4.js";import"./Header-olX_p8xI.js";import"./LayoutWrapper-CM033Nnl.js";import"./StatusTag-3Vqj1GPt.js";import"./Tag-DP0VEkHF.js";import"./Stroller-DopqtxAp.js";import"./NoeGikkGalt-DHljLYXs.js";import"./MinidialogSkjema-B-lS53OZ.js";import"./HarIkkeSaker-jNnZq5CG.js";import"./SøkelenkerPanel-Bl-Rdn80.js";import"./HarSaker-BRUtCND4.js";import"./SakLink-YLPvHyrl.js";import"./guid-CsArkN6i.js";import"./ContentSection-C0dV7j91.js";import"./BekreftelseSendtSøknad-BplLVhO2.js";import"./KontonummerInfo-DUc_Uixo.js";import"./Accordion-C_BYjU94.js";import"./Svangerskapspenger-7eXEL1S5.js";import"./DinPlan-CixsWM-j.js";import"./Oppgaver-BaNg31iW.js";import"./OppgaveLenkepanel-BBgHXCc8.js";import"./KontaktOss-bWGH_Hl6.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
