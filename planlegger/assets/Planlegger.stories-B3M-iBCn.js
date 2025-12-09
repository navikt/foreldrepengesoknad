import{w as c,j as e,r as l,E}from"./iframe-DqGd-x5d.js";import{M as g,P as R}from"./usePlanleggerNavigator-DBYfLw6_.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-5PLu4fJp.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-C3D8twuf.js";import"./barnetUtils-BviTu-n2.js";import"./hvemHarRettUtils-D6XAEYXc.js";import"./satserUtils-CHP4RN0O.js";import"./ArbeidssituasjonSteg-BO3CtTEc.js";import"./BlueRadioGroup-v1FDqMGL.js";import"./customErrorFormatter-BIWb8lYw.js";import"./PlanleggerStepPage-CQsst98X.js";import"./useScrollBehaviour-DAGPPmp4.js";import"./BarnehageplassSteg-5wJiqqjG.js";import"./uttakUtils-DTQQ13_k.js";import"./BabyWrapped-DCBOJQlM.js";import"./Information-sj6dd_8i.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-7xbD6thl.js";import"./HvemPlanleggerSteg-CCHI6e44.js";import"./HvorLangPeriodeSteg-DIZg9xy-.js";import"./PersonGroup-CgR9UpVL.js";import"./HvorMyeSteg-BFPuXLti.js";import"./Wallet-C_2ib_fS.js";import"./OmBarnetSteg-WyPzXtDP.js";import"./TasklistStart-Bp9CSiym.js";import"./OmPlanleggerenSteg-C7vz7B1B.js";import"./OppsummeringSteg-DE4ySTv1.js";import"./ShareDataInfobox-9927JQgp.js";import"./useLagUttaksplanForslag-B-wtQoWI.js";import"./PlanenDeresSteg-BEONavup.js";import"./HvaErMulig-hz7t8Qvy.js";import"./PersonPregnant-CCAWWpNf.js";import"./UforutsetteEndringer-DVQmlbdp.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
