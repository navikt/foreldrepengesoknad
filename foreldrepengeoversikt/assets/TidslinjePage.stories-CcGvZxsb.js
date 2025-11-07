import{i as a,j as t}from"./iframe-Dt1u57QF.js";import{h as r,H as s}from"./index-DxtMYL-G.js";import{t as p,m as l}from"./tidslinjeHendelser-DKuBxUHR.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-BUKWSigE.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-F3xJcs4c.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dt4APzO7.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Cy0_-ybi.js";import"./useBackgroundColor-DmZSJRHX.js";import"./useSelectedSak-DiUd8Bk_.js";import"./useQuery-zIu5wQ5V.js";import"./sakerUtils-Bkl0es5R.js";import"./Snarveier-BECpz_3q.js";import"./LenkePanel-CfDHj27F.js";import"./index-Cfam7Diz.js";import"./Header-Vp6XdOF9.js";import"./LayoutWrapper-GcfgGH-M.js";import"./StatusTag-D3Kilpau.js";import"./Tag-CcWkZLVs.js";import"./Stroller-CIA79R-C.js";import"./NoeGikkGalt-Jiq1kM9e.js";import"./MinidialogSkjema-CIc21ziC.js";import"./HarIkkeSaker-B9v0rj9l.js";import"./SøkelenkerPanel-_b2kPajp.js";import"./HarSaker-BE2YKz2g.js";import"./SakLink-DFa8sZoO.js";import"./guid-CsArkN6i.js";import"./ContentSection-DXudZzql.js";import"./BekreftelseSendtSøknad-C7woXssG.js";import"./KontonummerInfo-D4exuno2.js";import"./Accordion-tgAASz3G.js";import"./Svangerskapspenger-Brfw-OlG.js";import"./DinPlan-BjpSBWKO.js";import"./Oppgaver-T_Th2VoO.js";import"./OppgaveLenkepanel-DR_ouVk6.js";import"./KontaktOss-CgoCieiF.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      navn: {
        fornavn: 'Olga',
        etternavn: 'Utvikler'
      },
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...e.parameters?.docs?.source}}};const tt=["Default"];export{e as Default,tt as __namedExportsOrder,Z as default};
