import{i as m,j as t}from"./iframe-q4RzOw8y.js";import{h as e,H as s}from"./index-_hN8bN29.js";import{t as p,m as a}from"./tidslinjeHendelser-C4NCSafK.js";import{s as l}from"./saker-DEAMBlWH.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-DwA24dWz.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-DDa5X1qt.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CXBMHLFC.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CR3L_Bkd.js";import"./useSelectedSak-BZTnUmFB.js";import"./useQuery-BYhg3stO.js";import"./api-BW5T-t5i.js";import"./sakerUtils-Mfa-SPkO.js";import"./Snarveier-CPdM9pbX.js";import"./LenkePanel-CQy_8mkc.js";import"./index-bM1KbQ-g.js";import"./Dokument-De3Jk3mD.js";import"./dokumenterUtils-qw0iUb7n.js";import"./Tag-rELXEx-9.js";import"./GrupperteDokumenter-Js_ezeGo.js";import"./guid-CsArkN6i.js";import"./Accordion-BEuDFa8H.js";import"./Header-DJFz5-1b.js";import"./LayoutWrapper-VUAS79xM.js";import"./StatusTag-CeNGzsoS.js";import"./Stroller-BCW28oHN.js";import"./NoeGikkGalt-RyrHCJvl.js";import"./MinidialogSkjema-d92TPVzD.js";import"./BekreftelseSendtSøknad-CUxvVHqf.js";import"./KontonummerInfo-SW15mrZV.js";import"./HarIkkeSaker-vXa_CRg5.js";import"./SøkelenkerPanel-9TehK4RE.js";import"./HarSaker-DnFJPvfr.js";import"./SakLink-B_XN6mqt.js";import"./ContentSection-ApYx2WOf.js";import"./Svangerskapspenger-Ou-HXyaO.js";import"./DinPlan-DpiGC3-n.js";import"./Oppgaver-BYJuxaE-.js";import"./OppgaveLenkepanel-D5ZpT-Xy.js";import"./KontaktOss-CvO30KKk.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
