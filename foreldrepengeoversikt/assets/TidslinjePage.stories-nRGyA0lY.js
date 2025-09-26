import{i as m,j as t}from"./iframe-BWhq4fyu.js";import{h as e,H as s}from"./index-_7JYSoCF.js";import{t as p,m as a}from"./tidslinjeHendelser-D3_VxAYc.js";import{s as l}from"./saker-Cu36d-1o.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-DKpZqzry.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-DoQKGFxJ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-jSDbEOpT.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BppmhGXD.js";import"./useSelectedSak-Dwu7lkyh.js";import"./useQuery-KYWYe_x7.js";import"./api-RiahO2Kf.js";import"./sakerUtils-DuAQIJVe.js";import"./Snarveier-BGQiscSq.js";import"./LenkePanel-B2YseVyy.js";import"./index-yBHUajFG.js";import"./Dokument-buIwdCdY.js";import"./dokumenterUtils-C1uR4-Nk.js";import"./Tag-5QvliXKx.js";import"./GrupperteDokumenter-kh7bYGf_.js";import"./guid-CsArkN6i.js";import"./Accordion-CjOkC4XT.js";import"./Header-C1AtOBny.js";import"./LayoutWrapper-DSrwuGWK.js";import"./StatusTag-gx__LYeY.js";import"./Stroller-D5Y-Ajoi.js";import"./NoeGikkGalt-Cjh40HUl.js";import"./MinidialogSkjema-C8jx-ce5.js";import"./BekreftelseSendtSøknad-W1qtU87n.js";import"./KontonummerInfo-DsoLnkEj.js";import"./HarIkkeSaker-BV89EtfZ.js";import"./SøkelenkerPanel-5s1ZnJYD.js";import"./HarSaker-tbxxB0Ps.js";import"./SakLink-DXsw_ChO.js";import"./ContentSection-Cb9ubSTK.js";import"./Svangerskapspenger-9_YCMMtx.js";import"./DinPlan-J2IgUr4H.js";import"./Oppgaver-BPPZzKrC.js";import"./OppgaveLenkepanel-BimFY_sm.js";import"./KontaktOss-BjgAtnC1.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
