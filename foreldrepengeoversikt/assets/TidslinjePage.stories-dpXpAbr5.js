import{i as m,j as t}from"./iframe-yTRVePst.js";import{h as e,H as s}from"./index-DJdXn63g.js";import{t as p,m as a}from"./tidslinjeHendelser-BHs0NkbZ.js";import{s as l}from"./saker-BcJVJtqj.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-B50L7DOS.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-3u7wKqrD.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-LOzeICnh.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C5EZOwES.js";import"./useSelectedSak-DAZJ8mSW.js";import"./useQuery-CGulWCmg.js";import"./api-b5kd2-zq.js";import"./sakerUtils-4Cljmnbd.js";import"./Snarveier-rdKhp0D0.js";import"./LenkePanel-DCn2IWeY.js";import"./index-DDFosqS1.js";import"./Dokument-BAyM7ODx.js";import"./dokumenterUtils-BhadA0Jg.js";import"./Tag-C4Fxxhok.js";import"./GrupperteDokumenter-D71MP9U4.js";import"./guid-CsArkN6i.js";import"./Accordion-3em9g5g6.js";import"./Header-fr_7MI_r.js";import"./LayoutWrapper-Cmz5eB6P.js";import"./StatusTag-Bf9a_6n5.js";import"./Stroller-C7kIa-YD.js";import"./NoeGikkGalt-CpHkBvwZ.js";import"./MinidialogSkjema-G8Bb2aSY.js";import"./BekreftelseSendtSøknad-B61CyTrz.js";import"./KontonummerInfo-DtEqcGfn.js";import"./HarIkkeSaker-DAJs9ZUj.js";import"./SøkelenkerPanel-DvZVOAIB.js";import"./HarSaker-D_TxCIP2.js";import"./SakLink-DV1VT7Eo.js";import"./ContentSection-BaPv9zoK.js";import"./Svangerskapspenger-ACk8ai0V.js";import"./DinPlan-B5WvHdFg.js";import"./Oppgaver-CDq0Ec1c.js";import"./OppgaveLenkepanel-DPDMWAyN.js";import"./KontaktOss-B-s7Wzz6.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
