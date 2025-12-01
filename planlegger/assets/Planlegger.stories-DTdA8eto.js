import{w as c,j as r,r as l,E}from"./iframe-BDQhk5My.js";import{M as g,P as R}from"./usePlanleggerNavigator-D-2xyp-V.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Dino9qFR.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DfoWDWL9.js";import"./barnetUtils-C7J9439S.js";import"./hvemHarRettUtils-DPDALWbz.js";import"./satserUtils-BDAxEXOK.js";import"./ArbeidssituasjonSteg-CzCRuA3M.js";import"./BlueRadioGroup-vvxsv-wt.js";import"./customErrorFormatter-DnPDMk4s.js";import"./PlanleggerStepPage-5E1eNNVg.js";import"./useScrollBehaviour-DY2tfbhI.js";import"./BarnehageplassSteg-DM6Q6TOm.js";import"./uttakUtils-Dsn_iDwy.js";import"./BabyWrapped-DHB-Pw7c.js";import"./Information-BkqUGwln.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Dfj6PhIk.js";import"./HvemPlanleggerSteg-BExj0CKP.js";import"./HvorLangPeriodeSteg-D-833rX1.js";import"./PersonGroup-CyXMTkRt.js";import"./HvorMyeSteg-DXNU1PsJ.js";import"./Wallet-Dnsk46rI.js";import"./OmBarnetSteg-D28JngFj.js";import"./TasklistStart-DnKZrSiR.js";import"./OmPlanleggerenSteg-3purdoP4.js";import"./OppsummeringSteg-VJYJf78E.js";import"./ShareDataInfobox-CiDatOEz.js";import"./useLagUttaksplanForslag-C7-SqK-9.js";import"./PlanenDeresSteg-CVyjjmTJ.js";import"./OmÅTilpassePlanen-CdtgJtIW.js";import"./PersonPregnant-DMyNDaoe.js";import"./PencilWriting-DX_QmboB.js";import"./UforutsetteEndringer-CC9frXyo.js";import"./ToggleGroup-BjxO85K4.js";import"./TilpassPlanenSteg-BJE9LfvV.js";import"./HvaErMulig-BQ10jtaH.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
