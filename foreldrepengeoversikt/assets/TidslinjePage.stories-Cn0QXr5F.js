import{i as p,j as t}from"./iframe-V-4o2Cg9.js";import{h as e,H as o}from"./index-Bgu2Y1sX.js";import{t as a,m as l}from"./tidslinjeHendelser-CYvFA5Ux.js";import{s as d}from"./saker-DYF4rZ_R.js";import{A as s}from"./api-Cvuszg4G.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BrBx26y8.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B7ZijZcf.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-VcmdVIIG.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BGm46wQ8.js";import"./useSelectedSak-OaKpYvfc.js";import"./useQuery-Nx4rUoOy.js";import"./sakerUtils-CP9pjmaI.js";import"./Snarveier-DJOKdd_k.js";import"./LenkePanel-DVYJ97wP.js";import"./index-DfM3Uvj9.js";import"./Dokument-D09Oyioz.js";import"./dokumenterUtils-D6DPVjI8.js";import"./Tag-CiL-0OBn.js";import"./GrupperteDokumenter-C_59NnnH.js";import"./guid-CsArkN6i.js";import"./Accordion-BeDmwm3h.js";import"./Header-D1G7vTcI.js";import"./LayoutWrapper-C9NOLLLF.js";import"./StatusTag-vhlHd1fR.js";import"./Stroller-DUqUx0cx.js";import"./NoeGikkGalt-B6JT7OAH.js";import"./MinidialogSkjema-lZTf8njg.js";import"./BekreftelseSendtSøknad-21VopryV.js";import"./KontonummerInfo-Bw-o0KoQ.js";import"./HarIkkeSaker-6K3MrErl.js";import"./SøkelenkerPanel-B-hZg0Yh.js";import"./HarSaker-DawTTg5L.js";import"./SakLink-Be4-JBXw.js";import"./ContentSection-DCFTWyDA.js";import"./Svangerskapspenger-mazf80KE.js";import"./DinPlan-BxDUvK0w.js";import"./Oppgaver-CXI1PZ_k.js";import"./OppgaveLenkepanel-WfL79Cjr.js";import"./KontaktOss-CaIrSYCD.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,ot as default};
