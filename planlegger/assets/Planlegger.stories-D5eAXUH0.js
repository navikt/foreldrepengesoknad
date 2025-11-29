import{w as c,j as r,r as l,E}from"./iframe-DeUZ6TGK.js";import{M as g,P as R}from"./usePlanleggerNavigator-Mj--NJa3.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CCavPuQQ.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B75qjan3.js";import"./barnetUtils-DHlndWUo.js";import"./hvemHarRettUtils-iloxE-Jv.js";import"./satserUtils-CY43SaRX.js";import"./ArbeidssituasjonSteg-DAQ3ZRcb.js";import"./BlueRadioGroup-DIrGJFKa.js";import"./customErrorFormatter-BMHgc2cw.js";import"./PlanleggerStepPage-BVknf9FX.js";import"./useScrollBehaviour-690N2UpX.js";import"./BarnehageplassSteg-BECItjqO.js";import"./uttakUtils-FrTWA6GY.js";import"./BabyWrapped-Z5dz3Mjo.js";import"./Information-BnvoXzFX.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BlSnIiUA.js";import"./HvemPlanleggerSteg-BG_WPsyU.js";import"./HvorLangPeriodeSteg-Tm7my8ck.js";import"./PersonGroup-BYD8BsNl.js";import"./HvorMyeSteg-DyXv6cb-.js";import"./Wallet-2OVbzwf7.js";import"./OmBarnetSteg-CxsACchq.js";import"./TasklistStart-C7BNxcPr.js";import"./OmPlanleggerenSteg-BNHIvxk3.js";import"./OppsummeringSteg-BAaH9taF.js";import"./ShareDataInfobox-CxpeVcMb.js";import"./useLagUttaksplanForslag-DzHiXW5v.js";import"./PlanenDeresSteg-pQ16wo1N.js";import"./OmÅTilpassePlanen-zvOD5OSM.js";import"./PersonPregnant-ca45h90l.js";import"./PencilWriting-DpABOJBe.js";import"./UforutsetteEndringer-BdZfdicL.js";import"./ToggleGroup-Cx27yw04.js";import"./TilpassPlanenSteg-Wr33GSym.js";import"./HvaErMulig-DttuwQWM.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
