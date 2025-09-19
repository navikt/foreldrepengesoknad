import{i as m,j as t}from"./iframe-DxzmxroJ.js";import{h as e,H as s}from"./index-c8_LwoXL.js";import{t as p,m as a}from"./tidslinjeHendelser-CP0Bh_tk.js";import{s as l}from"./saker-CqXJtdo-.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-C9HRAYNx.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-UW8jfvD4.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B6-nXCf0.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BfFxpZ9K.js";import"./useSelectedSak-D8dseZII.js";import"./useQuery-3XBfERe_.js";import"./api-CiCskRyt.js";import"./sakerUtils-D5jGEbXW.js";import"./Snarveier-B9erEjCo.js";import"./LenkePanel-DjOUfDWY.js";import"./index-D4FpWt1k.js";import"./Dokument-BoYIC9SE.js";import"./dokumenterUtils-BvkSQI7K.js";import"./Tag-RHTeixa_.js";import"./GrupperteDokumenter-Dbm1sWeh.js";import"./guid-CsArkN6i.js";import"./Accordion-DP6agj5J.js";import"./Header-BVCK3_3V.js";import"./LayoutWrapper-Bg4a89HX.js";import"./StatusTag-rUfCOhk-.js";import"./Stroller-Lm2LYhaJ.js";import"./NoeGikkGalt-D4VdPdtL.js";import"./MinidialogSkjema-DgUAgUVv.js";import"./BekreftelseSendtSøknad-3QFwc43U.js";import"./KontonummerInfo-D063ndZN.js";import"./HarIkkeSaker-BvtbRj4H.js";import"./SøkelenkerPanel-BOvj8P6E.js";import"./HarSaker-Bdcioa05.js";import"./SakLink-BNR7_fGb.js";import"./ContentSection-BXBYQQRB.js";import"./Svangerskapspenger-B5DIIZhm.js";import"./DinPlan-DMt92QIX.js";import"./Oppgaver-gqqpLcv1.js";import"./OppgaveLenkepanel-DvaxZ5d8.js";import"./KontaktOss-BA4dPu30.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
