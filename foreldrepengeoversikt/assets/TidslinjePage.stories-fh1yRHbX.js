import{i as m,j as t}from"./iframe-DOZMPe0A.js";import{h as e,H as s}from"./index-M_Um798y.js";import{t as p,m as a}from"./tidslinjeHendelser-BLX0go4z.js";import{s as l}from"./saker-BTY1wYYE.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-CcZeGrxX.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-D6rB6ojM.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DGYMq_Vr.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C5UtWpK5.js";import"./useSelectedSak-DiUqA4ji.js";import"./useQuery-j9CnbBgM.js";import"./api-DrWxTODh.js";import"./sakerUtils-B8HPVhjK.js";import"./Snarveier-DXzf3yI8.js";import"./LenkePanel-C_h8bDou.js";import"./index-fN5yxXfs.js";import"./Dokument-CfnRbhG_.js";import"./dokumenterUtils-BQYdAWxk.js";import"./Tag-DYn8v6Pp.js";import"./GrupperteDokumenter-BB_bqlfU.js";import"./guid-CsArkN6i.js";import"./Accordion-Cus9I3rf.js";import"./Header-Sb8SmOsq.js";import"./LayoutWrapper-Dho__6CA.js";import"./StatusTag-BCSEGcfE.js";import"./Stroller-DB8owQcV.js";import"./NoeGikkGalt-CrJwvW3u.js";import"./MinidialogSkjema-f5c_fNTS.js";import"./BekreftelseSendtSøknad-D1Wph6wb.js";import"./KontonummerInfo-C_RFQ6mH.js";import"./HarIkkeSaker-BIsmoNP9.js";import"./SøkelenkerPanel-BxoCXQOJ.js";import"./HarSaker-CyiOWXSl.js";import"./SakLink-IRtKiUgi.js";import"./ContentSection-SbXI3tVs.js";import"./Svangerskapspenger-BT0RxiVI.js";import"./DinPlan-C8FzFVV0.js";import"./Oppgaver-DJDLb2lE.js";import"./OppgaveLenkepanel-Bkj9dWx6.js";import"./KontaktOss-ClmZT-e4.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
