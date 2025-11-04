import{w as c,j as o,r as l,E}from"./iframe-DJZ9Zr2b.js";import{M as k,P as g}from"./usePlanleggerNavigator-DhSODmXY.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Nhf7CIq1.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CNBm8w1y.js";import"./barnetUtils-C4-jdjCx.js";import"./hvemHarRettUtils-BDAdeTLv.js";import"./satserUtils-DvCldmIb.js";import"./ArbeidssituasjonSteg-D9fawJrk.js";import"./BlueRadioGroup-DI8Qd9nt.js";import"./customErrorFormatter-D2rQq6s0.js";import"./PlanleggerStepPage-DasL4jV8.js";import"./useScrollBehaviour-p5VWsRP1.js";import"./Spacer-DZjDyEr_.js";import"./BarnehageplassSteg-CcyKGDxq.js";import"./uttakUtils-Bx5eJ9jN.js";import"./BabyWrapped-pEyTdv2J.js";import"./Information-CDVJ-Wcl.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-C4yWuz31.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-QHZfkQvY.js";import"./HvorLangPeriodeSteg-DlHDvP3d.js";import"./PersonGroup-CzWTxSN-.js";import"./HvorMyeSteg-DpeN5iN_.js";import"./Wallet-BcIfMae3.js";import"./OmBarnetSteg-BeI8ENvJ.js";import"./TasklistStart-DeKvrCLn.js";import"./OmPlanleggerenSteg-DLL7I_NB.js";import"./OppsummeringSteg-XRLh4yqo.js";import"./ShareDataInfobox-PseDq3ON.js";import"./CalendarLabels-B8a8TSZl.js";import"./CalendarIconLabel-Byd454E_.js";import"./FamiliehendelseLabel-LxCnijco.js";import"./PlanenDeresSteg-BITV2Qo_.js";import"./OmÅTilpassePlanen-lEclhiYo.js";import"./PersonPregnant-BZcIZEIz.js";import"./PencilWriting-BUxchMNu.js";import"./UforutsetteEndringer-A6eNSVI4.js";import"./ToggleGroup-CUNviNWn.js";import"./TilpassPlanenSteg-CiUyGMgn.js";import"./HvaErMulig-B2EZJTRY.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
