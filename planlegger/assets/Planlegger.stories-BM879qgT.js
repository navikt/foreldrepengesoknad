import{w as c,j as e,r as l,E}from"./iframe-CPoylhjP.js";import{M as g,P as R}from"./usePlanleggerNavigator-CTufH_KY.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D6k0i75H.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-BugwgWuv.js";import"./barnetUtils-D_Od0fIA.js";import"./hvemHarRettUtils-DpWxQIjW.js";import"./satserUtils-d3l-e7lw.js";import"./ArbeidssituasjonSteg-2AgFHFNZ.js";import"./BlueRadioGroup-tkSq4l_t.js";import"./customErrorFormatter-D4yR12dn.js";import"./PlanleggerStepPage-CcNEr5Jr.js";import"./useScrollBehaviour-ChG7J_Dr.js";import"./BarnehageplassSteg-B0r0EugQ.js";import"./uttakUtils-YXy-rQcS.js";import"./BabyWrapped-DTKMyUZY.js";import"./Information-qEuPF9NG.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BuCcc2X8.js";import"./HvemPlanleggerSteg-CJKQJqdB.js";import"./HvorLangPeriodeSteg-DHbMrsK-.js";import"./PersonGroup-8AUT1POS.js";import"./HvorMyeSteg-ByVB-BQD.js";import"./Wallet-CCKfou19.js";import"./OmBarnetSteg-BtQHExFS.js";import"./TasklistStart-BgqADwBI.js";import"./OmPlanleggerenSteg-Dx2DBDk-.js";import"./OppsummeringSteg-BVCpAj__.js";import"./ShareDataInfobox-CqGvfdY3.js";import"./useLagUttaksplanForslag-BQUCj5UB.js";import"./PlanenDeresSteg-Z_e_vV-L.js";import"./HvaErMulig-_N2HNWOU.js";import"./PersonPregnant-Bzkp88a8.js";import"./UforutsetteEndringer-Dt3zj-U0.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
