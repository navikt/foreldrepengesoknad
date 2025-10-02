import{i as m,j as t}from"./iframe-6YR8n9Q6.js";import{h as e,H as s}from"./index-CrMM6_h0.js";import{t as p,m as a}from"./tidslinjeHendelser-BNiBZ-qU.js";import{s as l}from"./saker-yf4YfIAl.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-CugvAw53.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-DPaxZ01J.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-keYAk90y.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DG8F_0GG.js";import"./useSelectedSak-D221kLXT.js";import"./useQuery-DLf5KdkI.js";import"./api-DGhXO4SU.js";import"./sakerUtils-DxHAHSu3.js";import"./Snarveier-C5--R8j6.js";import"./LenkePanel-DE_6F1by.js";import"./index-D9aR02jP.js";import"./Dokument-tN8N7goW.js";import"./dokumenterUtils-B4vVIngz.js";import"./Tag-DeYQrIK_.js";import"./GrupperteDokumenter-nJ_mmGEX.js";import"./guid-CsArkN6i.js";import"./Accordion-CLCYJHk4.js";import"./Header-DAvRyOT_.js";import"./LayoutWrapper-DXfL-sH6.js";import"./StatusTag-Byk247v9.js";import"./Stroller-CRKLT4lo.js";import"./NoeGikkGalt-BE-G79Er.js";import"./MinidialogSkjema-PG4xqDjV.js";import"./BekreftelseSendtSøknad-ClX6jOAJ.js";import"./KontonummerInfo-DctYhAXH.js";import"./HarIkkeSaker-B-dElJds.js";import"./SøkelenkerPanel-BMgx4mzz.js";import"./HarSaker-u-DvXKTt.js";import"./SakLink-C-35yyoH.js";import"./ContentSection-BajbtAcQ.js";import"./Svangerskapspenger-Bb4qSnEK.js";import"./DinPlan-BGiPgBim.js";import"./Oppgaver-_jgzqnjW.js";import"./OppgaveLenkepanel-BLpuGWct.js";import"./KontaktOss-D2SWh_5i.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
