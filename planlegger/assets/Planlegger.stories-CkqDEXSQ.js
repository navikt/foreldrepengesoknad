import{w as c,j as r,r as l,E}from"./iframe-CoHBgKI7.js";import{M as g,P as R}from"./usePlanleggerNavigator-D5AVMhIF.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-j021RA0f.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BzLplJMC.js";import"./barnetUtils-UzCJSl6C.js";import"./hvemHarRettUtils-mWKq9x6K.js";import"./satserUtils-na8F3lQ5.js";import"./ArbeidssituasjonSteg-CwzLrP-S.js";import"./BlueRadioGroup-Bgh6jRUh.js";import"./customErrorFormatter-Dbghd6HL.js";import"./PlanleggerStepPage-Cvi0ZTir.js";import"./useScrollBehaviour-ZdE_9fPT.js";import"./BarnehageplassSteg-P9l9Mvb2.js";import"./uttakUtils-CeeHrgsz.js";import"./BabyWrapped-B0hIYDea.js";import"./Information-Bf_hmonq.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CuRsQfvZ.js";import"./HvemPlanleggerSteg-CC-UObF4.js";import"./HvorLangPeriodeSteg-BoS1LtRa.js";import"./PersonGroup-CiQ8ogGW.js";import"./HvorMyeSteg-B2Nl8DlK.js";import"./Wallet-YHsbCGa5.js";import"./OmBarnetSteg-CqeF1I5z.js";import"./TasklistStart-Dnb353Cx.js";import"./OmPlanleggerenSteg-0UmTsdf3.js";import"./OppsummeringSteg-vP2WNgB3.js";import"./ShareDataInfobox-DwTrISR1.js";import"./PlanenDeresSteg-CHLz_brh.js";import"./OmÅTilpassePlanen-C9nLsY_V.js";import"./PersonPregnant-DFnQAX2l.js";import"./PencilWriting-Bupj-EEt.js";import"./UforutsetteEndringer-DDyk_viR.js";import"./ToggleGroup-DvFgQaS3.js";import"./TilpassPlanenSteg-DJwNuPlI.js";import"./HvaErMulig-BB3FDL42.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const nt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,e as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,nt as __namedExportsOrder,ot as default};
