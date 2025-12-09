import{w as c,j as e,r as l,E}from"./iframe-6ovWHAFE.js";import{M as g,P as R}from"./usePlanleggerNavigator-DyaeYUw2.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-C6w11-BI.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-DwFVty-J.js";import"./barnetUtils-DdouaOEG.js";import"./hvemHarRettUtils-ByqU8B6z.js";import"./satserUtils-C7Pqlo18.js";import"./ArbeidssituasjonSteg-C4Kein_i.js";import"./BlueRadioGroup-DMvX7Sst.js";import"./customErrorFormatter-5Cq03ev3.js";import"./PlanleggerStepPage-D_3jBdIE.js";import"./useScrollBehaviour-CcHoHLfl.js";import"./BarnehageplassSteg-C1i4qEPs.js";import"./uttakUtils-CCo3JLNQ.js";import"./BabyWrapped-CcfQe-sC.js";import"./Information-BrYho5bx.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-FfcMSLdP.js";import"./HvemPlanleggerSteg-z4YNF-0q.js";import"./HvorLangPeriodeSteg-BIvbuQCk.js";import"./PersonGroup-BRH3Ydqv.js";import"./HvorMyeSteg-BlAs6c-7.js";import"./Wallet-Bn2y32JT.js";import"./OmBarnetSteg-DyVZ86ZK.js";import"./TasklistStart-CnZlGKab.js";import"./OmPlanleggerenSteg-B39CSaOd.js";import"./OppsummeringSteg-BGg7BOdO.js";import"./ShareDataInfobox-Cedsfbhe.js";import"./useLagUttaksplanForslag-CuIXBvPu.js";import"./PlanenDeresSteg-tf4o_eYW.js";import"./HvaErMulig-Dsba-IWO.js";import"./PersonPregnant--7XPituL.js";import"./UforutsetteEndringer-DvHooe2G.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
