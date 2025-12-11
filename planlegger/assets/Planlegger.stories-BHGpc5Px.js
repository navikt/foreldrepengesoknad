import{w as c,j as e,r as l,E}from"./iframe-C-JEUbWS.js";import{M as g,P as R}from"./usePlanleggerNavigator-i282NJXU.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CVhdQiQ0.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-DvRRl_S0.js";import"./barnetUtils-DKATMiFP.js";import"./hvemHarRettUtils-Bzh6zNzd.js";import"./satserUtils-DbfDGy3u.js";import"./ArbeidssituasjonSteg-Cednidgi.js";import"./BlueRadioGroup-BS6Xzop7.js";import"./customErrorFormatter-cLJqzpMZ.js";import"./PlanleggerStepPage-Dw78bCLb.js";import"./useScrollBehaviour-DbnDhPy2.js";import"./BarnehageplassSteg-TvI54kaw.js";import"./uttakUtils-BCcFwtHr.js";import"./BabyWrapped-Y4Grc0Tv.js";import"./Information-Be9Sz3l-.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-C95TmWzz.js";import"./HvemPlanleggerSteg-LgonddQo.js";import"./HvorLangPeriodeSteg-CuVx4Ks_.js";import"./PersonGroup-VYGW0BsK.js";import"./HvorMyeSteg-CLVjAtEe.js";import"./Wallet-CFQvvd6G.js";import"./OmBarnetSteg-Cd6Hrp8g.js";import"./TasklistStart-DLVXxFhL.js";import"./OmPlanleggerenSteg-C2eaE86N.js";import"./OppsummeringSteg-ctuKUPB3.js";import"./ShareDataInfobox-B1Ch8Dsn.js";import"./useLagUttaksplanForslag-B9JAfT0l.js";import"./PlanenDeresSteg-BcPwFhyn.js";import"./HvaErMulig-BTpBDM7N.js";import"./PersonPregnant-B5zZiFM8.js";import"./UforutsetteEndringer-BtHWACK8.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
