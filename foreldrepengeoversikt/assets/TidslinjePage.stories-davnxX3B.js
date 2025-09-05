import{i as m,j as t}from"./iframe-BYYbk71C.js";import{h as e,H as s}from"./index-COLg6udd.js";import{t as p,m as a}from"./tidslinjeHendelser-CePZ9jnw.js";import{s as l}from"./saker-BPB-gMyI.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-7GYug7wM.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-KxSaLrW4.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CPo7SjyT.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BrtzicP3.js";import"./useSelectedSak-Ddde_rIS.js";import"./useQuery-CYGw-7kE.js";import"./api-B2LE0X7C.js";import"./sakerUtils-DRJjoWBP.js";import"./Snarveier-gBnAKTeX.js";import"./LenkePanel-vPbMlG5J.js";import"./index-CcmGoxsM.js";import"./Dokument-3Lu-Zi4d.js";import"./dokumenterUtils-BvHgtEBy.js";import"./Tag-BcHcaiWO.js";import"./GrupperteDokumenter-DK_YoYt9.js";import"./guid-CsArkN6i.js";import"./Accordion-Cn9q8aoS.js";import"./Header-wrkNOXXW.js";import"./LayoutWrapper-Uw0N7wKE.js";import"./StatusTag-CcYPY6NS.js";import"./Stroller-D2Hfoc0A.js";import"./NoeGikkGalt-CNGGI7YB.js";import"./MinidialogSkjema-Bu4UxfEB.js";import"./BekreftelseSendtSøknad-DxXRanM1.js";import"./KontonummerInfo-BE6F58Xg.js";import"./HarIkkeSaker-HDR7uhpz.js";import"./SøkelenkerPanel-BrtOvV_K.js";import"./HarSaker-UjYonoYv.js";import"./SakLink-nS_-2m6h.js";import"./ContentSection-gVUY63Jl.js";import"./Svangerskapspenger-nfLauBp5.js";import"./DinPlan-DzfPxt95.js";import"./Oppgaver-DHF0vLgw.js";import"./OppgaveLenkepanel-BJqM5Xsy.js";import"./KontaktOss-Dnqu5u-R.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
