import{i as l,j as t}from"./iframe-CiBBIibO.js";import{h as e,H as s}from"./index-Bx2ZTO5x.js";import{t as d,m as g}from"./tidslinjeHendelser-DlMpfzCT.js";import{s as j}from"./saker-DK3tvixE.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-BQlYPBSj.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-BwtDIuMi.js";import"./skjemanummer-sUU-81t8.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D5OPZaMp.js";import"./useSelectedSak-DmONFILP.js";import"./useQuery-Br7n5B-n.js";import"./api-Cu_i9nXP.js";import"./sakerUtils-D9CItECY.js";import"./Snarveier-f02VCDem.js";import"./LenkePanel-Dvq3RSsR.js";import"./Dokument-CSD-biYD.js";import"./dokumenterUtils-DkmFLu0M.js";import"./Tag-b1OeqJc3.js";import"./GrupperteDokumenter-CPjmt8xs.js";import"./guid-CsArkN6i.js";import"./Header-kbDqfvO0.js";import"./LayoutWrapper-CLy-ITXw.js";import"./StatusTag-CdxCSvKu.js";import"./Stroller-zxJ8LX8x.js";import"./NoeGikkGalt-B4AW46ex.js";import"./MinidialogSkjema--9YeLYHl.js";import"./BekreftelseSendtSøknad-DOqvm4GC.js";import"./KontonummerInfo-CITP48uy.js";import"./HarIkkeSaker-BNmVYppg.js";import"./SøkelenkerPanel-CgYrwgrn.js";import"./HarSaker-CsRqq6gK.js";import"./SakLink-BGR2nJyU.js";import"./ContentSection-CHbyUyyr.js";import"./Svangerskapspenger-DrdT5nXk.js";import"./DinPlan-CTucwqjP.js";import"./Oppgaver-BBTdjTto.js";import"./OppgaveLenkepanel-BzUjlSpH.js";import"./KontaktOss-DJvigY4g.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
