import{i as a,j as t}from"./iframe-C9KJPXfJ.js";import{h as r,H as s}from"./index-PZEFNuCP.js";import{t as p,m as l}from"./tidslinjeHendelser-oLe0CcQZ.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-B_y6eeU-.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CVCH8n0n.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D07ZEwuW.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D166v1Fz.js";import"./useBackgroundColor-BF205jm4.js";import"./useSelectedSak-M-pn9ZSG.js";import"./useQuery-DrsC5nQQ.js";import"./sakerUtils-DFPkUgcB.js";import"./Snarveier-CXyjwRVg.js";import"./LenkePanel-C-89pSnx.js";import"./index-BvcktY-y.js";import"./Header-tCW2H_BJ.js";import"./LayoutWrapper-DaZFO2Bc.js";import"./StatusTag-BVNqvnOs.js";import"./Tag-Bz-v3O4J.js";import"./Stroller-k5BT6F3K.js";import"./NoeGikkGalt-BaO-U9hj.js";import"./MinidialogSkjema-BYtYcCu9.js";import"./HarIkkeSaker-BEipbVUc.js";import"./SøkelenkerPanel-r04Kqow1.js";import"./HarSaker-GvpkX1O0.js";import"./SakLink-CPHeRMll.js";import"./guid-CsArkN6i.js";import"./ContentSection-BcoPijCc.js";import"./BekreftelseSendtSøknad-CyFkFUlx.js";import"./KontonummerInfo-BmoviD5c.js";import"./Accordion-BHZzDM_0.js";import"./Svangerskapspenger-D_RZGhKa.js";import"./DinPlan-DatJ8Ixq.js";import"./Oppgaver-CL3y6tOy.js";import"./OppgaveLenkepanel-BLSD2k2_.js";import"./KontaktOss-JQJX9adU.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
