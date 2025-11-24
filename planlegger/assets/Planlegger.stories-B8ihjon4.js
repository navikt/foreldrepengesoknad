import{w as c,j as r,r as l,E}from"./iframe-BtCZ-Vsa.js";import{M as g,P as R}from"./usePlanleggerNavigator-b-YIrVTK.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-JViCnXe2.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Djnp2kWN.js";import"./barnetUtils-BEE1z-aF.js";import"./hvemHarRettUtils-C1e3-wni.js";import"./satserUtils-CkyJFl21.js";import"./ArbeidssituasjonSteg-10v3RfiN.js";import"./BlueRadioGroup-CqTSak4x.js";import"./customErrorFormatter-B6j6jIRV.js";import"./PlanleggerStepPage-DNOTRMnD.js";import"./useScrollBehaviour-Dy1yNRJw.js";import"./BarnehageplassSteg-DL8bCZDn.js";import"./uttakUtils-DJzy4l0h.js";import"./BabyWrapped-BLPj_usL.js";import"./Information-CCGLO_Ci.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DAcYQ41v.js";import"./HvemPlanleggerSteg-CXwtPJSa.js";import"./HvorLangPeriodeSteg-SogTH0Vk.js";import"./PersonGroup-D-ZpolQn.js";import"./HvorMyeSteg-C64CY-bb.js";import"./Wallet-DPsJGIJS.js";import"./OmBarnetSteg-DhG9z8mM.js";import"./TasklistStart-CVClykWh.js";import"./OmPlanleggerenSteg-aSiZW6UY.js";import"./OppsummeringSteg-BH_xZ-yw.js";import"./ShareDataInfobox-DrTY0bYV.js";import"./PlanenDeresSteg-BIcWwHGm.js";import"./OmÅTilpassePlanen-BGUhWutl.js";import"./PersonPregnant-D9HIejvl.js";import"./PencilWriting-BTYd0u93.js";import"./UforutsetteEndringer-TElZm6nl.js";import"./ToggleGroup-BmvtjiI3.js";import"./TilpassPlanenSteg-BNOC7B2o.js";import"./HvaErMulig-DBD6QjpX.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
