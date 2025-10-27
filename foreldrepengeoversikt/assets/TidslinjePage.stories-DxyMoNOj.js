import{i as p,j as t}from"./iframe-BL1fXp3Z.js";import{h as e,H as o}from"./index-CtMjQgvb.js";import{t as a,m as l}from"./tidslinjeHendelser-BwK27Q2F.js";import{s as d}from"./saker-eujSxlJW.js";import{A as s}from"./api-QlxCNsBs.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DdaGYbo6.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B017oIpK.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DLD4juAC.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DNqCl1xt.js";import"./useSelectedSak-CgHp6Zaz.js";import"./useQuery-DRSe34mH.js";import"./sakerUtils-CWhnQUyi.js";import"./Snarveier-wXe9-G5_.js";import"./LenkePanel-CjQZjc_e.js";import"./index-BLdhdjp7.js";import"./Header-Caz774L4.js";import"./LayoutWrapper-BD9sgz2m.js";import"./StatusTag-FIffnT_r.js";import"./Tag-BBYKCuCF.js";import"./Stroller-r759M7JH.js";import"./NoeGikkGalt-BcyvNw_2.js";import"./MinidialogSkjema-gLEXvcBT.js";import"./HarIkkeSaker-Cyt0mYRA.js";import"./SøkelenkerPanel-CD8kOGYT.js";import"./HarSaker-DnKdMKF0.js";import"./SakLink-EhhX9t7d.js";import"./guid-CsArkN6i.js";import"./ContentSection-CN-rQiPY.js";import"./BekreftelseSendtSøknad-tZuUcB6P.js";import"./dokumenterUtils-DHPQPJjC.js";import"./KontonummerInfo-D1i_pgJ-.js";import"./Accordion-CMeu16a0.js";import"./Svangerskapspenger-ZAOnlef3.js";import"./DinPlan-DjDyWJ4x.js";import"./Oppgaver-Bi1QeTIy.js";import"./OppgaveLenkepanel-DZ4Ai8Cr.js";import"./KontaktOss-Bc2_DnlC.js";const rt={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
