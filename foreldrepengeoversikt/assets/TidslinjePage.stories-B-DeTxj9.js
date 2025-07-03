import{i as l,j as t}from"./iframe-CrL3Ypy-.js";import{h as e,H as s}from"./index-CNTqNSA1.js";import{t as d,m as g}from"./tidslinjeHendelser-oMwdVMRd.js";import{s as j}from"./saker-ZTCVJa2W.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-d0So1a2j.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-CZhkTeAi.js";import"./skjemanummer-YDzzj7t7.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CHFtoeT0.js";import"./useSelectedSak-DoBTZ9DJ.js";import"./useQuery-Dqt3d12g.js";import"./api-DBpJss1J.js";import"./sakerUtils-BZ9Omgr1.js";import"./Snarveier-B019-heO.js";import"./LenkePanel-Ds1G-tGg.js";import"./Dokument-D1gb5adX.js";import"./dokumenterUtils-B6p9CfrP.js";import"./Tag-P2T02cq9.js";import"./GrupperteDokumenter-jDZ_Zd9y.js";import"./guid-CsArkN6i.js";import"./Header-CioW1ulI.js";import"./LayoutWrapper-Dv05frGX.js";import"./StatusTag-lsvVl_BG.js";import"./Stroller-EDxwlhfb.js";import"./NoeGikkGalt-B5iVquac.js";import"./MinidialogSkjema-BhAeh0mC.js";import"./BekreftelseSendtSøknad-CAVngVvt.js";import"./KontonummerInfo-X3zn2mT9.js";import"./HarIkkeSaker-BzgUJwbx.js";import"./SøkelenkerPanel-xMnfpMY1.js";import"./HarSaker-G1bVx-kS.js";import"./SakLink-pAgmrBMY.js";import"./ContentSection-DDMQNslg.js";import"./Svangerskapspenger-DibhvOFh.js";import"./DinPlan-MC93xYVq.js";import"./Oppgaver-BvgD4IaS.js";import"./OppgaveLenkepanel-Br4lPYZI.js";import"./KontaktOss-wJh9U4HO.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
