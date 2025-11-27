import{w as c,j as r,r as l,E}from"./iframe-C6fHVOEJ.js";import{M as g,P as R}from"./usePlanleggerNavigator-ZJ12tRAf.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BavQqwG4.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DZ9x4WMJ.js";import"./barnetUtils-Xw_RZy9f.js";import"./hvemHarRettUtils-BPllXdNi.js";import"./satserUtils-D_6rgVbb.js";import"./ArbeidssituasjonSteg-BPe0KVUw.js";import"./BlueRadioGroup-0tVbfdQR.js";import"./customErrorFormatter-D1MerEZg.js";import"./PlanleggerStepPage--oL62Vd2.js";import"./useScrollBehaviour-DZYOZxGU.js";import"./BarnehageplassSteg-CtRl9bnS.js";import"./uttakUtils-C_XIcxvq.js";import"./BabyWrapped-CrYXt0qX.js";import"./Information-De3o7T3i.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-6ODcx0DX.js";import"./HvemPlanleggerSteg-roOFyLC9.js";import"./HvorLangPeriodeSteg-VfU50JNz.js";import"./PersonGroup-BFHtPx5s.js";import"./HvorMyeSteg-BqzVGzQQ.js";import"./Wallet-BvL1oOxm.js";import"./OmBarnetSteg-CkikG6J7.js";import"./TasklistStart-BBZ-EqeM.js";import"./OmPlanleggerenSteg-BjSjN8pC.js";import"./OppsummeringSteg-hQT3njCi.js";import"./ShareDataInfobox-CdjWeJrO.js";import"./useLagUttaksplanForslag-CO275xM5.js";import"./PlanenDeresSteg-BLDyhWxN.js";import"./OmÅTilpassePlanen-DsR7hyuL.js";import"./PersonPregnant-CqH8oZRR.js";import"./PencilWriting-DsORkRc8.js";import"./UforutsetteEndringer-DyywMgTR.js";import"./ToggleGroup-CrbLLpdS.js";import"./TilpassPlanenSteg-CZTRoywO.js";import"./HvaErMulig-Dw6EWLpd.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
