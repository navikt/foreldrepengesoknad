import{i as l,j as t}from"./iframe-BJsoEAxD.js";import{h as e,H as s}from"./index-BHj-gL7w.js";import{t as d,m as g}from"./tidslinjeHendelser-CL8nRInl.js";import{s as j}from"./saker-CDqZTi32.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-D_2QD5k9.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-BzZlyfVG.js";import"./skjemanummer-BJzCGP8B.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DWQEofiW.js";import"./useSelectedSak-69CnXisn.js";import"./useQuery-CK4ffj2H.js";import"./api-DtyvSpDy.js";import"./sakerUtils-C3z8xbki.js";import"./Snarveier-B1k3lcal.js";import"./LenkePanel-CCDNYnB0.js";import"./Dokument-Dcqcudzl.js";import"./dokumenterUtils-CZsFx7Dy.js";import"./Tag-BKIg1B-o.js";import"./GrupperteDokumenter-1pUfTxpJ.js";import"./guid-CsArkN6i.js";import"./Header-Dvty74p0.js";import"./LayoutWrapper-CTsCCrwp.js";import"./StatusTag-DB0eFeoj.js";import"./Stroller-DQ2W0QXm.js";import"./NoeGikkGalt-C4zBlwi3.js";import"./MinidialogSkjema-wq8vwgRS.js";import"./BekreftelseSendtSøknad-CFHnPPwM.js";import"./KontonummerInfo-C5KSiyhg.js";import"./HarIkkeSaker-Jei8Vu37.js";import"./SøkelenkerPanel-BRz_BnlM.js";import"./HarSaker-B99isvmt.js";import"./SakLink-Cj80PN0k.js";import"./ContentSection-btS7lCTR.js";import"./Svangerskapspenger-D5zODdKg.js";import"./DinPlan-D2Lrk6If.js";import"./Oppgaver-ClZzStgY.js";import"./OppgaveLenkepanel-iDrMfmyh.js";import"./KontaktOss-BMmUGRiV.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
