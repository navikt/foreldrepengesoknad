import{w as c,j as r,r as l,E}from"./iframe-DbXB_reC.js";import{M as g,P as R}from"./usePlanleggerNavigator-DMAkaK6y.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-C2HowQky.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DX9-7MKR.js";import"./barnetUtils-K9NBFfVD.js";import"./hvemHarRettUtils-gdf9mZ5G.js";import"./satserUtils-D_fhRaJC.js";import"./ArbeidssituasjonSteg-DfnZj5IR.js";import"./BlueRadioGroup-D8XGfQPY.js";import"./customErrorFormatter-DShtlW1s.js";import"./PlanleggerStepPage-B-C29En_.js";import"./useScrollBehaviour-DgFobnoE.js";import"./BarnehageplassSteg-Pbq4BUAI.js";import"./uttakUtils-5yXgHYsk.js";import"./BabyWrapped-q1k0Mx1J.js";import"./Information-CCdeveWN.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-B5xAZGd8.js";import"./HvemPlanleggerSteg-zTiTf7A3.js";import"./HvorLangPeriodeSteg-C7d3SO34.js";import"./PersonGroup-DsrTHWM0.js";import"./HvorMyeSteg-Cv2Ld_uw.js";import"./Wallet-_YBlHXUQ.js";import"./OmBarnetSteg-Dw0Wl886.js";import"./TasklistStart-Cc9JkdON.js";import"./OmPlanleggerenSteg-E9oZ3uZF.js";import"./OppsummeringSteg-M4NCdsg1.js";import"./ShareDataInfobox-D72gwxz8.js";import"./useLagUttaksplanForslag-BswIQEJ3.js";import"./PlanenDeresSteg-Cg7nxwSQ.js";import"./OmÅTilpassePlanen-CkT3SwoX.js";import"./PersonPregnant-XXEb-wvb.js";import"./PencilWriting-aiYbSwG2.js";import"./UforutsetteEndringer-ChbB7Co5.js";import"./ToggleGroup-cdTvkZvJ.js";import"./TilpassPlanenSteg-CdlU0F1p.js";import"./HvaErMulig-DO7Ho21p.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const at=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,at as __namedExportsOrder,nt as default};
