import{w as c,j as e,r as l,E}from"./iframe-CvFRe94l.js";import{M as g,P as R}from"./usePlanleggerNavigator-BH_5IgEe.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-dkdlGRy5.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-tpfKIFS3.js";import"./barnetUtils-j8b5tJBv.js";import"./hvemHarRettUtils-r7i3ZSwO.js";import"./satserUtils-jvN7Bk06.js";import"./ArbeidssituasjonSteg-DeMWUJph.js";import"./BlueRadioGroup-ChNApqL4.js";import"./customErrorFormatter-Cwa77urM.js";import"./PlanleggerStepPage-CNM2vfwY.js";import"./useScrollBehaviour-sTF3uUEv.js";import"./BarnehageplassSteg-BkA7NIwb.js";import"./uttakUtils-B4filWPt.js";import"./BabyWrapped-C0vXwQTo.js";import"./Information-CiCfO61E.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BToGJzpI.js";import"./HvemPlanleggerSteg-DeLYmbRx.js";import"./HvorLangPeriodeSteg-CBCoexJl.js";import"./PersonGroup-CKqTEWrQ.js";import"./HvorMyeSteg-B8q5h-0v.js";import"./Wallet-BJi47A41.js";import"./OmBarnetSteg-fWLWsZOH.js";import"./TasklistStart-B9T5UOJa.js";import"./OmPlanleggerenSteg-CVYiyB_6.js";import"./OppsummeringSteg-DXrTKZC8.js";import"./ShareDataInfobox-CCSmcxML.js";import"./useLagUttaksplanForslag-BA-o8y0V.js";import"./PlanenDeresSteg-DhW4dNQ5.js";import"./HvaErMulig-BLYCmGCx.js";import"./PersonPregnant-CouUIOrR.js";import"./UforutsetteEndringer-BCJCxukv.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const et=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,et as __namedExportsOrder,tt as default};
