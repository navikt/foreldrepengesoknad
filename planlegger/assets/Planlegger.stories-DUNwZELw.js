import{w as c,j as o,r as l,E}from"./iframe-Dl5tCAIC.js";import{M as k,P as g}from"./usePlanleggerNavigator-CRPKJXJq.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BbJ0iae7.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-hU-R16o8.js";import"./barnetUtils-3VQFAqGJ.js";import"./hvemHarRettUtils-BnwfFIjQ.js";import"./satserUtils-EnJichZ9.js";import"./ArbeidssituasjonSteg-D9v1DhLF.js";import"./BlueRadioGroup-CBFDph2D.js";import"./customErrorFormatter-xrmAJPQ_.js";import"./PlanleggerStepPage-DDgla6Mc.js";import"./useScrollBehaviour-C1-DVm5-.js";import"./Spacer-C9-w03KS.js";import"./BarnehageplassSteg-BWsk3yfa.js";import"./uttakUtils-DKfO2R5_.js";import"./BabyWrapped-DYdtMGrq.js";import"./Information-B1zcI92j.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-Dqq6enMt.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Dddeyvp7.js";import"./HvorLangPeriodeSteg-Dx4THns1.js";import"./PersonGroup-Cxrr-NAK.js";import"./HvorMyeSteg-2Xt5d-ZE.js";import"./Wallet-j-tx99a4.js";import"./OmBarnetSteg-Be29SkPH.js";import"./TasklistStart-CdiyrW9I.js";import"./OmPlanleggerenSteg-1F9QJCFp.js";import"./OppsummeringSteg-DgdVP9Rg.js";import"./ShareDataInfobox-BD5hFa3h.js";import"./CalendarLabels-dgBixUas.js";import"./CalendarIconLabel-Bd93mwMx.js";import"./FamiliehendelseLabel-DViPZkRt.js";import"./PlanenDeresSteg-Bq9Fv_S4.js";import"./OmÅTilpassePlanen-9UdmC_kf.js";import"./PersonPregnant-Cdo8wR_k.js";import"./PencilWriting-BAfH38vN.js";import"./UforutsetteEndringer-Cxgo_R7N.js";import"./ToggleGroup-3uMhljrg.js";import"./TilpassPlanenSteg-CiR3itGO.js";import"./HvaErMulig-h_wMTNWf.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
