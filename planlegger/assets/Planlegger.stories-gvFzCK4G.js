import{w as c,j as e,r as l,E}from"./iframe-CqSVsB2b.js";import{M as g,P as R}from"./usePlanleggerNavigator-75a8s3Gw.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DrSJ4gSY.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BAFmYK5F.js";import"./barnetUtils-BudWfk04.js";import"./hvemHarRettUtils-Gdk3DerX.js";import"./satserUtils-D4s91Ylg.js";import"./ArbeidssituasjonSteg-CXnDS2cv.js";import"./BlueRadioGroup-CMlNmaxc.js";import"./customErrorFormatter-DHaNOVT5.js";import"./PlanleggerStepPage-BihU8bWY.js";import"./useScrollBehaviour-CqFHTxE2.js";import"./BarnehageplassSteg-BdWA6lF8.js";import"./uttakUtils-HrSQ8GQd.js";import"./BabyWrapped-CInl8r1L.js";import"./Information-CM9UEo4K.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-CMHfpvaI.js";import"./HvemPlanleggerSteg-BfnmmVF9.js";import"./HvorLangPeriodeSteg-BWhZhI65.js";import"./HvorMyeSteg-UwGxD9hj.js";import"./Wallet-DLmzdzWt.js";import"./OmBarnetSteg-BHACCVKd.js";import"./TasklistStart-NShAbwzH.js";import"./OmPlanleggerenSteg-CANMpLTx.js";import"./OppsummeringSteg-Uxk6uvV0.js";import"./ShareDataInfobox-CFoFxH_F.js";import"./PlanenDeresSteg-BSzdSysm.js";import"./OmÅTilpassePlanen-bKImaMmp.js";import"./PersonPregnant-B4WFUei-.js";import"./PencilWriting-7Lg3LFzE.js";import"./UforutsetteEndringer-Bwm-qTUU.js";import"./ToggleGroup-c2Yky7E1.js";import"./TilpassPlanenSteg-BwlLsbnZ.js";import"./HvaErMulig-DV79l3Ct.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
