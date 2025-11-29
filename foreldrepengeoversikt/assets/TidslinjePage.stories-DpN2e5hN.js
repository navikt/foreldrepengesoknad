import{k as p,j as t}from"./iframe-SpUec8zk.js";import{h as e,H as r}from"./index-DLQXgwxg.js";import{t as a,m as l}from"./tidslinjeHendelser-xQJRvThJ.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-C6R0c0ve.js";import{A as s}from"./queries-BkLaiL-R.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DxCv51Rv.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-CRJMJ6mS.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BtgCzTSB.js";import"./useBackgroundColor-DmOQ8unn.js";import"./useSelectedSak-DXa8m4g1.js";import"./useQuery-BC8yk2V_.js";import"./sakerUtils-U1mkJAs7.js";import"./Snarveier-Cl3zj2-N.js";import"./LenkePanel-ClEl6aR5.js";import"./index-aIej0BVo.js";import"./Header-BFvJcSLo.js";import"./LayoutWrapper-D0_bbN7W.js";import"./StatusTag-A86hxuie.js";import"./Tag-By28nXtR.js";import"./Stroller-C32oUmAh.js";import"./NoeGikkGalt-83Erab1l.js";import"./MinidialogSkjema-DYQ56jFi.js";import"./HarIkkeSaker-CJDMcMGS.js";import"./SøkelenkerPanel-BUzljANX.js";import"./HarSaker-DP5m02KT.js";import"./SakLink-CdCGlbSq.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cmrw6_XC.js";import"./BekreftelseSendtSøknad-v6WCgdq6.js";import"./KontonummerInfo-Cat7NsbI.js";import"./Accordion-CgPwthgT.js";import"./Svangerskapspenger-CcYmvmHM.js";import"./DinPlan-D28MFO-S.js";import"./Oppgaver-B-RJLrV0.js";import"./OppgaveLenkepanel-D2EZ1wi5.js";import"./KontaktOss-BMMye4qo.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
