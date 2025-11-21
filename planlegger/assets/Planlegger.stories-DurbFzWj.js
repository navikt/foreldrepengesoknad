import{w as c,j as r,r as l,E}from"./iframe-YoUqtHLq.js";import{M as g,P as R}from"./usePlanleggerNavigator-C1xYNuUQ.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D8bWjz0h.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CRTgQ9j0.js";import"./barnetUtils-DjEXnhJo.js";import"./hvemHarRettUtils-CWIxscpX.js";import"./satserUtils-MhhdyPgp.js";import"./ArbeidssituasjonSteg-D8Q0BaSA.js";import"./BlueRadioGroup-DuCFvTsl.js";import"./customErrorFormatter-xrkn7riU.js";import"./PlanleggerStepPage-CxeZ090C.js";import"./useScrollBehaviour--5eIcTRf.js";import"./BarnehageplassSteg-BGhEc5O8.js";import"./uttakUtils-BGjBoKyD.js";import"./BabyWrapped-Cd9PVElG.js";import"./Information-CYf1nF1c.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CUDFKRwm.js";import"./HvemPlanleggerSteg-CFwR2_A1.js";import"./HvorLangPeriodeSteg-DACszBaf.js";import"./PersonGroup-Bm2Fx43V.js";import"./HvorMyeSteg-rDiE2_OA.js";import"./Wallet-B6LFVmBO.js";import"./OmBarnetSteg-cADEtDXU.js";import"./TasklistStart-BIUDYSMc.js";import"./OmPlanleggerenSteg-ltvDaF2n.js";import"./OppsummeringSteg-CHL9It2q.js";import"./ShareDataInfobox-DxumQnrl.js";import"./PlanenDeresSteg-Dc65xPDG.js";import"./OmÅTilpassePlanen-Dtmd1uFG.js";import"./PersonPregnant-C7P9uBPN.js";import"./PencilWriting-DU04rayd.js";import"./UforutsetteEndringer-CsArX6Zq.js";import"./ToggleGroup-DwcwCSBU.js";import"./TilpassPlanenSteg-Dyhdzd79.js";import"./HvaErMulig-VI2IEvtZ.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
