import{w as c,j as o,r as l,E}from"./iframe-lTbEZlEm.js";import{M as k,P as g}from"./usePlanleggerNavigator-CRhRFn00.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Bb3-E-ou.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CF9j5G6i.js";import"./barnetUtils-BwaGCggn.js";import"./hvemHarRettUtils-Dvl35H_g.js";import"./satserUtils-Cejnwco4.js";import"./ArbeidssituasjonSteg-Dyal733j.js";import"./BlueRadioGroup-C_B5X1ho.js";import"./customErrorFormatter-DrOhEMUU.js";import"./PlanleggerStepPage-CGK62CFZ.js";import"./useScrollBehaviour-DN4YLz3e.js";import"./Spacer-CxulsmRR.js";import"./BarnehageplassSteg--p-Jt0ds.js";import"./uttakUtils-D_LQGaT-.js";import"./BabyWrapped-C71VBcTK.js";import"./Information-DJrENpPR.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-BfXyKmUu.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-dTBUQ_Q1.js";import"./HvorLangPeriodeSteg-BChNbW2N.js";import"./PersonGroup-Cs8CxJre.js";import"./HvorMyeSteg-UMSAjg65.js";import"./Wallet-CXYhpHLq.js";import"./OmBarnetSteg-DeOMNifa.js";import"./TasklistStart-BLinR311.js";import"./OmPlanleggerenSteg-jpvUjAto.js";import"./OppsummeringSteg-CJ3eRq0G.js";import"./ShareDataInfobox-DU9hZ8bF.js";import"./CalendarLabels-DzsKRqA0.js";import"./CalendarIconLabel-BGNFUO5_.js";import"./FamiliehendelseLabel-CNQ1ZTLX.js";import"./PlanenDeresSteg-mNq_Rr6-.js";import"./OmÅTilpassePlanen-BMgsWewp.js";import"./PersonPregnant-DiWp1TlD.js";import"./PencilWriting-CQ4JZqs8.js";import"./UforutsetteEndringer-B44qcnPY.js";import"./ToggleGroup-Do-0zn8z.js";import"./TilpassPlanenSteg-BUgILtY4.js";import"./HvaErMulig-CQr5E82J.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
