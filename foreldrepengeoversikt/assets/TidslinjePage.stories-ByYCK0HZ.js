import{i as a,j as t}from"./iframe-BGJaxDwk.js";import{h as r,H as s}from"./index-C9R8n3FA.js";import{t as p,m as l}from"./tidslinjeHendelser-BN0biyXc.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-D7oTTkbF.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BT5nJI5L.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BbV8VSB6.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DafeCD1R.js";import"./useBackgroundColor-zAlxD0PX.js";import"./useSelectedSak-D2YzrH6y.js";import"./useQuery-Bs7knLIG.js";import"./sakerUtils-B_Iu6HbS.js";import"./Snarveier-jaIr2MtN.js";import"./LenkePanel-aevU1Nm5.js";import"./index-B7nY9xy0.js";import"./Header-DKgW89zR.js";import"./LayoutWrapper-BTeQUC6m.js";import"./StatusTag-BuFbT8YM.js";import"./Tag-BrPJZwR8.js";import"./Stroller-C_EErbSU.js";import"./NoeGikkGalt-CmE8IeLf.js";import"./MinidialogSkjema-CTn2Anji.js";import"./HarIkkeSaker-CJ3dnNIP.js";import"./SøkelenkerPanel-Bx4yLt--.js";import"./HarSaker-CcCWuQL3.js";import"./SakLink-BaiCZ3-s.js";import"./guid-CsArkN6i.js";import"./ContentSection-ClGjDo9c.js";import"./BekreftelseSendtSøknad-dHn49SzE.js";import"./KontonummerInfo-BgWdeHX7.js";import"./Accordion-CKScJEZM.js";import"./Svangerskapspenger-T91ZceAx.js";import"./DinPlan-znnIPW5k.js";import"./Oppgaver-wQaoTqCu.js";import"./OppgaveLenkepanel-CggCx_86.js";import"./KontaktOss-B6rQenr0.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
