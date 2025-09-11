import{i as m,j as t}from"./iframe-BZrgh5jQ.js";import{h as e,H as s}from"./index-FKle5ceY.js";import{t as p,m as a}from"./tidslinjeHendelser-VY24XzrH.js";import{s as l}from"./saker-U3OEzLFG.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-wAZgKRWO.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-ChtpLkAJ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BmOfeeJq.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DBjo82Ln.js";import"./useSelectedSak-BhprsWVO.js";import"./useQuery-BjmDcNMg.js";import"./api-B5VuMeTq.js";import"./sakerUtils-1w7b2_ow.js";import"./Snarveier-C5eD-IAu.js";import"./LenkePanel-CWFxBU4Q.js";import"./index-dEEAKM2K.js";import"./Dokument-MUYTjkzk.js";import"./dokumenterUtils-C556EEBZ.js";import"./Tag-CrvcYn81.js";import"./GrupperteDokumenter-aV_b68xU.js";import"./guid-CsArkN6i.js";import"./Accordion-DxINW8xC.js";import"./Header-CK0kSAtv.js";import"./LayoutWrapper-VEAtacyh.js";import"./StatusTag-ozOXntCF.js";import"./Stroller-CE6A9xAD.js";import"./NoeGikkGalt-DdO6-8ex.js";import"./MinidialogSkjema-BNzOZc6p.js";import"./BekreftelseSendtSøknad-CJR2Ajqe.js";import"./KontonummerInfo-_QoGV4dW.js";import"./HarIkkeSaker-D2-YhNBD.js";import"./SøkelenkerPanel-CvSqNJ2C.js";import"./HarSaker-DseNG2k-.js";import"./SakLink-BtQbwNm9.js";import"./ContentSection-BLFXGhNE.js";import"./Svangerskapspenger-DHA7lbhE.js";import"./DinPlan-CiJxsC7V.js";import"./Oppgaver-Cv486UU6.js";import"./OppgaveLenkepanel-kGrcAkcv.js";import"./KontaktOss-lOURIndD.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
