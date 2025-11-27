import{k as p,j as t}from"./iframe-BW2kkloK.js";import{h as e,H as r}from"./index-ckIuG0f7.js";import{t as a,m as l}from"./tidslinjeHendelser-BL-DIDYd.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-CI_JqTt6.js";import{A as s}from"./queries-e80APyLi.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-oIMMhrFa.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DszEz1w8.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DQ9teum_.js";import"./useBackgroundColor-BtdIGEUa.js";import"./useSelectedSak-DNMwSOm3.js";import"./useQuery-B_20SOib.js";import"./sakerUtils-BXXgOMCH.js";import"./Snarveier-Cp_8_J79.js";import"./LenkePanel-BoTurx8t.js";import"./index-CP1B94P8.js";import"./Header-FtP50E7s.js";import"./LayoutWrapper-C_UQdFxB.js";import"./StatusTag-Cez_dqMK.js";import"./Tag-CSTqE-pc.js";import"./Stroller-BVlMcXZ-.js";import"./NoeGikkGalt-ClrU0XSV.js";import"./MinidialogSkjema-DQbuCI6j.js";import"./HarIkkeSaker-zsTEFAd2.js";import"./SøkelenkerPanel-0sdaaZIs.js";import"./HarSaker-B0w4XXtH.js";import"./SakLink-BP4P4Zmo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CWyBn3xH.js";import"./BekreftelseSendtSøknad-ChH1_b9u.js";import"./KontonummerInfo-DYQXMZLa.js";import"./Accordion-Cb-nQoiO.js";import"./Svangerskapspenger-Bd471K9H.js";import"./DinPlan-BEjw_Y4n.js";import"./Oppgaver-DmwAPT7-.js";import"./OppgaveLenkepanel-COfv4noV.js";import"./KontaktOss-B-5PFWSD.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
