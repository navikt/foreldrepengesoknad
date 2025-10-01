import{i as m,j as t}from"./iframe-DK4uanVB.js";import{h as e,H as s}from"./index-DgrKQk4K.js";import{t as p,m as a}from"./tidslinjeHendelser-C7dpKlzQ.js";import{s as l}from"./saker-Bm3HPAGg.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-BqCMkyQf.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-DJJfcfxe.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B4huW60o.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CsGgVr1h.js";import"./useSelectedSak-BCrMlbNb.js";import"./useQuery-OV8idKuD.js";import"./api-D3Bb785J.js";import"./sakerUtils-BGO_INJD.js";import"./Snarveier-CYta74tj.js";import"./LenkePanel-zHTflIyz.js";import"./index-Dkwt9WVT.js";import"./Dokument-Daqaue1O.js";import"./dokumenterUtils-BZvLVWH-.js";import"./Tag-CccABgoK.js";import"./GrupperteDokumenter-qWUuduI2.js";import"./guid-CsArkN6i.js";import"./Accordion-WwcWzA2X.js";import"./Header-D_H3MrKG.js";import"./LayoutWrapper-CwDa0Lh9.js";import"./StatusTag-D_iIZ6he.js";import"./Stroller-Db9jIGBH.js";import"./NoeGikkGalt-P2VbTIgx.js";import"./MinidialogSkjema-90N_nXnJ.js";import"./BekreftelseSendtSøknad-CUUYMsjZ.js";import"./KontonummerInfo-BlzR34Vu.js";import"./HarIkkeSaker-CizOZNDp.js";import"./SøkelenkerPanel-BXQVCa5Z.js";import"./HarSaker-C--Om9SG.js";import"./SakLink-c0C4iTPj.js";import"./ContentSection-NbdQiVq7.js";import"./Svangerskapspenger-CRHXHD3F.js";import"./DinPlan-BkXzIZdR.js";import"./Oppgaver-JuPs6ayW.js";import"./OppgaveLenkepanel-DClZASvT.js";import"./KontaktOss-BUqrQpCR.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
