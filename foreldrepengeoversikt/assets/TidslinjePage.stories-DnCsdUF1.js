import{i as a,j as t}from"./iframe-CYd54ksq.js";import{h as r,H as s}from"./index-anbsQTXw.js";import{t as p,m as l}from"./tidslinjeHendelser-CtovE2l9.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C9c4B7F4.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Y8PvsNnr.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CnSTt7Pl.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CnVuRHYU.js";import"./useBackgroundColor-BCPm2HRH.js";import"./useSelectedSak-Dhxo7ALA.js";import"./useQuery-CFzlq3rk.js";import"./sakerUtils-CdW6VLF4.js";import"./Snarveier-D6W9JpBs.js";import"./LenkePanel-B2p2LHRR.js";import"./index-q9ygLvhk.js";import"./Header-DDPu0YIH.js";import"./LayoutWrapper-C_mO9IzW.js";import"./StatusTag-D5YXFkSJ.js";import"./Tag-f1Dl2yq1.js";import"./Stroller-Bn8vlswg.js";import"./NoeGikkGalt-Bf2p9_II.js";import"./MinidialogSkjema-vZLfTQDY.js";import"./HarIkkeSaker-cAWVsoyS.js";import"./SøkelenkerPanel-BLT0Gs26.js";import"./HarSaker-ClpbHehv.js";import"./SakLink-o0m3KdRV.js";import"./guid-CsArkN6i.js";import"./ContentSection-CBqCb8Nn.js";import"./BekreftelseSendtSøknad-Caw5G_Cl.js";import"./KontonummerInfo-CfX8GOgB.js";import"./Accordion-lko_WLmy.js";import"./Svangerskapspenger-B_ukJvFc.js";import"./DinPlan-de-6fk5s.js";import"./Oppgaver-CuR-g4En.js";import"./OppgaveLenkepanel-Dadq-zjX.js";import"./KontaktOss-t27wZqNF.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
