import{w as c,j as o,r as l,E}from"./iframe-BQxww76a.js";import{M as k,P as g}from"./usePlanleggerNavigator-Ck9vOT7O.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-jjCo5isd.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CHkpTJRV.js";import"./barnetUtils-D-NAEnpB.js";import"./hvemHarRettUtils-XiSusMmo.js";import"./satserUtils-DrcyYj9_.js";import"./ArbeidssituasjonSteg-CqcJDvLY.js";import"./BlueRadioGroup-BDiCkwzS.js";import"./customErrorFormatter-BIGTm8E9.js";import"./PlanleggerStepPage-BSLQ1IKi.js";import"./useScrollBehaviour-DEWDi70q.js";import"./Spacer-YS1D6Su9.js";import"./BarnehageplassSteg-3BnOiXWE.js";import"./uttakUtils-Cldiv8vK.js";import"./BabyWrapped-Bff-YuF4.js";import"./Information-ibO5lNk7.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-BKDkdiGf.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DSKVkLA-.js";import"./HvorLangPeriodeSteg-CVbld8kU.js";import"./PersonGroup-CU3s7x2y.js";import"./HvorMyeSteg-CNxpooRv.js";import"./Wallet-C9BLJSpO.js";import"./OmBarnetSteg-BgCzZZnh.js";import"./TasklistStart-CDY-HWFO.js";import"./OmPlanleggerenSteg-DFun2p_a.js";import"./OppsummeringSteg-_agrBhc2.js";import"./ShareDataInfobox-Dy8uEq5W.js";import"./CalendarLabels-DrJy0cdq.js";import"./CalendarIconLabel-CDwbk0-J.js";import"./FamiliehendelseLabel-fr_B-p8e.js";import"./PlanenDeresSteg-CR0XMuw9.js";import"./OmÅTilpassePlanen-cD9scCfr.js";import"./PersonPregnant-BkJ0ErTD.js";import"./PencilWriting-C1qanc07.js";import"./UforutsetteEndringer-C09Z1zse.js";import"./ToggleGroup-BB8wPHgF.js";import"./TilpassPlanenSteg-Bn7Stpz2.js";import"./HvaErMulig-qE2X5eIW.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      } satisfies {
        '80': KontoBeregningDto_fpoversikt;
        '100': KontoBeregningDto_fpoversikt;
      }))]
    }
  }
}`,...e.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
