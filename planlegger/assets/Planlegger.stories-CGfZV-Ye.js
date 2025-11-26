import{w as c,j as r,r as l,E}from"./iframe-DZZn87hJ.js";import{M as g,P as R}from"./usePlanleggerNavigator-DjfHsVKa.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BEcSuqJg.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-3GGFaBKi.js";import"./barnetUtils-DgxDlHGT.js";import"./hvemHarRettUtils-Bm0J9eoT.js";import"./satserUtils-Dc0E1ttS.js";import"./ArbeidssituasjonSteg-BfDylH3C.js";import"./BlueRadioGroup-DgdG7x7s.js";import"./customErrorFormatter-ofi9vLF7.js";import"./PlanleggerStepPage-D4H_b30b.js";import"./useScrollBehaviour-BKFQjI9t.js";import"./BarnehageplassSteg-BFmZV_Ez.js";import"./uttakUtils-BGr-Wd6A.js";import"./BabyWrapped-qdxaCuPr.js";import"./Information-BXyeNd2d.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-5TaKX0EV.js";import"./HvemPlanleggerSteg-CslaUBQk.js";import"./HvorLangPeriodeSteg-97ZanHNY.js";import"./PersonGroup-BxdTplFi.js";import"./HvorMyeSteg-xI3NP6mn.js";import"./Wallet-BNCuEN99.js";import"./OmBarnetSteg-C19H-6W3.js";import"./TasklistStart-CE4zxMdL.js";import"./OmPlanleggerenSteg-Cp_YIP77.js";import"./OppsummeringSteg-Cn6vGquE.js";import"./ShareDataInfobox-8vNDhrti.js";import"./PlanenDeresSteg-Bvs3-apU.js";import"./OmÅTilpassePlanen-COder3IG.js";import"./PersonPregnant-xcns0hCV.js";import"./PencilWriting-Ewf786R5.js";import"./UforutsetteEndringer-CeAd9qWs.js";import"./ToggleGroup-CYBCAUKE.js";import"./TilpassPlanenSteg-DI_xqxKd.js";import"./HvaErMulig-B89jR8W8.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
