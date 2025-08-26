import{i as m,j as t}from"./iframe-DTW4ifGA.js";import{h as e,H as s}from"./index-B-gckl7v.js";import{t as p,m as a}from"./tidslinjeHendelser-J1_la_8n.js";import{s as l}from"./saker-Bg-UTTjh.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Bn8lIA5U.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-CS2_WV0Q.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DWf_isGg.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Dkf-P2HK.js";import"./useSelectedSak-BeEzVhHk.js";import"./useQuery-Dv6NnxLc.js";import"./api-BP5Acknq.js";import"./sakerUtils-CeyAtAi1.js";import"./Snarveier-BDFWGJif.js";import"./LenkePanel-QHo4hqht.js";import"./index-CM6hB_a5.js";import"./Dokument-5UBeCZzx.js";import"./dokumenterUtils-BbHTdyyi.js";import"./Tag-DYg5rSH_.js";import"./GrupperteDokumenter-BDPFtdD0.js";import"./guid-CsArkN6i.js";import"./Accordion-oomyAiUx.js";import"./Header-nhHnrHFM.js";import"./LayoutWrapper-BnjaKk9s.js";import"./StatusTag-Cih9s5gf.js";import"./Stroller-CAyIip-g.js";import"./NoeGikkGalt-CauoGJi9.js";import"./MinidialogSkjema-dAWTfp0Q.js";import"./BekreftelseSendtSøknad-A2CiCsJU.js";import"./KontonummerInfo-CjEysnCA.js";import"./HarIkkeSaker-BOctUZ1-.js";import"./SøkelenkerPanel-jQ3f6K0X.js";import"./HarSaker-CQUw1CGY.js";import"./SakLink-w8-WIR0n.js";import"./ContentSection-DYmY8iJu.js";import"./Svangerskapspenger-VyQsn45M.js";import"./DinPlan-DTjUh6iK.js";import"./Oppgaver-BdX9WpWF.js";import"./OppgaveLenkepanel-BpnFGRTR.js";import"./KontaktOss-DU2Jjg44.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
