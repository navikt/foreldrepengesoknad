import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as l}from"./useQuery-D4bRZ7iC.js";import{h as o,H as e}from"./index-B-Pz4-0B.js";import{t as d,m as g}from"./tidslinjeHendelser-DGOEt5Ts.js";import{s as j}from"./saker-RvtcuBD2.js";import{O as i}from"./routes-DFMVI8wI.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BWDN8BME.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as k,R as u,a as c}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./skjemanummer-DfIZjofp.js";import"./dates-C5Vjd-yy.js";import"./dokumenterUtils-D7dIe_oU.js";import"./api-l2Seuk3V.js";import"./UttaksdagenString-B8Yb1Gis.js";import"./stringUtils-xBoGBqui.js";import"./stønadskontoType-l1GAnwlP.js";import"./DekningsgradDTO-DRRk0ium.js";import"./UttaksplanKalender-DQKAxDBk.js";import"./index-DjWdgH6H.js";import"./iframe-BdlnsXAZ.js";import"./dateFormValidation-BuQA_ioX.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-jRVyhE9m.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-C3Ho5AT2.js";import"./sakerUtils-DqgcebI3.js";import"./Ytelse-7td-ciMh.js";import"./Snarveier-DjgYDKIE.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-Cinm193a.js";import"./Tag-DiV4T64p.js";import"./GrupperteDokumenter-CWRpKJJR.js";import"./guid-CsArkN6i.js";import"./Header-QWKzcFD6.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-ZvFZRO2_.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-BowRlx4A.js";import"./BekreftelseSendtSøknad-D3oeVZ3E.js";import"./KontonummerInfo-CX3gHwI7.js";import"./HarIkkeSaker-CDKOtJYi.js";import"./SøkelenkerPanel-D3VHkPCq.js";import"./HarSaker-BV9cHvoE.js";import"./SakLink-NSobBx8y.js";import"./ContentSection-DqBoVSpP.js";import"./DinPlan-gQbVsJe2.js";import"./Oppgaver-CX9NQYKk.js";import"./OppgaveLenkepanel-qBESdSUq.js";import"./KontaktOss-BS4Rot9y.js";const v=new f,wt={title:"TidslinjePage",component:m,render:a=>t.jsx(l,{client:v,children:t.jsx(k,{initialEntries:[`/${i.TIDSLINJEN}/352011079`],children:t.jsx(u,{children:t.jsx(c,{element:t.jsx(m,{...a}),path:`/${i.TIDSLINJEN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[o.get(".//rest/innsyn/v2/saker",()=>e.json(j)),o.get(".//rest/innsyn/tidslinje",()=>e.json(d)),o.get(".//rest/historikk/vedlegg",()=>e.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var p,s,n;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
