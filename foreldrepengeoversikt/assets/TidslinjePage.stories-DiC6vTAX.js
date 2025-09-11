import{i as m,j as t}from"./iframe-B4DvhS-C.js";import{h as e,H as s}from"./index-BTdXeUkd.js";import{t as p,m as a}from"./tidslinjeHendelser-6TGPAjGU.js";import{s as l}from"./saker-D_zeEPHk.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-B0Mqul5f.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-C8kCrgCq.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DGotJGIt.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-h6lI1oW5.js";import"./useSelectedSak-DY4okQAb.js";import"./useQuery-_3Tyk20M.js";import"./api-CEfg8NtQ.js";import"./sakerUtils-DWjvxByn.js";import"./Snarveier-Cv3GixdY.js";import"./LenkePanel-CZyNEHn1.js";import"./index-B_qLMfAU.js";import"./Dokument-Da3x8vyL.js";import"./dokumenterUtils-D4lHRRja.js";import"./Tag-WzRfIu_H.js";import"./GrupperteDokumenter-CjTAPtfF.js";import"./guid-CsArkN6i.js";import"./Accordion-Ch8qUFTc.js";import"./Header-CEPxdBj8.js";import"./LayoutWrapper-BDmL2sop.js";import"./StatusTag-DGxH3ae3.js";import"./Stroller-B_c-yBxm.js";import"./NoeGikkGalt-F0umhOPz.js";import"./MinidialogSkjema-Tdd1xYEQ.js";import"./BekreftelseSendtSøknad-B6mQig8s.js";import"./KontonummerInfo-kWyfUpOA.js";import"./HarIkkeSaker-BgbViMVj.js";import"./SøkelenkerPanel--tsb97kD.js";import"./HarSaker-a8ENtcQu.js";import"./SakLink-CNfQVuQq.js";import"./ContentSection-DKrWYwn5.js";import"./Svangerskapspenger-9l7ns1Mp.js";import"./DinPlan-DjbFDc02.js";import"./Oppgaver-CKg8Wd4h.js";import"./OppgaveLenkepanel-CqrmfRqd.js";import"./KontaktOss-C_fikdmx.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
