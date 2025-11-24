import{w as c,j as r,r as l,E}from"./iframe-z9xS-490.js";import{M as g,P as R}from"./usePlanleggerNavigator-CGzvU7hh.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-yhfSwLOy.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-fB4xICM6.js";import"./barnetUtils-DJpTUgeN.js";import"./hvemHarRettUtils-BSBFLFHe.js";import"./satserUtils-wv98Whjs.js";import"./ArbeidssituasjonSteg-BfSRGcTC.js";import"./BlueRadioGroup-BtmiaLr3.js";import"./customErrorFormatter-BZOCH_sy.js";import"./PlanleggerStepPage-CDxIgynk.js";import"./useScrollBehaviour-D3klVqt3.js";import"./BarnehageplassSteg-Lb6DcdC5.js";import"./uttakUtils-DazjQncz.js";import"./BabyWrapped-BlKbE-ac.js";import"./Information-L6-EVQlV.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CipQGNTl.js";import"./HvemPlanleggerSteg-hCwW1fmd.js";import"./HvorLangPeriodeSteg-9JBA0AOd.js";import"./PersonGroup-Bt81Q-tL.js";import"./HvorMyeSteg-lK8Fg1Fl.js";import"./Wallet-BYfv049l.js";import"./OmBarnetSteg-Ci6_pYDh.js";import"./TasklistStart-BP_EFIU1.js";import"./OmPlanleggerenSteg-CrqKdRNP.js";import"./OppsummeringSteg-CGuh79s2.js";import"./ShareDataInfobox-tGiqFtSU.js";import"./PlanenDeresSteg-DLUmxSp7.js";import"./OmÅTilpassePlanen-Bun4jf2C.js";import"./PersonPregnant-Btr5Iy57.js";import"./PencilWriting-DdBHm6X4.js";import"./UforutsetteEndringer-dtb3wV3-.js";import"./ToggleGroup-BfYagqXA.js";import"./TilpassPlanenSteg-D7bdDTz5.js";import"./HvaErMulig-Bf8jfedD.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
