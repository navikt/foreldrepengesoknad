import{k as p,j as t}from"./iframe-CkO2BxIM.js";import{h as e,H as r}from"./index-lXDJA5cK.js";import{t as a,m as l}from"./tidslinjeHendelser-shknpvFE.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-Be6q0uwS.js";import{A as s}from"./queries-CBn9MapI.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-C4MSJWUT.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-BG7iv1IQ.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-Dg0BRpJr.js";import"./useBackgroundColor-BgXOUJCH.js";import"./useSelectedSak-Cb3uTSxF.js";import"./useQuery-BkCXl_YK.js";import"./sakerUtils-CIuOUtuB.js";import"./Snarveier-BzgDWER_.js";import"./LenkePanel-D_Y1KnD1.js";import"./index-B5VWAz0p.js";import"./Header-CPHaG3j0.js";import"./LayoutWrapper-DQejaoLO.js";import"./StatusTag-Cv5wCvgQ.js";import"./Tag-rXPF2e-c.js";import"./Stroller-BDtCI11F.js";import"./NoeGikkGalt-DU0NZcGb.js";import"./MinidialogSkjema-CqQGiXY0.js";import"./HarIkkeSaker-D00iyc8e.js";import"./SøkelenkerPanel-BRv6Gltd.js";import"./HarSaker-Cj8KX7Sc.js";import"./SakLink-CH0KsLA4.js";import"./guid-CsArkN6i.js";import"./ContentSection-BXrBK2H7.js";import"./BekreftelseSendtSøknad-vXN_DWr1.js";import"./KontonummerInfo-Dz3nUj9O.js";import"./Accordion-D2zOtfE3.js";import"./Svangerskapspenger-vu6NxAlZ.js";import"./DinPlan-C8Iy1xIw.js";import"./Oppgaver-Dwq7raX8.js";import"./OppgaveLenkepanel-CegIj_4c.js";import"./KontaktOss-Bk84j2A5.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
