import{i as l,j as t}from"./iframe-C-KoTMfU.js";import{h as e,H as s}from"./index-QOGovpQC.js";import{t as d,m as g}from"./tidslinjeHendelser-BdYnnvH6.js";import{s as j}from"./saker-CJjAPvFj.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-DKM15ckK.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-DuW7kf3y.js";import"./skjemanummer-Ch-0KA3D.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BEknrgQy.js";import"./useSelectedSak-CEb_H5Wg.js";import"./useQuery-BlLOHK6a.js";import"./api-BrOSQk1Z.js";import"./sakerUtils-BcCrBXv1.js";import"./Snarveier-CFHeDe12.js";import"./LenkePanel-DrT4Rqhu.js";import"./Dokument-Bx_ULSjE.js";import"./dokumenterUtils-BrL9LuJZ.js";import"./Tag-BNxbDHnG.js";import"./GrupperteDokumenter-BK_xDBEQ.js";import"./guid-CsArkN6i.js";import"./Header-B3Pr99jN.js";import"./LayoutWrapper-DjOM9FKP.js";import"./StatusTag-DgsLyUJ4.js";import"./Stroller-DtdO5A-G.js";import"./NoeGikkGalt-DECC-h_6.js";import"./MinidialogSkjema-C9eHlnTj.js";import"./BekreftelseSendtSøknad-RRZHiSj9.js";import"./KontonummerInfo-CFuFXEXU.js";import"./HarIkkeSaker-o9YhxBC3.js";import"./SøkelenkerPanel-B47jP7f6.js";import"./HarSaker-BbC-RVZw.js";import"./SakLink-5-7X-jue.js";import"./ContentSection-CaqlGW8j.js";import"./Svangerskapspenger-D-i50wGn.js";import"./DinPlan-DhGcTDCk.js";import"./Oppgaver-D5TAXUEI.js";import"./OppgaveLenkepanel-DFA1TXAI.js";import"./KontaktOss-DTdEMxxO.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
