import{w as c,j as o,r as l,E}from"./iframe-fPI5aq2O.js";import{M as k,P as g}from"./usePlanleggerNavigator-CeDTzdr5.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-haH_c_uL.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DVNChNZi.js";import"./barnetUtils-DQot4dki.js";import"./hvemHarRettUtils-CcghcU1b.js";import"./satserUtils-BmxkpB9Z.js";import"./ArbeidssituasjonSteg-DAFZSnDd.js";import"./BlueRadioGroup-BJAPsAmD.js";import"./customErrorFormatter-BzKyC3C7.js";import"./PlanleggerStepPage-B7bYn7ti.js";import"./useScrollBehaviour-BT-vTIkQ.js";import"./Spacer-BVIQugQL.js";import"./BarnehageplassSteg-CCHD85pT.js";import"./uttakUtils-BZiPgOZo.js";import"./BabyWrapped-DnlBZNM4.js";import"./Information-B51qEWYC.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-thxFDRFk.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-COaGLspy.js";import"./HvorLangPeriodeSteg-CZ4MlWb2.js";import"./PersonGroup-BBE5Yaqc.js";import"./HvorMyeSteg-BF2RIo4L.js";import"./Wallet-DAAZgaA2.js";import"./OmBarnetSteg-BLY96nrT.js";import"./TasklistStart-B-zIzs88.js";import"./OmPlanleggerenSteg-C_P1BpWE.js";import"./OppsummeringSteg-CxCE8R58.js";import"./ShareDataInfobox-DJ4Ky7G9.js";import"./CalendarLabels-Bue1swYQ.js";import"./CalendarIconLabel-CF2-zKDQ.js";import"./FamiliehendelseLabel-DtDCH_G3.js";import"./PlanenDeresSteg-CQGQ_pak.js";import"./OmÅTilpassePlanen-BXp24yHf.js";import"./PersonPregnant-My9EkqCh.js";import"./PencilWriting-Bcz48Det.js";import"./UforutsetteEndringer-D2ibBoc4.js";import"./ToggleGroup-BZFbx6GU.js";import"./TilpassPlanenSteg-B-g0TyI0.js";import"./HvaErMulig-C4zCQPn7.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
