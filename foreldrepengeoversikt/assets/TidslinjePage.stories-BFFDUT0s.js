import{k as p,j as t}from"./iframe-C5K0pfAa.js";import{h as e,H as r}from"./index-_RDxWgqM.js";import{t as a,m as l}from"./tidslinjeHendelser-DBuXgUZq.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-DOe49BG3.js";import{A as s}from"./queries-Bs72t_uX.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-WtJ5Xko5.js";import{M as f,R as j,a as k}from"./chunk-4WY6JWTD-DW818KaH.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-FXv7ho88.js";import"./useBackgroundColor-DKITaedx.js";import"./useSelectedSak-CjqOLSi1.js";import"./useQuery-CAyY9VHE.js";import"./sakerUtils--JLfMjKW.js";import"./Snarveier-_p4tnoOI.js";import"./LenkePanel-MjN169tg.js";import"./index-Bwi3v650.js";import"./Header-HpZ-2k4r.js";import"./LayoutWrapper-DzqX1ptI.js";import"./StatusTag-YGFuUCqq.js";import"./Tag-D1ZgKTJD.js";import"./Stroller-Dq0WBYAf.js";import"./NoeGikkGalt-jbu2BJhO.js";import"./MinidialogSkjema-BHsqxAEu.js";import"./HarIkkeSaker-DkNgUu9X.js";import"./SøkelenkerPanel-nNUYM0Op.js";import"./HarSaker-3dGHOfw1.js";import"./SakLink-DmaM95gr.js";import"./guid-CsArkN6i.js";import"./ContentSection-v-w-UT9o.js";import"./BekreftelseSendtSøknad-mdsAaQgl.js";import"./KontonummerInfo-BozxT7ve.js";import"./Accordion-DdTPF5-o.js";import"./Svangerskapspenger-CLt2ExSN.js";import"./DinPlan-DCvwhn5N.js";import"./Oppgaver-2f2XH_aB.js";import"./OppgaveLenkepanel-DLwUVP0N.js";import"./KontaktOss-soTfvebS.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
