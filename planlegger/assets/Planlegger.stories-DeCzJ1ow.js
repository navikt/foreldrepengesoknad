import{w as c,j as r,r as l,E}from"./iframe-Ci9kdKxb.js";import{M as g,P as R}from"./usePlanleggerNavigator-BXygaM9P.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DulR_V80.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Cj0T_s7m.js";import"./barnetUtils-W8FFL8zT.js";import"./hvemHarRettUtils-hphLc3zO.js";import"./satserUtils-C44aFz1D.js";import"./ArbeidssituasjonSteg-C_-1AVyH.js";import"./BlueRadioGroup-D139BT4w.js";import"./customErrorFormatter-D_esn4S4.js";import"./PlanleggerStepPage-BlrTfTXO.js";import"./useScrollBehaviour-bSYEJROT.js";import"./BarnehageplassSteg-PG0p4v9j.js";import"./uttakUtils-Bt7ExjpH.js";import"./BabyWrapped-BJTDMLTZ.js";import"./Information-C0uFBrth.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DczFPoSk.js";import"./HvemPlanleggerSteg-D8FofMzz.js";import"./HvorLangPeriodeSteg-qtB9DGzF.js";import"./PersonGroup-DUVR45UH.js";import"./HvorMyeSteg-Di0Ty9aU.js";import"./Wallet-gsPLM-c_.js";import"./OmBarnetSteg-uTJ9ymtA.js";import"./TasklistStart-ROHiQRD4.js";import"./OmPlanleggerenSteg-BY0Q3nSv.js";import"./OppsummeringSteg-DKF4bTOd.js";import"./ShareDataInfobox-7QHwHKU7.js";import"./PlanenDeresSteg-CW0raLth.js";import"./OmÅTilpassePlanen-DM--iNaF.js";import"./PersonPregnant-Cd3FEm6e.js";import"./PencilWriting-CmEV9wRh.js";import"./UforutsetteEndringer-D_4uVi_K.js";import"./ToggleGroup-2RZFHT9g.js";import"./TilpassPlanenSteg-DTNihb1K.js";import"./HvaErMulig-CFO1ug8I.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
