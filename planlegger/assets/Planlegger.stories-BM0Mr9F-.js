import{w as c,j as r,r as l,E}from"./iframe-CnLIlUh2.js";import{M as g,P as R}from"./usePlanleggerNavigator-Dc5XJv33.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-B6CKaF4Y.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-D-Flf6We.js";import"./barnetUtils-BdXZi2BI.js";import"./hvemHarRettUtils-BOgh49jt.js";import"./satserUtils-CKSsaCxC.js";import"./ArbeidssituasjonSteg-BQcCXDwq.js";import"./BlueRadioGroup-Bm1K7YAv.js";import"./customErrorFormatter-Cvq59NQs.js";import"./PlanleggerStepPage-DuaX5OCm.js";import"./useScrollBehaviour-D8ARp_H4.js";import"./BarnehageplassSteg-B169q3QX.js";import"./uttakUtils-T01aqi0A.js";import"./BabyWrapped-DptBG05g.js";import"./Information-DLjbd9Li.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BVBgkQ5x.js";import"./HvemPlanleggerSteg-WjexbQk_.js";import"./HvorLangPeriodeSteg-xpEB_iak.js";import"./PersonGroup-ByjUWdgC.js";import"./HvorMyeSteg-D9P63dFr.js";import"./Wallet-CbgET1CJ.js";import"./OmBarnetSteg-B6PX6BHR.js";import"./TasklistStart-DgclmtHV.js";import"./OmPlanleggerenSteg-5jP_jBus.js";import"./OppsummeringSteg-DgiODWzx.js";import"./ShareDataInfobox-CutKF52M.js";import"./useLagUttaksplanForslag-DwzawWWS.js";import"./PlanenDeresSteg-CD96FUB5.js";import"./OmÅTilpassePlanen-C_0z4HQT.js";import"./PersonPregnant-7QPCQuCT.js";import"./PencilWriting-CnLtKFXr.js";import"./UforutsetteEndringer-DslLsxry.js";import"./ToggleGroup-CLD9g4Bd.js";import"./TilpassPlanenSteg-BfnIgm4G.js";import"./HvaErMulig-CJ89iK48.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
