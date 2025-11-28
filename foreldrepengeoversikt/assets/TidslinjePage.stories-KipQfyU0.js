import{k as p,j as t}from"./iframe-BEz8EZAU.js";import{h as e,H as r}from"./index-BQ5QT8mJ.js";import{t as a,m as l}from"./tidslinjeHendelser-C8DFdTY9.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-C_X9NIse.js";import{A as s}from"./queries-Sifezsu-.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-7WHzYgtW.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-BRY0hQLl.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DE91jy31.js";import"./useBackgroundColor-CMv3fCQN.js";import"./useSelectedSak-C61E0LC-.js";import"./useQuery-CXIIbcLh.js";import"./sakerUtils-IKuDJ4hd.js";import"./Snarveier-Fjv8BPkY.js";import"./LenkePanel-D_1y_XE3.js";import"./index-Z-r-xmnV.js";import"./Header-aNJShEri.js";import"./LayoutWrapper-_yygJATM.js";import"./StatusTag-Ds3OKwAn.js";import"./Tag-COxYl_NJ.js";import"./Stroller-CQGNKzVx.js";import"./NoeGikkGalt-C2pBHbEs.js";import"./MinidialogSkjema-DIrSN150.js";import"./HarIkkeSaker-D58TBoU3.js";import"./SøkelenkerPanel-DQEhenOk.js";import"./HarSaker-1OxxmLb9.js";import"./SakLink-ihrkbVdx.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dulz96ON.js";import"./BekreftelseSendtSøknad-BitAc3K9.js";import"./KontonummerInfo-B0_nF7xP.js";import"./Accordion-W8iAxb3_.js";import"./Svangerskapspenger-BH-fkQlm.js";import"./DinPlan-B7PuhFFc.js";import"./Oppgaver-DSMmrsdN.js";import"./OppgaveLenkepanel-CnFsP17_.js";import"./KontaktOss-CGreyTty.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
