import{i as p,j as t}from"./iframe-BpcFlHR3.js";import{h as e,H as o}from"./index-DLgL99dF.js";import{t as a,m as l}from"./tidslinjeHendelser-DYPPyyJ4.js";import{s as d}from"./saker-BiCmNQTS.js";import{A as s}from"./api-2sZWLpXp.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-jkCE6ENw.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BIWXRlNN.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BheHsytM.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-FmlZG-oL.js";import"./useSelectedSak-DCFyXuoz.js";import"./useQuery-DIRLTKP9.js";import"./sakerUtils-Di2_lBW3.js";import"./Snarveier-CA6TpJbG.js";import"./LenkePanel-DZyg9Fdc.js";import"./index-JGOV9MjI.js";import"./Header-D78FD_TG.js";import"./LayoutWrapper-B2UbXtGc.js";import"./StatusTag-hz7RNn_b.js";import"./Tag-DTYPMkPN.js";import"./Stroller-M2Ih8LNO.js";import"./NoeGikkGalt-CpS3hwIm.js";import"./MinidialogSkjema-UTwWqXBw.js";import"./HarIkkeSaker-yJGnXOzr.js";import"./SøkelenkerPanel-Cl0o2qWE.js";import"./HarSaker-D0jt-SEc.js";import"./SakLink-DeuEuTfu.js";import"./guid-CsArkN6i.js";import"./ContentSection-D-RUjSuG.js";import"./BekreftelseSendtSøknad-D2cY4xTs.js";import"./dokumenterUtils-DlyshBRG.js";import"./KontonummerInfo-BtlpF1lA.js";import"./Accordion-h_jJmoG6.js";import"./Svangerskapspenger-BULk21CS.js";import"./DinPlan-pwR8BbR5.js";import"./Oppgaver-CX6h0PWJ.js";import"./OppgaveLenkepanel-CeGsp-zD.js";import"./KontaktOss-CxMYhKfI.js";const rt={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const et=["Default"];export{r as Default,et as __namedExportsOrder,rt as default};
