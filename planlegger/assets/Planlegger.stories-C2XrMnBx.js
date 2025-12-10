import{w as c,j as e,r as l,E}from"./iframe-XKN1Xu9x.js";import{M as g,P as R}from"./usePlanleggerNavigator-0cIvL81T.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CX8p9rzY.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-CmGHhv8H.js";import"./barnetUtils-DKrwQxrX.js";import"./hvemHarRettUtils-PuEqakR6.js";import"./satserUtils-CAOPsBuI.js";import"./ArbeidssituasjonSteg-Dz1NwkjQ.js";import"./BlueRadioGroup-CAMffO1U.js";import"./customErrorFormatter-C62oRy-N.js";import"./PlanleggerStepPage-UJJyL1yk.js";import"./useScrollBehaviour-BxMnd-08.js";import"./BarnehageplassSteg-C-xq8FpB.js";import"./uttakUtils-MavYniAC.js";import"./BabyWrapped-BiwpwZ83.js";import"./Information-62dCzB0H.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Y4N2YwIP.js";import"./HvemPlanleggerSteg-Br8ghe02.js";import"./HvorLangPeriodeSteg-4vmloxuM.js";import"./PersonGroup-XWNul52c.js";import"./HvorMyeSteg-BGmabJIq.js";import"./Wallet-qu4lVuCa.js";import"./OmBarnetSteg-C18n_aCC.js";import"./TasklistStart-VbSaW0xU.js";import"./OmPlanleggerenSteg-Ca05jVDL.js";import"./OppsummeringSteg-Do2_Hl3f.js";import"./ShareDataInfobox-BypQFgrc.js";import"./useLagUttaksplanForslag-AS2tBa3_.js";import"./PlanenDeresSteg-D0t0sVsw.js";import"./HvaErMulig-At7-NpA9.js";import"./PersonPregnant-CdiYRSNR.js";import"./UforutsetteEndringer-Cuh3XyUN.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
