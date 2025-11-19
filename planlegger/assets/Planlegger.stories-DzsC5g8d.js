import{w as c,j as e,r as l,E}from"./iframe-CHa2u-dZ.js";import{M as g,P as R}from"./usePlanleggerNavigator-DBmdSE42.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CJy5qDtO.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CghhB4X5.js";import"./barnetUtils-CAad8uww.js";import"./hvemHarRettUtils-W3BlOfEo.js";import"./satserUtils-CeE_BAZf.js";import"./ArbeidssituasjonSteg-Bnj1RMIb.js";import"./BlueRadioGroup-CnXOv7ZL.js";import"./customErrorFormatter-DFHaM4Hb.js";import"./PlanleggerStepPage-DYEAOBlb.js";import"./useScrollBehaviour-BZOQiFS-.js";import"./BarnehageplassSteg-Bc8xAA5X.js";import"./uttakUtils-CcBp6r2S.js";import"./BabyWrapped-BuzjCspU.js";import"./Information-DXEWouQg.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BgsOhLMO.js";import"./HvemPlanleggerSteg-D3IIGpUx.js";import"./HvorLangPeriodeSteg-B-5VxLFk.js";import"./HvorMyeSteg-Q6OSGkDh.js";import"./Wallet-HdQOh0Ix.js";import"./OmBarnetSteg-CtYmvJUw.js";import"./TasklistStart-C5ydANAB.js";import"./OmPlanleggerenSteg-WsvGuB8o.js";import"./OppsummeringSteg-D7G-RkYY.js";import"./ShareDataInfobox-BY7KAHd9.js";import"./PlanenDeresSteg-B6tpoNm9.js";import"./OmÅTilpassePlanen-zcHHRI5X.js";import"./PersonPregnant-Bg0SGreV.js";import"./PencilWriting-CucFAnHF.js";import"./UforutsetteEndringer-Qjua6C_m.js";import"./ToggleGroup-Dbv9IIZV.js";import"./TilpassPlanenSteg-BCrbNLdv.js";import"./HvaErMulig-DiCUIr8s.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ot=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,ot as __namedExportsOrder,rt as default};
