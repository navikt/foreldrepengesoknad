import{i as m,j as t}from"./iframe-DvzGygoK.js";import{h as e,H as s}from"./index-dzY3NwD1.js";import{t as p,m as a}from"./tidslinjeHendelser-BhcfBQB7.js";import{s as l}from"./saker-BTSVKGFk.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-DbO6HQRq.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-qu0-WlJh.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B811Hda9.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Bkj0QhaB.js";import"./useSelectedSak-zAbv9mM6.js";import"./useQuery-CQgD-OfA.js";import"./api-Bz5MeNYb.js";import"./sakerUtils-EgfJ183k.js";import"./Snarveier-58p2iEeY.js";import"./LenkePanel-DK2eF7_f.js";import"./index-CbaHxspZ.js";import"./Dokument-yu75eQeC.js";import"./dokumenterUtils-UVzRy7Gf.js";import"./Tag-CrPj95JE.js";import"./GrupperteDokumenter-C1wIDAZM.js";import"./guid-CsArkN6i.js";import"./Accordion-BQQabRcc.js";import"./Header-DdyXebds.js";import"./LayoutWrapper-Big5nS7G.js";import"./StatusTag-CkugoVUB.js";import"./Stroller-Dfu0sIcw.js";import"./NoeGikkGalt-A9Gc2nAt.js";import"./MinidialogSkjema-C6ptEWbD.js";import"./BekreftelseSendtSøknad-BIdCIOXL.js";import"./KontonummerInfo-teVxxp2X.js";import"./HarIkkeSaker-z3sT2rx8.js";import"./SøkelenkerPanel-BbSGYexO.js";import"./HarSaker-K5OUVzvc.js";import"./SakLink-P8z6cu-h.js";import"./ContentSection-Ce_Q-DjI.js";import"./Svangerskapspenger-FV5NMIjE.js";import"./DinPlan-DdVTmQ-E.js";import"./Oppgaver-B6asP7rX.js";import"./OppgaveLenkepanel-CbTL9vpD.js";import"./KontaktOss-D_8sJ4oW.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
