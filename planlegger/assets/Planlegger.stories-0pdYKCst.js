import{w as c,j as r,r as l,E}from"./iframe-DMSDwLTJ.js";import{M as g,P as R}from"./usePlanleggerNavigator-_kAwhaSN.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DLLpJj6d.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DuxvFLlA.js";import"./barnetUtils-z1kI3c1p.js";import"./hvemHarRettUtils-a1FUE66E.js";import"./satserUtils-BgpIo9jS.js";import"./ArbeidssituasjonSteg-Caw67zZM.js";import"./BlueRadioGroup-70maS2-b.js";import"./customErrorFormatter-D199Ngmb.js";import"./PlanleggerStepPage-Brf5gbuR.js";import"./useScrollBehaviour-BvcgcOlU.js";import"./BarnehageplassSteg-CFu_4hZC.js";import"./uttakUtils-CxQyO-z_.js";import"./BabyWrapped-Cc1sTw7v.js";import"./Information-Bs0VQcJb.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DxgT2kzG.js";import"./HvemPlanleggerSteg-CKBP6oyl.js";import"./HvorLangPeriodeSteg-vqjf8REu.js";import"./PersonGroup-D0Dk60MN.js";import"./HvorMyeSteg-CnvJZos3.js";import"./Wallet-CwUycu-Z.js";import"./OmBarnetSteg-BfAXBB9J.js";import"./TasklistStart-rTWDiW5E.js";import"./OmPlanleggerenSteg-kI9vSHqI.js";import"./OppsummeringSteg-C-3f1khM.js";import"./ShareDataInfobox-BYh_UjoT.js";import"./PlanenDeresSteg-yUDRj_rV.js";import"./OmÅTilpassePlanen-CsAUnX0H.js";import"./PersonPregnant-D0f8funB.js";import"./PencilWriting-BSSz3PAd.js";import"./UforutsetteEndringer-UEJp0_kZ.js";import"./ToggleGroup-ajCAsfSM.js";import"./TilpassPlanenSteg-C2ehIHR6.js";import"./HvaErMulig-oeUO2Tx_.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const nt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,e as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,nt as __namedExportsOrder,ot as default};
