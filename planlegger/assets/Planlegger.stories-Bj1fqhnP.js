import{w as c,j as r,r as l,E}from"./iframe-BeQyG83Z.js";import{M as g,P as R}from"./usePlanleggerNavigator-UifM1M0c.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CTH-jNLW.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Dctjq8MN.js";import"./barnetUtils-1XjnGm-H.js";import"./hvemHarRettUtils-x0PUFqZM.js";import"./satserUtils-BcydYUV5.js";import"./ArbeidssituasjonSteg-kljhcUji.js";import"./BlueRadioGroup-DraqUx6n.js";import"./customErrorFormatter-CH9eXuj2.js";import"./PlanleggerStepPage-DI9Glm0c.js";import"./useScrollBehaviour-B1XB1ArV.js";import"./BarnehageplassSteg-BaBpI2yU.js";import"./uttakUtils-BJ_Ok2Ul.js";import"./BabyWrapped-lA0AIil-.js";import"./Information-CFHXO2RI.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DKgHh3I3.js";import"./HvemPlanleggerSteg-CImmz5mb.js";import"./HvorLangPeriodeSteg-Devx6jRV.js";import"./PersonGroup-DiS3P8rj.js";import"./HvorMyeSteg-yJO5v4eA.js";import"./Wallet-DfpROnk3.js";import"./OmBarnetSteg-wN0azgbc.js";import"./TasklistStart-BjSF7LTr.js";import"./OmPlanleggerenSteg-BhQElmA5.js";import"./OppsummeringSteg-CIGQ6tE9.js";import"./ShareDataInfobox-DbeHmeUQ.js";import"./PlanenDeresSteg-B6L0DQaf.js";import"./OmÅTilpassePlanen-BKpReWUC.js";import"./PersonPregnant-CIQHJ1ZQ.js";import"./PencilWriting-C3X9-JmC.js";import"./UforutsetteEndringer-BJl95Ph-.js";import"./ToggleGroup-RosSTWEk.js";import"./TilpassPlanenSteg-D419jVcl.js";import"./HvaErMulig-CH5053Fa.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
