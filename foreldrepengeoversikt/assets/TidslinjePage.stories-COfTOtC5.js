import{i as a,j as t}from"./iframe-CbTDqBlf.js";import{h as r,H as s}from"./index-BvsERFFG.js";import{t as p,m as l}from"./tidslinjeHendelser-BPIDSnFd.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CsqrxBe6.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-sEAb9VOz.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D9OMKjh_.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CAscB7Nv.js";import"./useBackgroundColor-BLLxfquX.js";import"./useSelectedSak-R4p7MgoK.js";import"./useQuery-Ccv8EQOM.js";import"./sakerUtils-BnGtPbHJ.js";import"./Snarveier-CpTMRuj0.js";import"./LenkePanel-CO-cHjV4.js";import"./index-BbWOOXrk.js";import"./Header-CjN_1qkk.js";import"./LayoutWrapper-jmnUowy2.js";import"./StatusTag-D42oSauC.js";import"./Tag-u0wDn3Pc.js";import"./Stroller-BhZLmLoS.js";import"./NoeGikkGalt-BJqS48T3.js";import"./MinidialogSkjema-CKh6dH-Q.js";import"./HarIkkeSaker-D0AKriSJ.js";import"./SøkelenkerPanel-CCOmJvgR.js";import"./HarSaker-DDPYXBgu.js";import"./SakLink-ryKHqpD1.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bp4qcUnO.js";import"./BekreftelseSendtSøknad-Br6356jV.js";import"./KontonummerInfo-BPLsewGK.js";import"./Accordion-CeQzvl6Z.js";import"./Svangerskapspenger-BOHXYWq2.js";import"./DinPlan-BMhfU0Uj.js";import"./Oppgaver-DkifrAnZ.js";import"./OppgaveLenkepanel-CtNLnNJ_.js";import"./KontaktOss-Cf7cPS1G.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
