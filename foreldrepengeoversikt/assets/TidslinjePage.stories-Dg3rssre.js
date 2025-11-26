import{k as a,j as t}from"./iframe-ayp1PzFf.js";import{h as r,H as s}from"./index-CNNYLOy9.js";import{t as p,m as l}from"./tidslinjeHendelser-C0fkbqQB.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DuxThL6Y.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-TePXYqw8.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BrnYPrRp.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D3J8YM8g.js";import"./useBackgroundColor-DLE2PSla.js";import"./useSelectedSak-BiLpQkD6.js";import"./useQuery-DXoGNzGK.js";import"./sakerUtils-Cg_gqxLL.js";import"./Snarveier-C0O8v0Sz.js";import"./LenkePanel-BOs1hnt6.js";import"./index-DPQhQYxe.js";import"./Header-r3wz7UWd.js";import"./LayoutWrapper-CMvptx-F.js";import"./StatusTag-BV5jUjoJ.js";import"./Tag-BWqVFnEz.js";import"./Stroller-BsTgCQks.js";import"./NoeGikkGalt-CzzmqoIp.js";import"./MinidialogSkjema-BnO2zI-s.js";import"./HarIkkeSaker-CivubPkR.js";import"./SøkelenkerPanel-dREjNWki.js";import"./HarSaker-Bd1DTMMY.js";import"./SakLink-BtsJWURr.js";import"./guid-CsArkN6i.js";import"./ContentSection-DS0OB5wD.js";import"./BekreftelseSendtSøknad-Bpi3cdvG.js";import"./KontonummerInfo-lgNoYIAa.js";import"./Accordion-CYUbFKS_.js";import"./Svangerskapspenger-IjjQEpCm.js";import"./DinPlan-C6hDUnug.js";import"./Oppgaver-CugTXTc4.js";import"./OppgaveLenkepanel-CAaLUA6k.js";import"./KontaktOss-DPqnpPoI.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
