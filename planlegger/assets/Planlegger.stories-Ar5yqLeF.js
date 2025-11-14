import{w as c,j as e,r as l,E}from"./iframe-BQDkJM2E.js";import{M as g,P as R}from"./usePlanleggerNavigator-uDoOL7z-.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CeerE855.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DJhrsKii.js";import"./barnetUtils-CVXLy-Sj.js";import"./hvemHarRettUtils-Cj_DnCuX.js";import"./satserUtils-DQ5VJfzG.js";import"./ArbeidssituasjonSteg-tzz892Z8.js";import"./BlueRadioGroup-DWBP14Tz.js";import"./customErrorFormatter-BcsD4fRR.js";import"./PlanleggerStepPage-zaZmhGTA.js";import"./useScrollBehaviour-BvT30F7l.js";import"./BarnehageplassSteg-D6fEtYT3.js";import"./uttakUtils-BFMJCfvs.js";import"./BabyWrapped-DmqREWHG.js";import"./Information-DJxvZ-fn.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-B1J3p4Ej.js";import"./HvemPlanleggerSteg-Dzci2ruC.js";import"./HvorLangPeriodeSteg-C3LTvto2.js";import"./HvorMyeSteg-Bs-zCM8r.js";import"./Wallet-CM_ZDRWY.js";import"./OmBarnetSteg-CcIXDi24.js";import"./TasklistStart-DJ2UHWn8.js";import"./OmPlanleggerenSteg-B3WfeplA.js";import"./OppsummeringSteg-Bp5oMEMU.js";import"./ShareDataInfobox-C7Q6rCy2.js";import"./PlanenDeresSteg-B6er52lG.js";import"./OmÅTilpassePlanen-CRTpw2OM.js";import"./PersonPregnant-AzHPPLcA.js";import"./PencilWriting-D0WSmFJQ.js";import"./UforutsetteEndringer-B0ZVjaxj.js";import"./ToggleGroup-Bai0sLVo.js";import"./TilpassPlanenSteg-U1yLvU8B.js";import"./HvaErMulig-iMghU5Pe.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ot=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,ot as __namedExportsOrder,rt as default};
