import{k as p,j as t}from"./iframe-BCrCQR0v.js";import{h as e,H as r}from"./index-8OhhmJkJ.js";import{t as a,m as l}from"./tidslinjeHendelser-CSrLeNtM.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-HH8-MNyh.js";import{A as s}from"./queries-z88tTpn9.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Bv_zZ70P.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-BwnSm7gM.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BFa0iUCb.js";import"./useBackgroundColor-CPH3fESu.js";import"./useSelectedSak-CEKMsXMw.js";import"./useQuery-DM-c5BKR.js";import"./sakerUtils-D3UeiCW1.js";import"./Snarveier-BfZwuw-l.js";import"./LenkePanel-BLtxdIi9.js";import"./index-ylXTHoAf.js";import"./Header-DCaALqfb.js";import"./LayoutWrapper-BPI6oFU0.js";import"./StatusTag-Nht5eGpz.js";import"./Tag-CsppBFHH.js";import"./Stroller-Buz3zGce.js";import"./NoeGikkGalt-DtUq3bMe.js";import"./MinidialogSkjema-CZcUXizo.js";import"./HarIkkeSaker-Uup0zu4w.js";import"./SøkelenkerPanel-Kj6X9eSa.js";import"./HarSaker-CgkRgXjZ.js";import"./SakLink-BVVUDSyN.js";import"./guid-CsArkN6i.js";import"./ContentSection-DEf0MvGQ.js";import"./BekreftelseSendtSøknad-Dx_cj2Ak.js";import"./KontonummerInfo-n24VKvHC.js";import"./Accordion-Dz63FtBO.js";import"./Svangerskapspenger-CnvzEZ3u.js";import"./DinPlan-Be27GDyc.js";import"./Oppgaver-usMrH0ca.js";import"./OppgaveLenkepanel-B-5AY0C8.js";import"./KontaktOss-BXwsW6wV.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
