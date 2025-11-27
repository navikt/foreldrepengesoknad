import{k as p,j as t}from"./iframe-BuEKraz3.js";import{h as e,H as r}from"./index-CbJlEfr4.js";import{t as a,m as l}from"./tidslinjeHendelser-BcH9gdpQ.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-rVVlan8Q.js";import{A as s}from"./queries-gOGItRt0.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-FEiHnsfm.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-D0KdMILc.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D78SmjTH.js";import"./useBackgroundColor-zu9sEDO-.js";import"./useSelectedSak-wBNLlDSM.js";import"./useQuery-cdg0A-Vs.js";import"./sakerUtils-DtP9Ns3y.js";import"./Snarveier-DzJZvtLh.js";import"./LenkePanel-C9vYgz5I.js";import"./index-4D_FRUZ3.js";import"./Header-Bh8IttFO.js";import"./LayoutWrapper-BL1MmXty.js";import"./StatusTag-R04u91vS.js";import"./Tag-BAELtsCj.js";import"./Stroller-Co0HnOwW.js";import"./NoeGikkGalt-DvasUpkN.js";import"./MinidialogSkjema-C5WesWWy.js";import"./HarIkkeSaker-DT1WZApf.js";import"./SøkelenkerPanel-D1HnVCin.js";import"./HarSaker-CYx5SAOZ.js";import"./SakLink-_CZ2oSqN.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dggqybro.js";import"./BekreftelseSendtSøknad-DpoeSx-c.js";import"./KontonummerInfo-DfuNcLA5.js";import"./Accordion-SrpwNbFt.js";import"./Svangerskapspenger-CIWjwyJZ.js";import"./DinPlan-B5AWhPML.js";import"./Oppgaver-CrNLgyBO.js";import"./OppgaveLenkepanel-CzHyDZB5.js";import"./KontaktOss-BSL2HpkM.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
