import{w as c,j as e,r as l,E}from"./iframe-Bh8tXN94.js";import{M as g,P as R}from"./usePlanleggerNavigator-CnMdwbyI.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DfGM6ANc.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-C49kHjdQ.js";import"./barnetUtils-C24Qt08P.js";import"./hvemHarRettUtils-BCaApLAI.js";import"./satserUtils-vK1dzpiq.js";import"./ArbeidssituasjonSteg-DvVfgo3Z.js";import"./BlueRadioGroup-BRTr2-3A.js";import"./customErrorFormatter-CblS9B1O.js";import"./PlanleggerStepPage-BBjObCC8.js";import"./useScrollBehaviour-DOQqwgPE.js";import"./BarnehageplassSteg-D3tyz1dD.js";import"./uttakUtils-saw_jvyx.js";import"./BabyWrapped-vZ5XnqeS.js";import"./Information-DgRS94mW.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CNIA2sim.js";import"./HvemPlanleggerSteg-CmeZfcbL.js";import"./HvorLangPeriodeSteg-qW7IWozU.js";import"./PersonGroup-CZm9kqwW.js";import"./HvorMyeSteg-Df4bw4dM.js";import"./Wallet-Cf4sRycI.js";import"./OmBarnetSteg-B62RJbUn.js";import"./TasklistStart-CvRvCDyS.js";import"./OmPlanleggerenSteg-DOSDubWv.js";import"./OppsummeringSteg-TEK7j2Gk.js";import"./ShareDataInfobox-CkZ9N97E.js";import"./useLagUttaksplanForslag-DyKx9qet.js";import"./PlanenDeresSteg-C2KduPT-.js";import"./HvaErMulig-BkswXm8V.js";import"./PersonPregnant-rEMLX-xd.js";import"./UforutsetteEndringer-BgxmY89J.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
