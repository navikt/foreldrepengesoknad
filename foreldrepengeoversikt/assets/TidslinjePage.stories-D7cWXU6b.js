import{i as m,j as t}from"./iframe-DnYRF4zf.js";import{h as e,H as s}from"./index-BxuBRL8T.js";import{t as p,m as a}from"./tidslinjeHendelser-DGMPXSTo.js";import{s as l}from"./saker-Cb4KDfVg.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Dufnp_fv.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-xzLFzQus.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BuNqaHw5.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DDj8hruh.js";import"./useSelectedSak-AuoLYAFn.js";import"./useQuery-l25sG66Q.js";import"./api-C9wBztrE.js";import"./sakerUtils-Dc0tVNwZ.js";import"./Snarveier-20kTzjmO.js";import"./LenkePanel-epq7rmgp.js";import"./index-dZacAveH.js";import"./Dokument-D98YyAMK.js";import"./dokumenterUtils-DskUQb5f.js";import"./Tag-CxAybYHL.js";import"./GrupperteDokumenter-YuJ3QoRm.js";import"./guid-CsArkN6i.js";import"./Accordion-D4teQbww.js";import"./Header-C6p_7mlZ.js";import"./LayoutWrapper-4DkI5ef-.js";import"./StatusTag-64V7AERa.js";import"./Stroller-B7D-SzwX.js";import"./NoeGikkGalt-B5WHzjCt.js";import"./MinidialogSkjema-Cs156I7s.js";import"./BekreftelseSendtSøknad-HCS4TpmQ.js";import"./KontonummerInfo-up-Fnv6B.js";import"./HarIkkeSaker-F7BixEtU.js";import"./SøkelenkerPanel-CHpTpRoG.js";import"./HarSaker-Bb848w7d.js";import"./SakLink-BEWA2DxK.js";import"./ContentSection-6_1-Il7-.js";import"./Svangerskapspenger-DXbiAsBu.js";import"./DinPlan-DvSsw3W_.js";import"./Oppgaver-vD03aZXM.js";import"./OppgaveLenkepanel-CMgwhRpS.js";import"./KontaktOss-C3C10Lq3.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
