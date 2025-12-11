import{w as c,j as e,r as l,E}from"./iframe-CVwqhnMK.js";import{M as g,P as R}from"./usePlanleggerNavigator-i2J30NK_.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-9MlqNiLk.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-DDx1coLL.js";import"./barnetUtils-UcULYH9O.js";import"./hvemHarRettUtils-AihoLc8A.js";import"./satserUtils-CsRpv9RY.js";import"./ArbeidssituasjonSteg-DerrokOh.js";import"./BlueRadioGroup-DBSr1uH1.js";import"./customErrorFormatter-Cc-Yt1Cg.js";import"./PlanleggerStepPage-CsQ8sipB.js";import"./useScrollBehaviour-DZZy-BeG.js";import"./BarnehageplassSteg-B_1_tZPT.js";import"./uttakUtils-DUQsr7hp.js";import"./BabyWrapped-DbsvOp9Z.js";import"./Information-HpuWhIFB.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-C9dFqKb5.js";import"./HvemPlanleggerSteg-Bl4TXwoS.js";import"./HvorLangPeriodeSteg-BOOsdKip.js";import"./PersonGroup-BQDndwmN.js";import"./HvorMyeSteg-mwZ--R8O.js";import"./Wallet-D9K4jJAL.js";import"./OmBarnetSteg-BYjbWF73.js";import"./TasklistStart-ydOj8Zuc.js";import"./OmPlanleggerenSteg-CkihClQr.js";import"./OppsummeringSteg-CB45iWdw.js";import"./ShareDataInfobox-CP-QuYfq.js";import"./useLagUttaksplanForslag-Brc9cqat.js";import"./PlanenDeresSteg-DYVp_faj.js";import"./HvaErMulig-iUhsfC4f.js";import"./PersonPregnant-BphyIPa5.js";import"./UforutsetteEndringer-BDN0gC7J.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
