import{i as p,j as t}from"./iframe-V8Dp4QW5.js";import{h as e,H as o}from"./index-H8_vY0zy.js";import{t as a,m as l}from"./tidslinjeHendelser-2fpwZ76s.js";import{s as d}from"./saker-DxEHxm2C.js";import{A as s}from"./api-DttI5pae.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-D6Npo6sC.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D3gIy50c.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BI9f7GfG.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-03FOBSty.js";import"./useSelectedSak-4hRGJq8p.js";import"./useQuery-D0cJSrDC.js";import"./sakerUtils-DfWZRngC.js";import"./Snarveier-D6jGLqPI.js";import"./LenkePanel-DLDRkz7p.js";import"./index-BpMDWgtc.js";import"./Dokument-NYUNmoCr.js";import"./dokumenterUtils-ID-p_N4Y.js";import"./Tag-ZC2hYRMp.js";import"./GrupperteDokumenter-DfSto9Uc.js";import"./guid-CsArkN6i.js";import"./Accordion-CB83Ignc.js";import"./Header-BxepwnHK.js";import"./LayoutWrapper-Dngjcj2A.js";import"./StatusTag-BMKINm4X.js";import"./Stroller-6d1RPYmE.js";import"./NoeGikkGalt-DHpAyMxT.js";import"./MinidialogSkjema-DfFPftox.js";import"./BekreftelseSendtSøknad-D0Qqi2pb.js";import"./KontonummerInfo-CXf0Z14b.js";import"./HarIkkeSaker-CUAEXY0f.js";import"./SøkelenkerPanel-BxtniV6f.js";import"./HarSaker-BFfIttpY.js";import"./SakLink-Bo_lmf-r.js";import"./ContentSection-B_EhtPdC.js";import"./Svangerskapspenger-CO9WFxoz.js";import"./DinPlan-D36wGjXx.js";import"./Oppgaver-CHDxg1M3.js";import"./OppgaveLenkepanel-VNbUfY_b.js";import"./KontaktOss-CK9ny5_k.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
