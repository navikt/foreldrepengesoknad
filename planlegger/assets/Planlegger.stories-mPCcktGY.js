import{w as c,j as r,r as l,E}from"./iframe-Bk1NWwdL.js";import{M as g,P as R}from"./usePlanleggerNavigator-DQ6W22r0.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BM7uf0r1.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-9odf1RN8.js";import"./barnetUtils-BkWu94gS.js";import"./hvemHarRettUtils-WI03HH2_.js";import"./satserUtils-CKgHH84W.js";import"./ArbeidssituasjonSteg-Bg9KzB63.js";import"./BlueRadioGroup-D5ADOS_w.js";import"./customErrorFormatter-BRu7xBGQ.js";import"./PlanleggerStepPage-CV8pg1ES.js";import"./useScrollBehaviour-DbX36EWU.js";import"./BarnehageplassSteg-CFXO0RSL.js";import"./uttakUtils-B3_aHu7_.js";import"./BabyWrapped-qfezLc6s.js";import"./Information-B0r6riNk.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BS6Wdx1k.js";import"./HvemPlanleggerSteg-D7-QErX1.js";import"./HvorLangPeriodeSteg-dlK9lxp0.js";import"./PersonGroup-BAHPUW1I.js";import"./HvorMyeSteg-BdtkdszI.js";import"./Wallet-C19Q2jhA.js";import"./OmBarnetSteg-DDA7FDVK.js";import"./TasklistStart-JhGR-ukr.js";import"./OmPlanleggerenSteg-sqsxs0Ou.js";import"./OppsummeringSteg-BQfo4K6U.js";import"./ShareDataInfobox-BbesQvtU.js";import"./useLagUttaksplanForslag-B6zMvVIA.js";import"./PlanenDeresSteg-CNPP_8e3.js";import"./OmÅTilpassePlanen-S2_xdZJZ.js";import"./PersonPregnant-H3mILxvx.js";import"./PencilWriting-slmDf9A6.js";import"./UforutsetteEndringer-0bPtJ33Q.js";import"./ToggleGroup-BUlcOHGF.js";import"./TilpassPlanenSteg-zNPVuoL0.js";import"./HvaErMulig-BxfLeFXw.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
