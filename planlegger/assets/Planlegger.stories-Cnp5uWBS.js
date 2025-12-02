import{w as c,j as r,r as l,E}from"./iframe-DSgI6aRh.js";import{M as g,P as R}from"./usePlanleggerNavigator-D1c7nNS2.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CZW85kXw.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BgEJJFxe.js";import"./barnetUtils-O9otSDic.js";import"./hvemHarRettUtils-t-koDqci.js";import"./satserUtils-BrvzBZG-.js";import"./ArbeidssituasjonSteg-CcFKc8Co.js";import"./BlueRadioGroup-Du8Tvh0O.js";import"./customErrorFormatter-DSYNYJon.js";import"./PlanleggerStepPage-D-sMKRMG.js";import"./useScrollBehaviour-CuMo9RAh.js";import"./BarnehageplassSteg-TtbTB8mr.js";import"./uttakUtils-BwyCvrcX.js";import"./BabyWrapped-DL6FVEJx.js";import"./Information-CGQx42MU.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DcYtKxTk.js";import"./HvemPlanleggerSteg-J3VANJQP.js";import"./HvorLangPeriodeSteg-BqPK2daA.js";import"./PersonGroup-BY_ss37J.js";import"./HvorMyeSteg-Ba-oQzCD.js";import"./Wallet-Bi9H-Qjh.js";import"./OmBarnetSteg-BnavYG1P.js";import"./TasklistStart-DkAmTZbV.js";import"./OmPlanleggerenSteg-CQ3rpUEU.js";import"./OppsummeringSteg-CZR76Z4n.js";import"./ShareDataInfobox-CFOIj5jp.js";import"./useLagUttaksplanForslag-CIEwQKHn.js";import"./PlanenDeresSteg-n7aJhSvw.js";import"./OmÅTilpassePlanen-Bi59lhZt.js";import"./PersonPregnant-DujS7brX.js";import"./PencilWriting-D-MsyjXd.js";import"./UforutsetteEndringer-WeNNQWEG.js";import"./ToggleGroup-DM_ZAN3I.js";import"./TilpassPlanenSteg-B-p1s70X.js";import"./HvaErMulig-DdeoMUCE.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
