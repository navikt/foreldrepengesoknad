import{i as m,j as t}from"./iframe-D5xIE_-l.js";import{h as e,H as s}from"./index-rGP_tt4P.js";import{t as p,m as a}from"./tidslinjeHendelser-CsoAT2PB.js";import{s as l}from"./saker-Dx19_ZIN.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-IFF_lvDV.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-U-bqQZJQ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-dYSomK0t.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B_moCBJM.js";import"./useSelectedSak-Cjm0tT54.js";import"./useQuery-DGKuzgZO.js";import"./api-BJOBgEpL.js";import"./sakerUtils-DrkaiYY_.js";import"./Snarveier-oegSD-ow.js";import"./LenkePanel-Byhdhcrm.js";import"./index-BpdDpQdX.js";import"./Dokument-DjeLtS9k.js";import"./dokumenterUtils-CgIw0uRY.js";import"./Tag-CrncIJ6o.js";import"./GrupperteDokumenter-uMRXkp4m.js";import"./guid-CsArkN6i.js";import"./Accordion-CNuPJp4C.js";import"./Header-DGbjIkt1.js";import"./LayoutWrapper-CdCkVmeb.js";import"./StatusTag-Cpovtg2F.js";import"./Stroller-C8M440vi.js";import"./NoeGikkGalt-D5uCVpC9.js";import"./MinidialogSkjema-C-XtM-Lc.js";import"./BekreftelseSendtSøknad-D1WuK3TY.js";import"./KontonummerInfo-BgSTn46o.js";import"./HarIkkeSaker-BCPvqUVz.js";import"./SøkelenkerPanel-DRfycdH1.js";import"./HarSaker-BABaIlqF.js";import"./SakLink-BpfK0Fcu.js";import"./ContentSection-C7QFFdnh.js";import"./Svangerskapspenger-BsB-5WCg.js";import"./DinPlan-DVC_-wto.js";import"./Oppgaver-VbYmT0JC.js";import"./OppgaveLenkepanel-viXGaXZs.js";import"./KontaktOss-CHeLbxgC.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
