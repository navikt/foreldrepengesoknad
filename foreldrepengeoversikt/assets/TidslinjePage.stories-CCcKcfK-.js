import{i as m,j as t}from"./iframe-BCkgP-XL.js";import{h as e,H as s}from"./index-CuDauSKi.js";import{t as p,m as a}from"./tidslinjeHendelser-7Bw3vESG.js";import{s as l}from"./saker-DlLvz7T-.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Bf_exO-E.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-B8E1VFW_.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D7OfcTVW.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-KsRP6-Ou.js";import"./useSelectedSak-Bpva4_4q.js";import"./useQuery-DPA_JJ-q.js";import"./api-CZfqxYUM.js";import"./sakerUtils-DCzvlZ3D.js";import"./Snarveier-snUQf2_M.js";import"./LenkePanel-BaQa0Y93.js";import"./index-DL8ND0GX.js";import"./Dokument-Bx05D0rq.js";import"./dokumenterUtils-CbCWtLgp.js";import"./Tag-BNJ1thpg.js";import"./GrupperteDokumenter-YqUdsuTE.js";import"./guid-CsArkN6i.js";import"./Accordion-DYjK6rWB.js";import"./Header-7dvhB0JY.js";import"./LayoutWrapper-BgQwbqc9.js";import"./StatusTag-DC2qz0a4.js";import"./Stroller-BGhMOKer.js";import"./NoeGikkGalt-fnx6X9fU.js";import"./MinidialogSkjema-BOWqqAb4.js";import"./BekreftelseSendtSøknad-CU7wSPAM.js";import"./KontonummerInfo-BcMSM1eU.js";import"./HarIkkeSaker-qBBQ3sZ0.js";import"./SøkelenkerPanel-6BPjE1_q.js";import"./HarSaker-D0zR4NeT.js";import"./SakLink-BfXmTeca.js";import"./ContentSection-BWu4S38o.js";import"./Svangerskapspenger-BHcetxVr.js";import"./DinPlan-BoM2yjZa.js";import"./Oppgaver-BsM4G0oU.js";import"./OppgaveLenkepanel-BIGp1PTQ.js";import"./KontaktOss-AHc40mcI.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
