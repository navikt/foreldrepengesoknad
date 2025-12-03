import{k as p,j as t}from"./iframe-DsGsQw9v.js";import{h as e,H as r}from"./index-HpukULMR.js";import{t as a,m as l}from"./tidslinjeHendelser-BR2OyF1C.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-B4VFRiDa.js";import{A as s}from"./queries-Bt-SZI59.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BZVF6RoS.js";import{M as f,R as j,a as k}from"./chunk-4WY6JWTD-B41SJznC.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-EnhMCYbj.js";import"./useBackgroundColor-D-mgyLB_.js";import"./useSelectedSak-BPmWeyAT.js";import"./useQuery-Ce6ZbQu4.js";import"./sakerUtils-DWiB8uaM.js";import"./Snarveier-G89MiYN5.js";import"./LenkePanel-BjO-1Bpl.js";import"./index-C_8GM9F2.js";import"./Header-Br3edl2P.js";import"./LayoutWrapper-109CqojS.js";import"./StatusTag-DzhUhQ2z.js";import"./Tag-BGbxi9pS.js";import"./Stroller-Cpql9gcg.js";import"./NoeGikkGalt-edz6sxgt.js";import"./MinidialogSkjema-YL3OEC6w.js";import"./HarIkkeSaker-D44ZySC6.js";import"./SøkelenkerPanel-BheKuPd5.js";import"./HarSaker-B5VIhajh.js";import"./SakLink-DybhnZgV.js";import"./guid-CsArkN6i.js";import"./ContentSection-3pQl6Ncf.js";import"./BekreftelseSendtSøknad-YuIZzFqz.js";import"./KontonummerInfo-DbJJnXJa.js";import"./Accordion-CtAUmVu5.js";import"./Svangerskapspenger-DXwWuV7K.js";import"./DinPlan-gmDwB-oJ.js";import"./Oppgaver-76n-pfLF.js";import"./OppgaveLenkepanel-CO-wFH1Y.js";import"./KontaktOss-DDBwNror.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
