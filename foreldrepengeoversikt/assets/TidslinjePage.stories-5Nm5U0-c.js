import{i as l,j as t}from"./iframe-BJOrK8-u.js";import{h as e,H as s}from"./index-CLvwcM3t.js";import{t as d,m as g}from"./tidslinjeHendelser-BMeuebFi.js";import{s as j}from"./saker-DMdSr78P.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-D_3K1CLp.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-Cne6DSfx.js";import"./skjemanummer-Cs-WVIsw.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BENKqGfq.js";import"./useSelectedSak-C2rzVa9X.js";import"./useQuery-qwHCOTra.js";import"./api-B_xs-BIG.js";import"./sakerUtils-cU-6GnH2.js";import"./Snarveier-CYwXTp5M.js";import"./LenkePanel-DP-yx1ji.js";import"./Dokument-C-oU9tKH.js";import"./dokumenterUtils-zK5_CNJB.js";import"./Tag-DZvb3DJv.js";import"./GrupperteDokumenter-CDMVn5zp.js";import"./guid-CsArkN6i.js";import"./Header-CJZxsj5r.js";import"./LayoutWrapper-DiLiBCQY.js";import"./StatusTag-CVJ7ZIIE.js";import"./Stroller-BCDc_win.js";import"./NoeGikkGalt-6BfPGkt5.js";import"./MinidialogSkjema-CtuLEHFi.js";import"./BekreftelseSendtSøknad-BmdJqkQC.js";import"./KontonummerInfo-Dz7lSHTY.js";import"./HarIkkeSaker-BYlHJm4N.js";import"./SøkelenkerPanel-Ba-F0uF_.js";import"./HarSaker-DH-2Z6Ds.js";import"./SakLink-Bo2onosa.js";import"./ContentSection-C-_4XQ1t.js";import"./Svangerskapspenger-Cpz9khrP.js";import"./DinPlan-kII7WsVF.js";import"./Oppgaver-D4A5_bh9.js";import"./OppgaveLenkepanel-DqVdwwQm.js";import"./KontaktOss-SFF0nuqa.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
