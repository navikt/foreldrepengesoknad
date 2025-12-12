import{w as c,j as e,r as l,E}from"./iframe-B4JkKsZa.js";import{M as g,P as R}from"./usePlanleggerNavigator-DXiXYJZG.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D-lgbFnb.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-MLiiyN74.js";import"./barnetUtils-nH6gUow_.js";import"./hvemHarRettUtils-DV5Gn8hu.js";import"./satserUtils-DGh5cxbM.js";import"./ArbeidssituasjonSteg-BsZDx0GX.js";import"./BlueRadioGroup-CboFgfJJ.js";import"./customErrorFormatter-BJ2mX5Je.js";import"./PlanleggerStepPage-DSZYJLAF.js";import"./useScrollBehaviour-Dykvi2D9.js";import"./BarnehageplassSteg-E0OPTQ2l.js";import"./uttakUtils-DM-9Tgak.js";import"./BabyWrapped-C44ZNNCw.js";import"./Information-DM1ShRCM.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BrRa8jtd.js";import"./HvemPlanleggerSteg-B4syKckY.js";import"./HvorLangPeriodeSteg-ympq9pH2.js";import"./PersonGroup-CatoXLEF.js";import"./HvorMyeSteg-BOQyyNaM.js";import"./Wallet-CAKkxnPR.js";import"./OmBarnetSteg-B9Jxa0I2.js";import"./TasklistStart-BQlIDk_e.js";import"./OmPlanleggerenSteg-Cvapzlo_.js";import"./OppsummeringSteg-DKWWFKLs.js";import"./ShareDataInfobox-BnneaqGk.js";import"./useLagUttaksplanForslag-PP5fuPey.js";import"./PlanenDeresSteg-DbgEQXRa.js";import"./HvaErMulig-CBKQBVZD.js";import"./PersonPregnant-DmbBTo2y.js";import"./UforutsetteEndringer-TmLAIgM9.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const et=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,et as __namedExportsOrder,tt as default};
