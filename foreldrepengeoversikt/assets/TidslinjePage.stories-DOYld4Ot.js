import{i as m,j as t}from"./iframe-BKY9oz0A.js";import{h as e,H as s}from"./index-BdZWApWn.js";import{t as p,m as a}from"./tidslinjeHendelser-BJ6hvxFd.js";import{s as l}from"./saker-B8MFaSzt.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-BPJhu4Fb.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-6ljjaQpA.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Co2eAW6C.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-b82r8mSD.js";import"./useSelectedSak-DWysk8sd.js";import"./useQuery-BL4ExmHA.js";import"./api-CdmyvXYL.js";import"./sakerUtils-CTkXQ5pm.js";import"./Snarveier-C9A3W0pP.js";import"./LenkePanel-D8OADPat.js";import"./index-DpbtT3pz.js";import"./Dokument-KW3k_-sk.js";import"./dokumenterUtils-1nXedz9Y.js";import"./Tag-B8eKd7R9.js";import"./GrupperteDokumenter-B3LaREM7.js";import"./guid-CsArkN6i.js";import"./Accordion-DdWPFWp4.js";import"./Header-DXyLb3R_.js";import"./LayoutWrapper-EJBdtPE4.js";import"./StatusTag-bvEBsgys.js";import"./Stroller-BzLimL8v.js";import"./NoeGikkGalt-CBkfJSQz.js";import"./MinidialogSkjema-BrC9Fw4X.js";import"./BekreftelseSendtSøknad-BhqvtUsI.js";import"./KontonummerInfo-Bpjlrp8B.js";import"./HarIkkeSaker-Df7VtPcZ.js";import"./SøkelenkerPanel-HwfXUUYZ.js";import"./HarSaker-DfUTMDDn.js";import"./SakLink-Bei0NbmU.js";import"./ContentSection-C7mfAw2f.js";import"./Svangerskapspenger-Ds6iEc3r.js";import"./DinPlan-eqFxp54g.js";import"./Oppgaver-BBBquf8p.js";import"./OppgaveLenkepanel-KWATtraM.js";import"./KontaktOss-BlvQHVuQ.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json(tidslinjeHendelser)), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json(manglendeVedlegg))]
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
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
