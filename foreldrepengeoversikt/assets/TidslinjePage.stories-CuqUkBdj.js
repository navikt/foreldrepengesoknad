import{i as p,j as t}from"./iframe-BvSR-m3F.js";import{h as e,H as o}from"./index-BtiK5rHz.js";import{t as a,m as l}from"./tidslinjeHendelser-CtZ2Pteg.js";import{s as d}from"./saker-Bftj6C8P.js";import{A as s}from"./api-PydfH6DI.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-M1452uW4.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-rxwT3Z_i.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-e-Gguhnk.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BlWmBJxi.js";import"./useSelectedSak-BmuGxmnj.js";import"./useQuery-BNaPzlzC.js";import"./sakerUtils-BStJlMUJ.js";import"./Snarveier-C2SGFbhz.js";import"./LenkePanel-BQ_tNBkD.js";import"./index-BMicn4Ah.js";import"./Dokument-B6-rEyig.js";import"./dokumenterUtils-DVH_5SAA.js";import"./Tag-BxnLPIjr.js";import"./GrupperteDokumenter-DkYWJpk9.js";import"./guid-CsArkN6i.js";import"./Accordion-C8RDjd_g.js";import"./Header-D-jEuxg0.js";import"./LayoutWrapper-CIiNZjDE.js";import"./StatusTag-mMYH377D.js";import"./Stroller-C0Sw-scp.js";import"./NoeGikkGalt-BZCBpm34.js";import"./MinidialogSkjema-DStQIrud.js";import"./BekreftelseSendtSøknad-DT9NLj8G.js";import"./KontonummerInfo-C7yLcuso.js";import"./HarIkkeSaker-DCuT0mtm.js";import"./SøkelenkerPanel-c-QTrKhQ.js";import"./HarSaker-DdsyQKum.js";import"./SakLink-Cu78paHP.js";import"./ContentSection-CdcRt23w.js";import"./Svangerskapspenger-ClfALl-3.js";import"./DinPlan-CsxGqnDT.js";import"./Oppgaver-DTxGjN57.js";import"./OppgaveLenkepanel-Dv0atYx3.js";import"./KontaktOss-ClM9DgGN.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
