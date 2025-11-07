import{w as c,j as r,r as l,E}from"./iframe-n6-YopwE.js";import{M as g,P as R}from"./usePlanleggerNavigator-CLvJwV9n.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-V0oDorz9.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-B51YL1Zs.js";import"./barnetUtils-Dyg3uo-b.js";import"./hvemHarRettUtils-6pkcisRk.js";import"./satserUtils-il83ecEn.js";import"./ArbeidssituasjonSteg-DsA-NcxC.js";import"./BlueRadioGroup-U5Yve6lL.js";import"./customErrorFormatter-CsAiuciB.js";import"./PlanleggerStepPage-JWePG97O.js";import"./useScrollBehaviour-C-tEOr8l.js";import"./Spacer-DOFd39uF.js";import"./BarnehageplassSteg-CTEZq76_.js";import"./uttakUtils-BvwyIqXZ.js";import"./BabyWrapped-CFa9LKf8.js";import"./Information-CfA0h6he.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BnL3yH8b.js";import"./HvemPlanleggerSteg-DkLHKNA0.js";import"./HvorLangPeriodeSteg-anZXU8cw.js";import"./PersonGroup-fEMNGN61.js";import"./HvorMyeSteg-DMA5YOSb.js";import"./Wallet-B1X64akb.js";import"./OmBarnetSteg-DMgrLZBh.js";import"./TasklistStart-Dss5udof.js";import"./OmPlanleggerenSteg-Dbum5e_w.js";import"./OppsummeringSteg-Dzc7t0PZ.js";import"./ShareDataInfobox-NIOskMF1.js";import"./CalendarLabels-Di8lFUMp.js";import"./CalendarIconLabel-BY_NnEAU.js";import"./FamiliehendelseLabel-BdnaerHF.js";import"./PlanenDeresSteg-WKIZGLiH.js";import"./OmÅTilpassePlanen-maMomIOD.js";import"./PersonPregnant-nde-bNYv.js";import"./PencilWriting-DZ7JvRuY.js";import"./UforutsetteEndringer-C9L1q7qw.js";import"./ToggleGroup-Fs8Z2yM5.js";import"./TilpassPlanenSteg-BXasjhiX.js";import"./HvaErMulig-Bl8fyGPx.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.intern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json({
        '100': {
          kontoer: [{
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 75
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        },
        '80': {
          kontoer: [{
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 95
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      } satisfies KontoBeregningResultatDto))]
    }
  }
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
