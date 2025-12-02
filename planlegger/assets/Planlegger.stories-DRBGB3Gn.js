import{w as c,j as r,r as l,E}from"./iframe-eNsCs_mp.js";import{M as g,P as R}from"./usePlanleggerNavigator-BTYGJUS6.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CDS_xAK6.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DTofOrG8.js";import"./barnetUtils-DJvxLBB7.js";import"./hvemHarRettUtils-dDanRgrq.js";import"./satserUtils-Co5bqiHq.js";import"./ArbeidssituasjonSteg-CVpOAJMY.js";import"./BlueRadioGroup-DDBfFFc-.js";import"./customErrorFormatter-DOhdsMP7.js";import"./PlanleggerStepPage-C-M4akN1.js";import"./useScrollBehaviour-Bthx3bDl.js";import"./BarnehageplassSteg-BjX5Pg3i.js";import"./uttakUtils-CI4omtDf.js";import"./BabyWrapped-GIJ--euW.js";import"./Information-B7cEK_ED.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-34PQ0NmT.js";import"./HvemPlanleggerSteg-CARlsrBK.js";import"./HvorLangPeriodeSteg-tGk3QQgg.js";import"./PersonGroup-Bf6kKEHy.js";import"./HvorMyeSteg-C2aTca3M.js";import"./Wallet-Dz5VGQQh.js";import"./OmBarnetSteg-CSSAe_fT.js";import"./TasklistStart-CtWEt1px.js";import"./OmPlanleggerenSteg-Chqvwgkd.js";import"./OppsummeringSteg-mvJI7VKO.js";import"./ShareDataInfobox-C5xtlBqa.js";import"./useLagUttaksplanForslag-DNu5NXyi.js";import"./PlanenDeresSteg-Bwze3x_5.js";import"./OmÅTilpassePlanen-CxdfKBFT.js";import"./PersonPregnant-B8XL2GcH.js";import"./PencilWriting-I3TDLbUi.js";import"./UforutsetteEndringer-kV9IK2z3.js";import"./ToggleGroup-O7HQVjo4.js";import"./TilpassPlanenSteg-_E2dXETr.js";import"./HvaErMulig-C0Lm2wgC.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
