import{w as c,j as r,r as l,E}from"./iframe-ey_2i9tF.js";import{M as g,P as R}from"./usePlanleggerNavigator-CtH2KoQW.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BVgsG9qY.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BnrwSl5j.js";import"./barnetUtils-DaFNvNEE.js";import"./hvemHarRettUtils-Cbrf2otk.js";import"./satserUtils-kd-sj2N1.js";import"./ArbeidssituasjonSteg-BCDBfADW.js";import"./BlueRadioGroup-BkleQUvj.js";import"./customErrorFormatter-BlhrujXJ.js";import"./PlanleggerStepPage-JlDCiiG1.js";import"./useScrollBehaviour-DK_JXQRa.js";import"./BarnehageplassSteg-CqjOUmWJ.js";import"./uttakUtils-BVkYpfpM.js";import"./BabyWrapped-CyDMWlee.js";import"./Information-1dcrGHWf.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CyBmRDhR.js";import"./HvemPlanleggerSteg-DP9NtaIh.js";import"./HvorLangPeriodeSteg-BOsj3OlA.js";import"./PersonGroup-C3nmo00G.js";import"./HvorMyeSteg-Bmg-Z06B.js";import"./Wallet-y_mbBqlZ.js";import"./OmBarnetSteg-DTF1YAmb.js";import"./TasklistStart-BDkDBsja.js";import"./OmPlanleggerenSteg-aUo3elDJ.js";import"./OppsummeringSteg-BECGUmID.js";import"./ShareDataInfobox-BoPeaWUd.js";import"./useLagUttaksplanForslag-C3-EOGbz.js";import"./PlanenDeresSteg-CS2kWazg.js";import"./OmÅTilpassePlanen-Sd52xIHy.js";import"./PersonPregnant-fCqEwlVZ.js";import"./PencilWriting-BXLNxEJf.js";import"./UforutsetteEndringer-o0HuRLmW.js";import"./ToggleGroup-Ar5GgoeJ.js";import"./TilpassPlanenSteg-CC-h4b0o.js";import"./HvaErMulig-v5TOt86G.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
