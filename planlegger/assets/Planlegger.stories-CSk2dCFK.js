import{w as c,j as o,r as l,E}from"./iframe-Btp9_amg.js";import{M as k,P as g}from"./usePlanleggerNavigator-1EvLIIxt.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Dl7GieYv.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BC4MImQ7.js";import"./barnetUtils-CP6X6uT_.js";import"./hvemHarRettUtils-XSskBN0g.js";import"./satserUtils-Bc8JqzZB.js";import"./ArbeidssituasjonSteg-Be-H2jl4.js";import"./BlueRadioGroup-CqInm-zl.js";import"./customErrorFormatter-C5wj2Sgz.js";import"./PlanleggerStepPage-hCn_1XPe.js";import"./useScrollBehaviour-LDmU47po.js";import"./Spacer-CieGeyl1.js";import"./BarnehageplassSteg-eCNalfTe.js";import"./uttakUtils-D2dlSsnv.js";import"./BabyWrapped-BQzk25f1.js";import"./Information-CfxksFBr.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-BroXvKzw.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DIQjBD7C.js";import"./HvorLangPeriodeSteg-WFGl6yhe.js";import"./PersonGroup-BCpoiQyx.js";import"./HvorMyeSteg-vUfwN72N.js";import"./Wallet-DHm3rGY9.js";import"./OmBarnetSteg-BkwY1Z3K.js";import"./TasklistStart-Btvg_f6I.js";import"./OmPlanleggerenSteg-DKw_asFU.js";import"./OppsummeringSteg-Cjlx2tya.js";import"./ShareDataInfobox-BXYSFL5w.js";import"./CalendarLabels-BrivtcS5.js";import"./CalendarIconLabel-Dpg5CEoe.js";import"./FamiliehendelseLabel-VenFiOrL.js";import"./PlanenDeresSteg-DCDf7l9X.js";import"./OmÅTilpassePlanen-B7N0UB00.js";import"./PersonPregnant-DK_AGq5V.js";import"./PencilWriting-C9w4-hBE.js";import"./UforutsetteEndringer-BOROBhi0.js";import"./ToggleGroup-D882UlxD.js";import"./TilpassPlanenSteg-D-Lex3IW.js";import"./HvaErMulig-Dt-OYbNU.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
