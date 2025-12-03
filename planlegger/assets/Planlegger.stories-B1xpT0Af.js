import{w as c,j as r,r as l,E}from"./iframe-C6P6R3Np.js";import{M as g,P as R}from"./usePlanleggerNavigator-Bf-lwgPd.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DH2vDIXT.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DFRUVv0E.js";import"./barnetUtils-Da4fvPFA.js";import"./hvemHarRettUtils-Dvl0hYnt.js";import"./satserUtils-BYZLC41h.js";import"./ArbeidssituasjonSteg-D6q9q8ZG.js";import"./BlueRadioGroup-CLqUDkxR.js";import"./customErrorFormatter-QNSwvf6L.js";import"./PlanleggerStepPage-BlE0sDcb.js";import"./useScrollBehaviour-Dn4QWr52.js";import"./BarnehageplassSteg-BdhYVXf0.js";import"./uttakUtils-DMv1WQSg.js";import"./BabyWrapped-DVJs58oO.js";import"./Information-CkFWDx3D.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-YEebmkKG.js";import"./HvemPlanleggerSteg-DMngY_-u.js";import"./HvorLangPeriodeSteg-ByZWHKHw.js";import"./PersonGroup-Rg6B6xUt.js";import"./HvorMyeSteg-Cj1BM9LG.js";import"./Wallet-CWZeysr7.js";import"./OmBarnetSteg-BRSQ5Uip.js";import"./TasklistStart-CJ31Vxm-.js";import"./OmPlanleggerenSteg-DBeqPus1.js";import"./OppsummeringSteg-BmlQN4Mj.js";import"./ShareDataInfobox-uOjpXMqM.js";import"./useLagUttaksplanForslag-Dfq3Pr5I.js";import"./PlanenDeresSteg-ZV86Q7EF.js";import"./OmÅTilpassePlanen-Dt8I8Aqq.js";import"./PersonPregnant-D_43muFZ.js";import"./PencilWriting-BKUFkSYE.js";import"./UforutsetteEndringer-DnWJiAxj.js";import"./ToggleGroup-C1pvtbhL.js";import"./TilpassPlanenSteg-PAVNJ-AG.js";import"./HvaErMulig-CC9s3iln.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
