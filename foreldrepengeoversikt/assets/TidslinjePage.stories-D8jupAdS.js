import{i as a,j as t}from"./iframe-DwPowOVV.js";import{h as r,H as s}from"./index-Cu2cSMxd.js";import{t as p,m as l}from"./tidslinjeHendelser-DIaetMrV.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C-UvjwXo.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DV33eqdu.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-01WMjudG.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BvGvSp0m.js";import"./useBackgroundColor-BALHOluf.js";import"./useSelectedSak-DMDQ3yeq.js";import"./useQuery-TgKjqL4Q.js";import"./sakerUtils-B1u19GV9.js";import"./Snarveier-DucbgiOv.js";import"./LenkePanel-tgkVQ2-t.js";import"./index-wUH2xFQ-.js";import"./Header-OvBF5qJ-.js";import"./LayoutWrapper-Dgp-4VBt.js";import"./StatusTag-DrHqD9DI.js";import"./Tag-CPvbeEJV.js";import"./Stroller-BN7TFEMV.js";import"./NoeGikkGalt-CbL2XWqB.js";import"./MinidialogSkjema-C3iY2ovj.js";import"./HarIkkeSaker-BT2nE2YM.js";import"./SøkelenkerPanel-DGXXe3ix.js";import"./HarSaker-DwqW-z-K.js";import"./SakLink-CuF8wnAZ.js";import"./guid-CsArkN6i.js";import"./ContentSection-DmNNoTdd.js";import"./BekreftelseSendtSøknad-CHyfG00p.js";import"./KontonummerInfo-CWc22yrT.js";import"./Accordion-dxeT6pYF.js";import"./Svangerskapspenger-DvVLKmJZ.js";import"./DinPlan-C847alVO.js";import"./Oppgaver-BxVqZbIl.js";import"./OppgaveLenkepanel-Cq9lDp4l.js";import"./KontaktOss-C66Hepff.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
