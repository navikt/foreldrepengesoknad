import{k as p,j as t}from"./iframe-D-IIqIcL.js";import{h as e,H as r}from"./index-zOoilbs6.js";import{t as a,m as l}from"./tidslinjeHendelser-Bzw5aF3W.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-XfCPf_zx.js";import{A as s}from"./queries-Cajj6Nwa.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CoIljVVu.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DF4FCatt.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-KYKTI_Kk.js";import"./useBackgroundColor-D0RAA2Q1.js";import"./useSelectedSak-mX996YQ-.js";import"./useQuery-Djwu3wOy.js";import"./sakerUtils-CkKz6-Ms.js";import"./Snarveier-UM3GHpe5.js";import"./LenkePanel-w8hJgSVZ.js";import"./index-BUxBNmh0.js";import"./Header-Dx693UYN.js";import"./LayoutWrapper-NXycDWKa.js";import"./StatusTag-B02maUxk.js";import"./Tag-BOhEG5f2.js";import"./Stroller-CALRoYGx.js";import"./NoeGikkGalt-DOHDta-p.js";import"./MinidialogSkjema-BjOnkRvg.js";import"./HarIkkeSaker-CysCHiQX.js";import"./SøkelenkerPanel-BOIKPaYu.js";import"./HarSaker-BrRX4OAV.js";import"./SakLink-BueVoxBs.js";import"./guid-CsArkN6i.js";import"./ContentSection-NOVaN-hN.js";import"./BekreftelseSendtSøknad-Bw1CupYr.js";import"./KontonummerInfo-COHc5cq1.js";import"./Accordion-CLP-eGnU.js";import"./Svangerskapspenger-C2cVa929.js";import"./DinPlan-D-XVMSi7.js";import"./Oppgaver-E98E2J3a.js";import"./OppgaveLenkepanel-Cj7sAeuP.js";import"./KontaktOss-fhXoQaD6.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
