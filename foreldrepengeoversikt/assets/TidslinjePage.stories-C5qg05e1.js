import{k as p,j as t}from"./iframe-D4ZRvRZm.js";import{h as e,H as r}from"./index-DoOEpirF.js";import{t as a,m as l}from"./tidslinjeHendelser-DYCffkVy.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-BhkQN6h6.js";import{A as s}from"./queries-BDTvf_DD.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Wu2NMRXp.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-Nk9_1oaD.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BcF04kXj.js";import"./useBackgroundColor-BtWh0dT_.js";import"./useSelectedSak-l6KvJKBE.js";import"./useQuery-BkeLPUzO.js";import"./sakerUtils-BRqXJ2Wu.js";import"./Snarveier-CfPTA1XK.js";import"./LenkePanel-C5-hQyW8.js";import"./index-CwgF17RF.js";import"./Header-B_Ug1AI3.js";import"./LayoutWrapper-w1kQTQMM.js";import"./StatusTag-DV3T5GvE.js";import"./Tag-Fxyy65H3.js";import"./Stroller-DaBxZUpC.js";import"./NoeGikkGalt-CCvhBpgV.js";import"./MinidialogSkjema-xCRlUImz.js";import"./HarIkkeSaker-I8WntoPe.js";import"./SøkelenkerPanel-w6yxwyUl.js";import"./HarSaker-Dt3ppvRl.js";import"./SakLink-aenGUUEd.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cz93Z5ZI.js";import"./BekreftelseSendtSøknad-C9fhXA7g.js";import"./KontonummerInfo-C-D-2BIC.js";import"./Accordion-D34Wddr3.js";import"./Svangerskapspenger-CDcBMGFX.js";import"./DinPlan-BoW-ERS3.js";import"./Oppgaver-ixsLVEH3.js";import"./OppgaveLenkepanel-UNYdVd8q.js";import"./KontaktOss-X46L8eZa.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
