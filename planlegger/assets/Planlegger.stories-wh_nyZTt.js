import{w as c,j as e,r as l,E}from"./iframe-CKY5iwEH.js";import{M as g,P as R}from"./usePlanleggerNavigator-6EJcwo9G.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DmIm3aWa.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-Cr423uKl.js";import"./barnetUtils-BUXdecZk.js";import"./hvemHarRettUtils-RPfZ2mW_.js";import"./satserUtils-DilMEnEz.js";import"./ArbeidssituasjonSteg-CRYFKk9F.js";import"./BlueRadioGroup-DuMSr-Pn.js";import"./customErrorFormatter-C8p5XT4O.js";import"./PlanleggerStepPage-BnemJscq.js";import"./useScrollBehaviour-Czv6glrF.js";import"./BarnehageplassSteg-BfQqjTlP.js";import"./uttakUtils-BV6g7by_.js";import"./BabyWrapped-DgjBEyQi.js";import"./Information-Blf_BuNu.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DuBHZ-tD.js";import"./HvemPlanleggerSteg-htUeva-t.js";import"./HvorLangPeriodeSteg-CST77goj.js";import"./PersonGroup-DsKnWsyD.js";import"./HvorMyeSteg-OFAR-8vJ.js";import"./Wallet-Cbd5T4QK.js";import"./OmBarnetSteg-Ia-J4JCY.js";import"./TasklistStart-CkI_9tac.js";import"./OmPlanleggerenSteg-C1ErEN0E.js";import"./OppsummeringSteg-DhmABel9.js";import"./ShareDataInfobox-BWceFC0b.js";import"./useLagUttaksplanForslag-Dc1agInn.js";import"./PlanenDeresSteg-BoK9o8Kg.js";import"./HvaErMulig-CIdxMsd3.js";import"./PersonPregnant-BWsOY619.js";import"./UforutsetteEndringer-wqLmjy0u.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
