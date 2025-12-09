import{w as c,j as e,r as l,E}from"./iframe-fx3iJ7cp.js";import{M as g,P as R}from"./usePlanleggerNavigator-Df6jTMp_.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Cd7qQK_o.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-DWQzVRHn.js";import"./barnetUtils-DJaLrcJi.js";import"./hvemHarRettUtils-Bsoto9cZ.js";import"./satserUtils-BgEw4ZHG.js";import"./ArbeidssituasjonSteg-ByAAaZcM.js";import"./BlueRadioGroup-Bgd9BePG.js";import"./customErrorFormatter-tb__tWjc.js";import"./PlanleggerStepPage-_JPK4RHn.js";import"./useScrollBehaviour-4LImfqtu.js";import"./BarnehageplassSteg-DnAUZgOK.js";import"./uttakUtils-BfB8Ag7Q.js";import"./BabyWrapped-B5zH2g2Z.js";import"./Information-DDuZpktY.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BIAh7G9Q.js";import"./HvemPlanleggerSteg-C17aKlU_.js";import"./HvorLangPeriodeSteg-usE5N8Q4.js";import"./PersonGroup-DQNLG4Ep.js";import"./HvorMyeSteg-BQEl5S7D.js";import"./Wallet-PmDgsYD-.js";import"./OmBarnetSteg-Cgnu4iIG.js";import"./TasklistStart-D2Jf0Ex6.js";import"./OmPlanleggerenSteg-DCMBNToH.js";import"./OppsummeringSteg-CWe1GhDR.js";import"./ShareDataInfobox-DVHN35e1.js";import"./useLagUttaksplanForslag-HxYFyTRP.js";import"./PlanenDeresSteg-BppQn2FZ.js";import"./HvaErMulig-DXu2hnDR.js";import"./PersonPregnant-DE6Cbz5g.js";import"./UforutsetteEndringer-DBXdD3FQ.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
