import{i as m,j as t}from"./iframe-GyC3bxcg.js";import{h as e,H as s}from"./index-Cogsrr_c.js";import{t as p,m as a}from"./tidslinjeHendelser-BwhV4qt6.js";import{s as l}from"./saker-Cl3B_pmd.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Dk2XoUpA.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-BcKXusyi.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BKVAV9k4.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Di8zZTzp.js";import"./useSelectedSak-ecpxRwF0.js";import"./useQuery-DN1cp6aI.js";import"./api-CGFRwcPW.js";import"./sakerUtils-DIF0IIB-.js";import"./Snarveier-Dt-Wtfos.js";import"./LenkePanel-ChC517RI.js";import"./index-BHm_4q7q.js";import"./Dokument-DzrPqV1g.js";import"./dokumenterUtils-BPx6kPM5.js";import"./Tag-CXYRKVJP.js";import"./GrupperteDokumenter-DY-gvkk4.js";import"./guid-CsArkN6i.js";import"./Accordion-C-jQaL98.js";import"./Header-BW9jjdSl.js";import"./LayoutWrapper-KKhAYTof.js";import"./StatusTag-BIIsr7dD.js";import"./Stroller-D5HghDG2.js";import"./NoeGikkGalt-CoYaXE6b.js";import"./MinidialogSkjema-nIEgJ2m7.js";import"./BekreftelseSendtSøknad-B4-TEEda.js";import"./KontonummerInfo-BbWtgWcf.js";import"./HarIkkeSaker-CmI_s_c9.js";import"./SøkelenkerPanel-iesE4mIF.js";import"./HarSaker-mYU5I3s9.js";import"./SakLink-BLMows4r.js";import"./ContentSection-B52-kjcP.js";import"./Svangerskapspenger-xQP8IsGW.js";import"./DinPlan-gA7SNMcf.js";import"./Oppgaver-DVMKNQBk.js";import"./OppgaveLenkepanel-Cds0Igop.js";import"./KontaktOss-CP5SRHLp.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
