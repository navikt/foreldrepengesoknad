import{w as c,j as r,r as l,E}from"./iframe-Dmmeu8zu.js";import{M as g,P as R}from"./usePlanleggerNavigator-DcvEpiiC.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CE_XJ5Bm.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-C7C-xZkd.js";import"./barnetUtils-C3cEUz6n.js";import"./hvemHarRettUtils-BRkimMiV.js";import"./satserUtils-9YPtPhyG.js";import"./ArbeidssituasjonSteg-CFWUBGwY.js";import"./BlueRadioGroup-CMuy_C-a.js";import"./customErrorFormatter-DFj8T-aF.js";import"./PlanleggerStepPage-B5F-BpvO.js";import"./useScrollBehaviour-BMAGxRTk.js";import"./BarnehageplassSteg-4UF1GsEy.js";import"./uttakUtils-BYx5YdKo.js";import"./BabyWrapped-SP9jXx8X.js";import"./Information-CWFGeJE_.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-D7M5OqkD.js";import"./HvemPlanleggerSteg-Da2mMrp6.js";import"./HvorLangPeriodeSteg-Ho6Ycooz.js";import"./PersonGroup-CyC-fTrQ.js";import"./HvorMyeSteg-CdHFktWu.js";import"./Wallet-JY1bxk1_.js";import"./OmBarnetSteg-CoASTRBs.js";import"./TasklistStart-IBztjPFL.js";import"./OmPlanleggerenSteg-Dnm25YTF.js";import"./OppsummeringSteg-BFDPIJF3.js";import"./ShareDataInfobox-CIxKiRy4.js";import"./PlanenDeresSteg-DDc6urEo.js";import"./OmÅTilpassePlanen-DMH6cxWg.js";import"./PersonPregnant-BW8gADC9.js";import"./PencilWriting-BjWlgLyp.js";import"./UforutsetteEndringer-Dsj7y1RO.js";import"./ToggleGroup-Ii5d-Pi4.js";import"./TilpassPlanenSteg-GSGvwtGq.js";import"./HvaErMulig-DtidlH6H.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const nt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,e as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,nt as __namedExportsOrder,ot as default};
