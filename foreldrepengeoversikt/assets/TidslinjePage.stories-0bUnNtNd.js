import{i as m,j as t}from"./iframe-CgprOxAM.js";import{h as e,H as s}from"./index-YwXLezO5.js";import{t as p,m as a}from"./tidslinjeHendelser-BvFw7egc.js";import{s as l}from"./saker-CGTZwiJ3.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Desu4i2U.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-CS1iaA-n.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Dqwms7hc.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BcuoLzf-.js";import"./useSelectedSak-BVAmFLSi.js";import"./useQuery-DI2C0W1t.js";import"./api-R5XGfx5z.js";import"./sakerUtils-BUdt7KwH.js";import"./Snarveier-DfjrDR0f.js";import"./LenkePanel-CxNZ4gE5.js";import"./index-7rL4k3xa.js";import"./Dokument-t8KIc3_h.js";import"./dokumenterUtils-Bzrmt5eI.js";import"./Tag-BLhuv8qC.js";import"./GrupperteDokumenter-DsPGGX7h.js";import"./guid-CsArkN6i.js";import"./Accordion-CqVULU8j.js";import"./Header-VJTGWKqA.js";import"./LayoutWrapper-D9OkmHa8.js";import"./StatusTag-Ca5HeW6L.js";import"./Stroller-L1s-D6Xd.js";import"./NoeGikkGalt-uTDNMWhP.js";import"./MinidialogSkjema-BcAX6xO-.js";import"./BekreftelseSendtSøknad-LOta5joo.js";import"./KontonummerInfo-CaJ1U9ru.js";import"./HarIkkeSaker-Dvy8p9tj.js";import"./SøkelenkerPanel-C0qsLMp-.js";import"./HarSaker-Cx7SDofh.js";import"./SakLink-CapL75Op.js";import"./ContentSection-DSnc54em.js";import"./Svangerskapspenger-D5VMTfeQ.js";import"./DinPlan-CDnSwFS9.js";import"./Oppgaver-BCu297iV.js";import"./OppgaveLenkepanel-qyXhaO5A.js";import"./KontaktOss-fj98O2oM.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
