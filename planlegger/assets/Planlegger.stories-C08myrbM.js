import{w as c,j as r,r as l,E}from"./iframe-DwMlS1JO.js";import{M as g,P as R}from"./usePlanleggerNavigator-CSEqvxOk.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-eg0JIeAE.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B_Y-QsDn.js";import"./barnetUtils-BuClKnJU.js";import"./hvemHarRettUtils-BKk59kRg.js";import"./satserUtils-CWwt0CgB.js";import"./ArbeidssituasjonSteg-DpEDHuRx.js";import"./BlueRadioGroup-BKa0EaOG.js";import"./customErrorFormatter-BUynFuyf.js";import"./PlanleggerStepPage-B3Tn84zJ.js";import"./useScrollBehaviour-tRfH1Eir.js";import"./BarnehageplassSteg-C5LiLQeE.js";import"./uttakUtils-Bfa8Tz_F.js";import"./BabyWrapped-DCPteqv9.js";import"./Information-DVCfqtnY.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BUAGgJzD.js";import"./HvemPlanleggerSteg-BpE_D2h5.js";import"./HvorLangPeriodeSteg-Du0ZnttQ.js";import"./PersonGroup-Q1Mk5H90.js";import"./HvorMyeSteg-FSXFEgkT.js";import"./Wallet-D7yEo-Na.js";import"./OmBarnetSteg-CbxgqLoZ.js";import"./TasklistStart-BpmfLwLu.js";import"./OmPlanleggerenSteg-BRzlldef.js";import"./OppsummeringSteg-DqHhc57L.js";import"./ShareDataInfobox-7iJqU1Ik.js";import"./useLagUttaksplanForslag-DDWpOddJ.js";import"./PlanenDeresSteg-DMBGb3C8.js";import"./OmÅTilpassePlanen-Dec4Ieqv.js";import"./PersonPregnant-_7vUP65h.js";import"./PencilWriting-DwawojTs.js";import"./UforutsetteEndringer-DlU4pe3u.js";import"./ToggleGroup-CsHXKnmD.js";import"./TilpassPlanenSteg-BoUy3p6R.js";import"./HvaErMulig-Mrig8o9I.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
