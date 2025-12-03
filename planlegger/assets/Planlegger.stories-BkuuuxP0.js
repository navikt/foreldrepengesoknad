import{w as c,j as r,r as l,E}from"./iframe-YtiICwuu.js";import{M as g,P as R}from"./usePlanleggerNavigator-CdF8-hI4.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-jMtGViez.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-HU4YJNa6.js";import"./barnetUtils-DBTxcoID.js";import"./hvemHarRettUtils-DhoeG4QI.js";import"./satserUtils-pMBgf7N7.js";import"./ArbeidssituasjonSteg-CXAYC8Em.js";import"./BlueRadioGroup-DuJzRq6j.js";import"./customErrorFormatter-CutKgI0w.js";import"./PlanleggerStepPage-D3fuiqar.js";import"./useScrollBehaviour-_XzxAR_u.js";import"./BarnehageplassSteg-CigfSSiS.js";import"./uttakUtils-BX6LRWDd.js";import"./BabyWrapped-DidZyXv2.js";import"./Information-D2JDDCzi.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-PlgKnitd.js";import"./HvemPlanleggerSteg-BvskcFDN.js";import"./HvorLangPeriodeSteg-DstQ4JVH.js";import"./PersonGroup-BBpKm7YL.js";import"./HvorMyeSteg-C8sgpNAW.js";import"./Wallet-LsimAxzQ.js";import"./OmBarnetSteg-KPr-bOB1.js";import"./TasklistStart-B0IOkzZh.js";import"./OmPlanleggerenSteg-Eb118K5x.js";import"./OppsummeringSteg-CwgLy0gi.js";import"./ShareDataInfobox-ndxXWC5Y.js";import"./useLagUttaksplanForslag-CZjhy4FX.js";import"./PlanenDeresSteg-CaKeDXzn.js";import"./OmÅTilpassePlanen-CWg1NLi4.js";import"./PersonPregnant-551FlG1C.js";import"./PencilWriting-C7cUZTb2.js";import"./UforutsetteEndringer-DX1lykTt.js";import"./ToggleGroup-CF4dM192.js";import"./TilpassPlanenSteg-CpZWGPpO.js";import"./HvaErMulig-xSbv1byX.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const at=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,at as __namedExportsOrder,nt as default};
