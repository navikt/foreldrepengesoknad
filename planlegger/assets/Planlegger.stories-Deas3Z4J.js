import{w as c,j as r,r as l,E}from"./iframe-DS-esvvE.js";import{M as g,P as R}from"./usePlanleggerNavigator-CVYIyd7a.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BYq-Kxeu.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BTDC0aSH.js";import"./barnetUtils-DoUK3x1t.js";import"./hvemHarRettUtils-Cp30L35a.js";import"./satserUtils-nNpj7JoN.js";import"./ArbeidssituasjonSteg-CZK818TB.js";import"./BlueRadioGroup-CsMPmXEy.js";import"./customErrorFormatter-Bn5WLePV.js";import"./PlanleggerStepPage-CHS3DLz1.js";import"./useScrollBehaviour-I7qh9aMa.js";import"./BarnehageplassSteg-BpBtaXCT.js";import"./uttakUtils-DfzlkBfa.js";import"./BabyWrapped-CwzmqM2K.js";import"./Information-D6t2PJU6.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DVzxfHrC.js";import"./HvemPlanleggerSteg-CZLrhGEw.js";import"./HvorLangPeriodeSteg-TWERjSpI.js";import"./PersonGroup-Bfvih3vT.js";import"./HvorMyeSteg-DoYY3DhD.js";import"./Wallet-LZIbd6HB.js";import"./OmBarnetSteg-CuSOcSV_.js";import"./TasklistStart-DzZpB26-.js";import"./OmPlanleggerenSteg-BnhJDd6N.js";import"./OppsummeringSteg-B_Q19-HL.js";import"./ShareDataInfobox-CATc_QOH.js";import"./useLagUttaksplanForslag-BtGOgQT9.js";import"./PlanenDeresSteg-Dov9VqIW.js";import"./OmÅTilpassePlanen-BKAfoHi1.js";import"./PersonPregnant-DIU3Iiea.js";import"./PencilWriting-jrgAJRkr.js";import"./UforutsetteEndringer-BdAKHgOr.js";import"./ToggleGroup-GsNKyB-P.js";import"./TilpassPlanenSteg-DNGV8HMw.js";import"./HvaErMulig-Bp--i51T.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
