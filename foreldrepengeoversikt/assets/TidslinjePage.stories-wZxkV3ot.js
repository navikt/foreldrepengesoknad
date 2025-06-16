import{i as l,j as t}from"./iframe-DuB7cK7M.js";import{h as e,H as s}from"./index-D9NeUst1.js";import{t as d,m as g}from"./tidslinjeHendelser-C3837wmc.js";import{s as j}from"./saker-BBpv7LgF.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Bt5z_2PD.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-BcrTknNP.js";import"./skjemanummer-BhnnU_TV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CjsBB-Wz.js";import"./useSelectedSak-9pdoRTez.js";import"./useQuery-Bx3zZXaq.js";import"./api-C2huO7jD.js";import"./sakerUtils-C58szazY.js";import"./Snarveier-DEHz-q3g.js";import"./LenkePanel-BJeWclXV.js";import"./Dokument-DkF-Npxb.js";import"./dokumenterUtils-6YqZsPUb.js";import"./Tag-CXdECPZQ.js";import"./GrupperteDokumenter-DwBifmw5.js";import"./guid-CsArkN6i.js";import"./Header-BBlQwpMk.js";import"./LayoutWrapper-Csns50ld.js";import"./StatusTag-CnRILs7g.js";import"./Stroller-CorakKgU.js";import"./NoeGikkGalt-BjY6b1Pu.js";import"./MinidialogSkjema-a7iupdhO.js";import"./BekreftelseSendtSøknad-OxbzJVmp.js";import"./KontonummerInfo-CFI8cmtj.js";import"./HarIkkeSaker-BHRm3piV.js";import"./SøkelenkerPanel-BirATrJm.js";import"./HarSaker-D2-3-rfK.js";import"./SakLink-Dc8AzRPX.js";import"./ContentSection-Dxc1NxOm.js";import"./Svangerskapspenger-DLYSjCBG.js";import"./DinPlan-BR28sMXm.js";import"./Oppgaver-Dj0KrNm_.js";import"./OppgaveLenkepanel-DEK1H25h.js";import"./KontaktOss-BKbPN7tS.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
