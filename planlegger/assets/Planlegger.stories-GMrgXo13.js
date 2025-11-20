import{w as c,j as r,r as l,E}from"./iframe-C3MXnbCN.js";import{M as g,P as R}from"./usePlanleggerNavigator-OsVnvQv3.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-YT7JpL6v.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CwWE0H3o.js";import"./barnetUtils-CzAayPkA.js";import"./hvemHarRettUtils-C592dlGg.js";import"./satserUtils-Cz9ukf8r.js";import"./ArbeidssituasjonSteg-3WPRUHzd.js";import"./BlueRadioGroup-DdK8kk1y.js";import"./customErrorFormatter-DoHpN1up.js";import"./PlanleggerStepPage-BM1qls6T.js";import"./useScrollBehaviour-CAIWWLG0.js";import"./BarnehageplassSteg-B-sbLnHx.js";import"./uttakUtils-VRmZTR-k.js";import"./BabyWrapped-CUUPQUS5.js";import"./Information-DViO9iQr.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DwUxgMeR.js";import"./HvemPlanleggerSteg-BbU-2G4_.js";import"./HvorLangPeriodeSteg-BKf97pu5.js";import"./PersonGroup-D_GUoZFA.js";import"./HvorMyeSteg-CHFT03Wu.js";import"./Wallet-CGUHKXcL.js";import"./OmBarnetSteg-BHshukUf.js";import"./TasklistStart-2Vv4W7OY.js";import"./OmPlanleggerenSteg-hJ5gpQdw.js";import"./OppsummeringSteg-DIgpoLqX.js";import"./ShareDataInfobox-DK7vENK9.js";import"./PlanenDeresSteg-Dd8LnAGg.js";import"./OmÅTilpassePlanen-DtmIBHA7.js";import"./PersonPregnant-BbjUK3OR.js";import"./PencilWriting-C_AJwgU0.js";import"./UforutsetteEndringer-Bpz9r2PJ.js";import"./ToggleGroup-DuYaCGGM.js";import"./TilpassPlanenSteg-MUNSjJPW.js";import"./HvaErMulig-Ctva8fcv.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
