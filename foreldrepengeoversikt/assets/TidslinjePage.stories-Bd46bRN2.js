import{i as m,j as t}from"./iframe-DqYsnEnB.js";import{h as e,H as s}from"./index-md76Z-Y7.js";import{t as p,m as a}from"./tidslinjeHendelser-CketZ8o_.js";import{s as l}from"./saker-Bq29SDf7.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-2MY0sRYP.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-By06e2eO.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-jwZpTz2Y.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-clP1J7vy.js";import"./useSelectedSak-qVpfCZze.js";import"./useQuery-B_E6v8l_.js";import"./api-B2G0MWey.js";import"./sakerUtils-BTKdORNo.js";import"./Snarveier-B94lT8bI.js";import"./LenkePanel-DIzA5O_F.js";import"./index-CyoqsWOn.js";import"./Dokument-Cbzw1uj2.js";import"./dokumenterUtils-B3_q2EWV.js";import"./Tag-BRq6W16p.js";import"./GrupperteDokumenter-B8hrhdAp.js";import"./guid-CsArkN6i.js";import"./Accordion-BhBDAzyO.js";import"./Header-Cqhy_UJT.js";import"./LayoutWrapper-BwDpqrGY.js";import"./StatusTag-DkNz2Yza.js";import"./Stroller-2OawaaZm.js";import"./NoeGikkGalt-B4Cxx3Lo.js";import"./MinidialogSkjema-D47C-zv2.js";import"./BekreftelseSendtSøknad-O_ZVpnbT.js";import"./KontonummerInfo-DD86AF2h.js";import"./HarIkkeSaker-q2cNbk5x.js";import"./SøkelenkerPanel-BVlaU57L.js";import"./HarSaker-D1e3lckm.js";import"./SakLink-HOHbrb-q.js";import"./ContentSection-DP-YOFoP.js";import"./Svangerskapspenger-CQ1l_kUQ.js";import"./DinPlan-j6_HvjOv.js";import"./Oppgaver-QIqeoIt1.js";import"./OppgaveLenkepanel-w_JnV8dH.js";import"./KontaktOss-hVbnr1YL.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
