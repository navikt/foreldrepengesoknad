import{w as c,j as r,r as l,E}from"./iframe-CKVCXvMc.js";import{M as g,P as R}from"./usePlanleggerNavigator-C0Z9p-y3.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-hFNINqz_.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-4sxy0iE4.js";import"./barnetUtils-B7C4h5oo.js";import"./hvemHarRettUtils-DZGUzQqq.js";import"./satserUtils-bAUg-KI9.js";import"./ArbeidssituasjonSteg-B0pysMoW.js";import"./BlueRadioGroup-qoVOFXwe.js";import"./customErrorFormatter-q5E0VbcB.js";import"./PlanleggerStepPage-CuPQoUGK.js";import"./useScrollBehaviour-RImwguSK.js";import"./BarnehageplassSteg-CSfsKu5t.js";import"./uttakUtils-L3KgP7O8.js";import"./BabyWrapped-CNPnl20m.js";import"./Information-CfPmTV5I.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-D_L0D6SN.js";import"./HvemPlanleggerSteg-CXg70lK5.js";import"./HvorLangPeriodeSteg-Tt1XXC1K.js";import"./PersonGroup-CkURWcm6.js";import"./HvorMyeSteg-DJqnUpS3.js";import"./Wallet-CkT_1aJn.js";import"./OmBarnetSteg-qnvNt5mA.js";import"./TasklistStart-CyQto1Mw.js";import"./OmPlanleggerenSteg-D8pHY-MG.js";import"./OppsummeringSteg-GbJwAPQb.js";import"./ShareDataInfobox-CrzTnjE8.js";import"./useLagUttaksplanForslag-C2qRF6dP.js";import"./PlanenDeresSteg-DqqFsyGm.js";import"./OmÅTilpassePlanen-BKWrj86K.js";import"./PersonPregnant-QaUzpVCw.js";import"./PencilWriting-DBHgLf9N.js";import"./UforutsetteEndringer-lJ64tJZH.js";import"./ToggleGroup-BHVngO9i.js";import"./TilpassPlanenSteg-BuLUT1-V.js";import"./HvaErMulig-ENqooomP.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
