import{i as l,j as t}from"./iframe-CIPZDtdN.js";import{h as e,H as s}from"./index-T3pbIxcm.js";import{t as d,m as g}from"./tidslinjeHendelser-CQJ0C1Yi.js";import{s as j}from"./saker-Bdxpj-G7.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-DeGhmbpI.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-DcbOj75j.js";import"./skjemanummer-I4gNwOYL.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Qx1_2YzP.js";import"./useSelectedSak-C7oV8fjW.js";import"./useQuery-BOq07a3w.js";import"./api-CvzksYAK.js";import"./sakerUtils-JSxeetNo.js";import"./Snarveier-sjKOqc-Q.js";import"./LenkePanel-CofnvOjm.js";import"./Dokument-CV-Qn1O4.js";import"./dokumenterUtils-Do7ROMEf.js";import"./Tag-DedQvT1q.js";import"./GrupperteDokumenter-B3jS0krr.js";import"./guid-CsArkN6i.js";import"./Header-Dfw-UMJB.js";import"./LayoutWrapper-CK1_Zq9f.js";import"./StatusTag-IUqF0hh5.js";import"./Stroller-CPSAJJvU.js";import"./NoeGikkGalt-yNnKRrke.js";import"./MinidialogSkjema-DG4B2oFQ.js";import"./BekreftelseSendtSøknad-CFZ9adDm.js";import"./KontonummerInfo-jkhTQ0EQ.js";import"./HarIkkeSaker-Cys1Agt3.js";import"./SøkelenkerPanel-ByNUH3IP.js";import"./HarSaker-wYbuovkZ.js";import"./SakLink-p-f3UfU7.js";import"./ContentSection-a6JFxM3k.js";import"./Svangerskapspenger-Bw8l6SAh.js";import"./DinPlan-DDVbAb1q.js";import"./Oppgaver-C2Eo-Um0.js";import"./OppgaveLenkepanel-DDgUPEzM.js";import"./KontaktOss-C_KXkpnV.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
