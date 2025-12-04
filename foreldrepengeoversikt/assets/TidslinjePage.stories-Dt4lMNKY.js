import{k as p,j as t}from"./iframe-GMCrZPMT.js";import{h as e,H as r}from"./index-DlA5Dgwv.js";import{t as a,m as l}from"./tidslinjeHendelser-16zBp5TP.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-B9MQWW0w.js";import{A as s}from"./queries-D7hysrC7.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BlM_R4sv.js";import{M as f,R as j,a as k}from"./chunk-4WY6JWTD-B9rjn__f.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DJurKVsj.js";import"./useBackgroundColor-5heR_nnq.js";import"./useSelectedSak-CUOZ-6He.js";import"./useQuery-BiY6XMdz.js";import"./sakerUtils-C6wXDww1.js";import"./Snarveier-CX34pwWZ.js";import"./LenkePanel-rGKf6Mfz.js";import"./index-BO5Y3oSX.js";import"./Header-DpjsnFYe.js";import"./LayoutWrapper-CzB3Cc9e.js";import"./StatusTag-JMLfObSF.js";import"./Tag-CllHDSoK.js";import"./Stroller-DoHtygTr.js";import"./NoeGikkGalt-OH1SYDZr.js";import"./MinidialogSkjema-OEzf77GQ.js";import"./HarIkkeSaker-BzP_HrH3.js";import"./SøkelenkerPanel-CRzmCMCD.js";import"./HarSaker-CffD9CrB.js";import"./SakLink-HDA4CQ8b.js";import"./guid-CsArkN6i.js";import"./ContentSection-Z-GBennl.js";import"./BekreftelseSendtSøknad-PbfKR_-I.js";import"./KontonummerInfo-B24IeY-n.js";import"./Accordion-B6GP9jD0.js";import"./Svangerskapspenger-BgqhrmUS.js";import"./DinPlan-BQGnUhBP.js";import"./Oppgaver-wbXDS51Z.js";import"./OppgaveLenkepanel-CvzCp6bM.js";import"./KontaktOss-BTWA662w.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
