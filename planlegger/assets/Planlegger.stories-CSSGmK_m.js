import{w as c,j as o,r as l,E}from"./iframe-DP_t9eBI.js";import{M as k,P as g}from"./usePlanleggerNavigator-HIxNafAn.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CalsSttT.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-B1CZvnnv.js";import"./barnetUtils-CzGrketS.js";import"./hvemHarRettUtils-DhODSxxA.js";import"./satserUtils-BLaTb11-.js";import"./ArbeidssituasjonSteg-D2fyVYO_.js";import"./BlueRadioGroup-CvgsWwB7.js";import"./customErrorFormatter-mERXjlIT.js";import"./PlanleggerStepPage-smRU_v4S.js";import"./useScrollBehaviour-B3xlcG3h.js";import"./Spacer-CqudP2l5.js";import"./BarnehageplassSteg-BjEAa2Sa.js";import"./uttakUtils-B4VmJN73.js";import"./BabyWrapped-DdqVJKbl.js";import"./Information-J0UM-40J.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-thi5WbKi.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CBK9Z1kN.js";import"./HvorLangPeriodeSteg-vt81T5N4.js";import"./PersonGroup-C9YlW0xD.js";import"./HvorMyeSteg-BIVtVbDE.js";import"./Wallet-DXmm2-8Z.js";import"./OmBarnetSteg-BrQlTwqV.js";import"./TasklistStart-CiFfWnRW.js";import"./OmPlanleggerenSteg-Bp8MayV9.js";import"./OppsummeringSteg-CM5r8SuB.js";import"./ShareDataInfobox-CJwhE-d8.js";import"./CalendarLabels-C1D4x2_n.js";import"./CalendarIconLabel-DbaK0a2O.js";import"./FamiliehendelseLabel-BiO0oXfd.js";import"./PlanenDeresSteg-WdJUxds-.js";import"./OmÅTilpassePlanen-B0DUzrV5.js";import"./PersonPregnant-BygM_M92.js";import"./PencilWriting-BgJyQoSl.js";import"./UforutsetteEndringer-BstjpSda.js";import"./ToggleGroup-Cg3_y8Wy.js";import"./TilpassPlanenSteg-SFw3nHCV.js";import"./HvaErMulig-CYXPQYS7.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
