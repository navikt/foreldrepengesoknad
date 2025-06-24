import{i as l,j as t}from"./iframe-BJPuNUHF.js";import{h as e,H as s}from"./index-CTFy4nPz.js";import{t as d,m as g}from"./tidslinjeHendelser-YXCc6uUf.js";import{s as j}from"./saker-_ozvozbM.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-IVZn5PBG.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-BMuloYWr.js";import"./skjemanummer-CxJ164Ma.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B1Ri4vk4.js";import"./useSelectedSak-CWwtc8lr.js";import"./useQuery-DouvvC5V.js";import"./api-D-FHbRRJ.js";import"./sakerUtils-B63kceXc.js";import"./Snarveier-By5BR_J1.js";import"./LenkePanel-BF5pdDjr.js";import"./Dokument-CWaIfXcw.js";import"./dokumenterUtils-DgFEPEDh.js";import"./Tag-BYgfewLn.js";import"./GrupperteDokumenter-Bk-DZq0K.js";import"./guid-CsArkN6i.js";import"./Header-CspJ2vPL.js";import"./LayoutWrapper-D-G3oxuq.js";import"./StatusTag-C18VFXNo.js";import"./Stroller-CntL7pKi.js";import"./NoeGikkGalt-C2_Y01Ob.js";import"./MinidialogSkjema-CDvqdprV.js";import"./BekreftelseSendtSøknad-DQTquzUG.js";import"./KontonummerInfo-DWMeSoxN.js";import"./HarIkkeSaker-BYR_2aiQ.js";import"./SøkelenkerPanel-DneLnnh_.js";import"./HarSaker-DardmTGv.js";import"./SakLink-BfIhcwSD.js";import"./ContentSection-Droutm4m.js";import"./Svangerskapspenger-D8UTGUww.js";import"./DinPlan-BspQs8Va.js";import"./Oppgaver-DmoSvjXJ.js";import"./OppgaveLenkepanel-D7eTu4Jq.js";import"./KontaktOss-CiOvS2RZ.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
