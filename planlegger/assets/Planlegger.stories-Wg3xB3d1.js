import{w as c,j as r,r as l,E}from"./iframe-DU2DQhN0.js";import{M as g,P as R}from"./usePlanleggerNavigator-CaFERcB-.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-RyuBF077.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DbJfrhaW.js";import"./barnetUtils-DHZH6H3p.js";import"./hvemHarRettUtils-Dyrx3lNn.js";import"./satserUtils-ASd-V3_k.js";import"./ArbeidssituasjonSteg-CsK6O6fZ.js";import"./BlueRadioGroup-DGaNgjht.js";import"./customErrorFormatter-Bn67gh82.js";import"./PlanleggerStepPage-B0Qp_0GK.js";import"./useScrollBehaviour-C9Tjm8ap.js";import"./BarnehageplassSteg-D3z9NgpI.js";import"./uttakUtils-D3CYCXs9.js";import"./BabyWrapped-DNyC1ecZ.js";import"./Information-CRGrzRsw.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DvlAIrGA.js";import"./HvemPlanleggerSteg-BZ9pNfWT.js";import"./HvorLangPeriodeSteg-BPSqXva8.js";import"./PersonGroup-CPHll4-c.js";import"./HvorMyeSteg-ChpVEKe1.js";import"./Wallet-DptxjjBm.js";import"./OmBarnetSteg-DDUhXtS_.js";import"./TasklistStart-B1Y9LHtr.js";import"./OmPlanleggerenSteg-Bb9SJ8gF.js";import"./OppsummeringSteg-BvonDyAb.js";import"./ShareDataInfobox-CAO1WrN1.js";import"./useLagUttaksplanForslag-CP7Vl3PU.js";import"./PlanenDeresSteg-Cub2rpMY.js";import"./OmÅTilpassePlanen-Bau2QAZW.js";import"./PersonPregnant-CXxcZAMA.js";import"./PencilWriting-BGDb0qbt.js";import"./UforutsetteEndringer-zXhIOVmK.js";import"./ToggleGroup-D09ojhwq.js";import"./TilpassPlanenSteg-8SZiNErQ.js";import"./HvaErMulig-DV0uJDia.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
