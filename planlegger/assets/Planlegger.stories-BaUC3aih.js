import{w as c,j as r,r as l,E}from"./iframe-hn0jJc8I.js";import{M as g,P as R}from"./usePlanleggerNavigator-B1aQzUtD.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-B7YJ6L60.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-9tZU_nV8.js";import"./barnetUtils-CQZsqWWE.js";import"./hvemHarRettUtils-CAVl5dyU.js";import"./satserUtils-AQCdUt4r.js";import"./ArbeidssituasjonSteg-BIkodbCx.js";import"./BlueRadioGroup-CI65VBdg.js";import"./customErrorFormatter-DEo-j4sS.js";import"./PlanleggerStepPage-CyrEGMcQ.js";import"./useScrollBehaviour-C1cO2e-5.js";import"./BarnehageplassSteg-B5-5dfGJ.js";import"./uttakUtils-T7Qnfzmk.js";import"./BabyWrapped-DJhd2lPU.js";import"./Information-DIpHWKC_.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CxY5aNHF.js";import"./HvemPlanleggerSteg-IMKz9lZ7.js";import"./HvorLangPeriodeSteg-RmL9RWGc.js";import"./PersonGroup-WKl2dpBV.js";import"./HvorMyeSteg-CXlMJYtW.js";import"./Wallet-Dyxy2iET.js";import"./OmBarnetSteg-CKMgS97v.js";import"./TasklistStart-BW3RweHW.js";import"./OmPlanleggerenSteg-B51p_o0d.js";import"./OppsummeringSteg-CyPTNoMz.js";import"./ShareDataInfobox-DOruYwO9.js";import"./PlanenDeresSteg-D0AGDbdR.js";import"./OmÅTilpassePlanen-DJ-CYNhh.js";import"./PersonPregnant-B8RmMf3X.js";import"./PencilWriting-Bgfw1JFu.js";import"./UforutsetteEndringer-Dd-XIiO1.js";import"./ToggleGroup-BfzcW25h.js";import"./TilpassPlanenSteg-C2XwjV_q.js";import"./HvaErMulig-DXdOa4m7.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
