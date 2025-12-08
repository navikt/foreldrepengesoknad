import{k as p,j as t}from"./iframe-BabWFjFC.js";import{h as e,H as r}from"./index-Ba6Pz3pt.js";import{t as a,m as l}from"./tidslinjeHendelser-D-OAJGC9.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-7-j1osxh.js";import{A as s}from"./queries-grjeZack.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-lX-4ExGs.js";import{M as f,R as j,a as k}from"./chunk-4WY6JWTD-jlfulv4i.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BS2HR_0y.js";import"./useBackgroundColor-W1WJTKSA.js";import"./useSelectedSak-29bhTO_Z.js";import"./useQuery-C8QjNlRc.js";import"./sakerUtils-C8YJvlcx.js";import"./Snarveier-D7CZsTsD.js";import"./LenkePanel-Cv_cg5gR.js";import"./index-BFJwbQ_9.js";import"./Header-CJdVQ32n.js";import"./LayoutWrapper-CYNsgobi.js";import"./StatusTag-BKKzq-AN.js";import"./Tag-BnsqGokr.js";import"./Stroller-B7lZbtiC.js";import"./NoeGikkGalt--GtcfSDG.js";import"./MinidialogSkjema-CFWwyj_c.js";import"./HarIkkeSaker-D9jrLSSA.js";import"./SøkelenkerPanel-9MAlqlzv.js";import"./HarSaker-CB1Iv0rM.js";import"./SakLink-dlJyZbQf.js";import"./guid-CsArkN6i.js";import"./ContentSection-BeoZvf-J.js";import"./BekreftelseSendtSøknad-lROn_5cM.js";import"./KontonummerInfo-J0j-6mHy.js";import"./Accordion-EC3zDX4H.js";import"./Svangerskapspenger-ygxQoNsq.js";import"./DinPlan-_qUsQt3K.js";import"./Oppgaver--F1ym8O2.js";import"./OppgaveLenkepanel-DhQaI2aU.js";import"./KontaktOss-wauBM2HP.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
