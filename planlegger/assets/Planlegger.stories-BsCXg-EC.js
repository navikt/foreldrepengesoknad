import{w as c,j as r,r as l,E}from"./iframe-DZpxDa0l.js";import{M as g,P as R}from"./usePlanleggerNavigator-Bh1hlAp6.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-IughNOpn.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BRcLn0pn.js";import"./barnetUtils-D07ITfCX.js";import"./hvemHarRettUtils-BlA4wVQ-.js";import"./satserUtils-DmVjlTxN.js";import"./ArbeidssituasjonSteg-Djh-G9Ya.js";import"./BlueRadioGroup-CysdEA57.js";import"./customErrorFormatter-CVThiLWd.js";import"./PlanleggerStepPage-B-T8zz3R.js";import"./useScrollBehaviour-TpySfiis.js";import"./BarnehageplassSteg-AT1gixR-.js";import"./uttakUtils-CCVqw9QE.js";import"./BabyWrapped-BJY4F6e6.js";import"./Information-DPfxCn_T.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BZaxQD90.js";import"./HvemPlanleggerSteg-NB4tpp2z.js";import"./HvorLangPeriodeSteg-0qTW-ULN.js";import"./PersonGroup-B33iJJl3.js";import"./HvorMyeSteg-CMPyf0o3.js";import"./Wallet-D8UPEI9A.js";import"./OmBarnetSteg-CU8nz3kB.js";import"./TasklistStart-DKQdR6b7.js";import"./OmPlanleggerenSteg-BGFiOv5e.js";import"./OppsummeringSteg-Dx081_0p.js";import"./ShareDataInfobox-B6MFbbAw.js";import"./useLagUttaksplanForslag-DcKPXJfX.js";import"./PlanenDeresSteg-CXWsA4LS.js";import"./OmÅTilpassePlanen-DkozJ6lX.js";import"./PersonPregnant-CLOnuyDG.js";import"./PencilWriting-DP2FPtFY.js";import"./UforutsetteEndringer-O8Fo22y3.js";import"./ToggleGroup-CLbOoDh8.js";import"./TilpassPlanenSteg-CxmcCRIC.js";import"./HvaErMulig-B5WG3PwR.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
