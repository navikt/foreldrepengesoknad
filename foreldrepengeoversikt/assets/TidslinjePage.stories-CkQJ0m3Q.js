import{i as l,j as t}from"./iframe-BWs6YiSD.js";import{h as e,H as s}from"./index-KPA9rKLR.js";import{t as d,m as g}from"./tidslinjeHendelser-DRtGn99i.js";import{s as j}from"./saker-DRaJfyN-.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-xiNqowC3.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-CuQejqUr.js";import"./skjemanummer-Bkp7YBg1.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Cdz_QgVI.js";import"./useSelectedSak-CKXYGI5S.js";import"./useQuery-C7AIrGlu.js";import"./api-DtDQGiqu.js";import"./sakerUtils-CH7c72yn.js";import"./Snarveier-Do_JLBL6.js";import"./LenkePanel-mBkaE_Sx.js";import"./Dokument-o45URCmp.js";import"./dokumenterUtils-DrWjTrzt.js";import"./Tag-Ba_6zhSf.js";import"./GrupperteDokumenter-DsyRW8Tp.js";import"./guid-CsArkN6i.js";import"./Header-Boz9vISm.js";import"./LayoutWrapper-B-FaSvvX.js";import"./StatusTag-DIu5IVN9.js";import"./Stroller-DKofNBT2.js";import"./NoeGikkGalt-B1Y0jFLu.js";import"./MinidialogSkjema-Bn4RWP45.js";import"./BekreftelseSendtSøknad-DfdraupN.js";import"./KontonummerInfo-B-J8mOLx.js";import"./HarIkkeSaker-D5vI1z11.js";import"./SøkelenkerPanel-BWiFSppm.js";import"./HarSaker-CRZJ-phX.js";import"./SakLink-CF5KBtqV.js";import"./ContentSection-JQ-7vG8-.js";import"./Svangerskapspenger-c9tPPdEy.js";import"./DinPlan-DmNokECe.js";import"./Oppgaver-zVzDlN-2.js";import"./OppgaveLenkepanel-PEK1ebeG.js";import"./KontaktOss-CBNLmZ8m.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
