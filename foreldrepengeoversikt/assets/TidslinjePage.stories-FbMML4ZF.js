import{i as p,j as t}from"./iframe-DSm6znYd.js";import{h as e,H as o}from"./index-CE7R-MEv.js";import{t as a,m as l}from"./tidslinjeHendelser-D4lDhKZ8.js";import{s as d}from"./saker-A-uzw3PJ.js";import{A as s}from"./api-BNoIXsAO.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CWMTIZOw.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BjQiO9Vz.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-X-ycZIkR.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-VVYwzvSd.js";import"./useSelectedSak-DtZI3R2t.js";import"./useQuery-D6T5a7HA.js";import"./sakerUtils-BbLHnYpB.js";import"./Snarveier-CMtOuWag.js";import"./LenkePanel-CcE-5dPp.js";import"./index-qhpkUMQU.js";import"./Dokument-KZm87LsY.js";import"./dokumenterUtils-C4OI9AHp.js";import"./Tag-uHakcTiP.js";import"./GrupperteDokumenter-C6cik4gk.js";import"./guid-CsArkN6i.js";import"./Accordion-Bs0fjVlC.js";import"./Header-C0Zy1i7J.js";import"./LayoutWrapper-DeY1b_F8.js";import"./StatusTag-CEsf3pfW.js";import"./Stroller-EMAWWr_b.js";import"./NoeGikkGalt-Cl3aFI9D.js";import"./MinidialogSkjema-CbPHbRzT.js";import"./BekreftelseSendtSøknad-BYOxB8RY.js";import"./KontonummerInfo-BCsOjyYU.js";import"./HarIkkeSaker-67qplSlx.js";import"./SøkelenkerPanel-DNX50hZN.js";import"./HarSaker-BUkFNovs.js";import"./SakLink-qPYHTY4U.js";import"./ContentSection-DHzcBPaP.js";import"./Svangerskapspenger-Dsjm2ItH.js";import"./DinPlan-CgW4D_2e.js";import"./Oppgaver-t1SfDkp0.js";import"./OppgaveLenkepanel-Cl9DxxZ0.js";import"./KontaktOss-BZ9YjCYo.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,ot as default};
