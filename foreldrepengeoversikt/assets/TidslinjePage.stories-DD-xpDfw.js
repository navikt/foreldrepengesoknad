import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as l}from"./useQuery-D4bRZ7iC.js";import{h as o,H as e}from"./index-B-Pz4-0B.js";import{t as d,m as g}from"./tidslinjeHendelser-BHnfS4Dm.js";import{s as j}from"./saker-8XUfCwXd.js";import{O as i}from"./routes-DFMVI8wI.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DRST_-Kt.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as k,R as u,a as c}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./skjemanummer-DfIZjofp.js";import"./dates-C5Vjd-yy.js";import"./stønadskontoType-l1GAnwlP.js";import"./RettighetType-BD_oerVS.js";import"./UttaksplanKalender-wWWfd3YH.js";import"./index-DjWdgH6H.js";import"./iframe-lqtI9b62.js";import"./dateFormValidation-DXIVDO2q.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./UttaksdagenString-B8Yb1Gis.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-HAqS6-7H.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-DaKIy5a-.js";import"./api-l2Seuk3V.js";import"./sakerUtils-BLRcdn6E.js";import"./Snarveier-CobHxafq.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-DYWDqIcq.js";import"./dokumenterUtils-teRJOGbX.js";import"./Tag-DiV4T64p.js";import"./GrupperteDokumenter-DokoUGfA.js";import"./guid-CsArkN6i.js";import"./Header-BIJADFh-.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-C3F66Mxc.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-DOV45jc8.js";import"./BekreftelseSendtSøknad-CJbkuYAf.js";import"./KontonummerInfo-BsnIeNnQ.js";import"./HarIkkeSaker-CDKOtJYi.js";import"./SøkelenkerPanel-D3VHkPCq.js";import"./HarSaker-CFuQNgjt.js";import"./SakLink-BkGHkN5r.js";import"./ContentSection-DqBoVSpP.js";import"./Svangerskapspenger-BDoB8bPk.js";import"./DinPlan-C5upqz-P.js";import"./Oppgaver-BfqTipZf.js";import"./OppgaveLenkepanel-BUEjP4nd.js";import"./KontaktOss-BS4Rot9y.js";const v=new f,wt={title:"TidslinjePage",component:m,render:a=>t.jsx(l,{client:v,children:t.jsx(k,{initialEntries:[`/${i.TIDSLINJEN}/352011079`],children:t.jsx(u,{children:t.jsx(c,{element:t.jsx(m,{...a}),path:`/${i.TIDSLINJEN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[o.get(".//rest/innsyn/v2/saker",()=>e.json(j)),o.get(".//rest/innsyn/tidslinje",()=>e.json(d)),o.get(".//rest/historikk/vedlegg",()=>e.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var p,s,n;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(n=(s=r.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const At=["Default"];export{r as Default,At as __namedExportsOrder,wt as default};
