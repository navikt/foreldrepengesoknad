import{k as p,j as t}from"./iframe-CsrCHIbc.js";import{h as e,H as r}from"./index-DeBRi863.js";import{t as a,m as l}from"./tidslinjeHendelser-BgHWHyZN.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-eEQDPYwE.js";import{A as s}from"./queries-ABV-Kb89.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-D3G4Izvl.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-BT_Togjd.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Br7kwxxT.js";import"./useBackgroundColor-B996JjQX.js";import"./useSelectedSak-DqqN2WRN.js";import"./useQuery-C7vIzFLb.js";import"./sakerUtils-Bu6o6iIQ.js";import"./Snarveier-DzIE_NYs.js";import"./LenkePanel-BtEpI36_.js";import"./index-CRl1bXy1.js";import"./Header-qhcU0JHb.js";import"./LayoutWrapper-BddlD66g.js";import"./StatusTag-CM50faVs.js";import"./Tag-DZlRYcM7.js";import"./Stroller-CReGhqWv.js";import"./NoeGikkGalt-DTnp1XDV.js";import"./MinidialogSkjema-DM-ejKKG.js";import"./HarIkkeSaker-DZCg0dUh.js";import"./SøkelenkerPanel-BFXcCzwO.js";import"./HarSaker-D8e86T-K.js";import"./SakLink-3L45Dotl.js";import"./guid-CsArkN6i.js";import"./ContentSection-B92sY39o.js";import"./BekreftelseSendtSøknad-Udn-yYK0.js";import"./KontonummerInfo-C3b7MQFO.js";import"./Accordion-SvuOuvUa.js";import"./Svangerskapspenger-VKi3Fzxh.js";import"./DinPlan-DVOKnsQv.js";import"./Oppgaver-BIYJtBra.js";import"./OppgaveLenkepanel-DN_a99S8.js";import"./KontaktOss-B8lfVYF3.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
