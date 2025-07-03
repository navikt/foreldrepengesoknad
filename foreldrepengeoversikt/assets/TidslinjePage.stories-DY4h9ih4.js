import{i as l,j as t}from"./iframe-DaECt3Z8.js";import{h as e,H as s}from"./index-DNqndl6Q.js";import{t as d,m as g}from"./tidslinjeHendelser-B19LdMeY.js";import{s as j}from"./saker-BZlJNJOF.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Ox7cOBK_.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-kgsSJYlP.js";import"./skjemanummer-CxI1uXZD.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-vPVfVYRK.js";import"./useSelectedSak-DZyfiPgh.js";import"./useQuery-BX72ev6N.js";import"./api-mnR8y_Mt.js";import"./sakerUtils-BB_sZ5KJ.js";import"./Snarveier-C_8nWk9u.js";import"./LenkePanel-_DCG2xIr.js";import"./Dokument-B4MoYlQN.js";import"./dokumenterUtils-Bvaz38Jo.js";import"./Tag-CDdW2xhx.js";import"./GrupperteDokumenter-DNebOBbg.js";import"./guid-CsArkN6i.js";import"./Header-CtEOOVJh.js";import"./LayoutWrapper-DTHDRAVX.js";import"./StatusTag-CYejGbN6.js";import"./Stroller-BmUTCjIc.js";import"./NoeGikkGalt-CmI243lx.js";import"./MinidialogSkjema-BofcKN95.js";import"./BekreftelseSendtSøknad-DO6Vbtqh.js";import"./KontonummerInfo-D8aE_SJ-.js";import"./HarIkkeSaker-CcMkED9c.js";import"./SøkelenkerPanel-D4kYRUlF.js";import"./HarSaker-ysf-cX85.js";import"./SakLink-B0k0U_Ea.js";import"./ContentSection-DmMNn25R.js";import"./Svangerskapspenger-BUAiWXfW.js";import"./DinPlan-C_Qg4xI2.js";import"./Oppgaver-B5LJm_tZ.js";import"./OppgaveLenkepanel-C6DtnLD7.js";import"./KontaktOss-C57j8cU9.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
