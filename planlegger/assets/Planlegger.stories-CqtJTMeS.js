import{w as c,j as e,r as l,E}from"./iframe-rDMSU5wM.js";import{M as g,P as R}from"./usePlanleggerNavigator-DoI6BNKf.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D0ipLxSg.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-DrG9Qoy-.js";import"./barnetUtils-RV3yWi__.js";import"./hvemHarRettUtils-BuQOyYp6.js";import"./satserUtils-Dm5jK7Lk.js";import"./ArbeidssituasjonSteg-B816WrHt.js";import"./BlueRadioGroup-C3MwHgFf.js";import"./customErrorFormatter-OXFbUqTa.js";import"./PlanleggerStepPage-Dhwc_6Wm.js";import"./useScrollBehaviour-DlbfBFtR.js";import"./BarnehageplassSteg-DQS57p_6.js";import"./uttakUtils-D9JrjcfG.js";import"./BabyWrapped-CuOZiyT2.js";import"./Information-Cq4KGZyA.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CEfuX4Jn.js";import"./HvemPlanleggerSteg-qS5w-Syx.js";import"./HvorLangPeriodeSteg-DwoxAnSK.js";import"./PersonGroup-DiobJ1bP.js";import"./HvorMyeSteg-DbJ7lAkE.js";import"./Wallet-9sscElhw.js";import"./OmBarnetSteg-hvF_WBOX.js";import"./TasklistStart-CWyzGxRk.js";import"./OmPlanleggerenSteg-DhP7Rkqr.js";import"./OppsummeringSteg-CqFvx3Zx.js";import"./ShareDataInfobox-3Yp3oDPp.js";import"./useLagUttaksplanForslag-BRnO28UA.js";import"./PlanenDeresSteg-d7AiZo0g.js";import"./HvaErMulig-D4Yy1Joa.js";import"./PersonPregnant-BdchH6oj.js";import"./UforutsetteEndringer-CJhIGUJD.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
