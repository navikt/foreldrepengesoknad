import{w as c,j as e,r as l,E}from"./iframe-CWVJK1FM.js";import{M as g,P as R}from"./usePlanleggerNavigator-WbqkBMqr.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CEopX5iV.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BZWijMz7.js";import"./barnetUtils-BwuZAmP7.js";import"./hvemHarRettUtils-Bm8Xp99V.js";import"./satserUtils-CfqJyRrq.js";import"./ArbeidssituasjonSteg-nGMAQmjQ.js";import"./BlueRadioGroup-BHSpJR3Q.js";import"./customErrorFormatter-hsurLGCg.js";import"./PlanleggerStepPage-DTHwde7f.js";import"./useScrollBehaviour-DROkofBD.js";import"./BarnehageplassSteg-BoLeISWr.js";import"./uttakUtils-CWP4weDH.js";import"./BabyWrapped-CJalDJ6k.js";import"./Information-Dz5nrfIR.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-Dzgzx639.js";import"./HvemPlanleggerSteg-CRnPAQck.js";import"./HvorLangPeriodeSteg-B2nLlucu.js";import"./HvorMyeSteg-depg7h6u.js";import"./Wallet-CazvNZVQ.js";import"./OmBarnetSteg-DI3ze6Wh.js";import"./TasklistStart-DEFi6Pcj.js";import"./OmPlanleggerenSteg-GARks4Wn.js";import"./OppsummeringSteg-BPl_8wwC.js";import"./ShareDataInfobox-20A63J78.js";import"./PlanenDeresSteg-DU-3dQ4t.js";import"./OmÅTilpassePlanen-BydOhnt-.js";import"./PersonPregnant-D6YLccct.js";import"./PencilWriting-N4eDQEa0.js";import"./UforutsetteEndringer-BfHqeD2e.js";import"./ToggleGroup-EljzxmJb.js";import"./TilpassPlanenSteg-BoXj3Dg_.js";import"./HvaErMulig-CdAk7WXm.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
