import{w as c,j as r,r as l,E}from"./iframe-DndkNliQ.js";import{M as g,P as R}from"./usePlanleggerNavigator-CmqydtTb.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BpmF9EeO.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B9_WiQ3X.js";import"./barnetUtils-D580Oqw5.js";import"./hvemHarRettUtils-DltcdaWb.js";import"./satserUtils-BStC21l9.js";import"./ArbeidssituasjonSteg-xsEAWB3w.js";import"./BlueRadioGroup-B708tsCX.js";import"./customErrorFormatter-S0FjhRxy.js";import"./PlanleggerStepPage-Bmw152V5.js";import"./useScrollBehaviour-DxKI_Sjn.js";import"./BarnehageplassSteg-Cw4gcbBS.js";import"./uttakUtils-yym0YvIs.js";import"./BabyWrapped-Vtr1Fg1m.js";import"./Information-ByDk3eJQ.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BbEbiOx8.js";import"./HvemPlanleggerSteg-SVv9K7zY.js";import"./HvorLangPeriodeSteg-DGLtFey5.js";import"./PersonGroup-CAEXWOUc.js";import"./HvorMyeSteg-DTqY4DnE.js";import"./Wallet-rKRYjggT.js";import"./OmBarnetSteg-DfcDYAHY.js";import"./TasklistStart-OGxI4QmJ.js";import"./OmPlanleggerenSteg-DJa_LoSQ.js";import"./OppsummeringSteg-CRtM2KOI.js";import"./ShareDataInfobox-B5SCignG.js";import"./useLagUttaksplanForslag-Crxgov69.js";import"./PlanenDeresSteg-DdNSBMNJ.js";import"./OmÅTilpassePlanen-jtUoycC0.js";import"./PersonPregnant-66Q8v1om.js";import"./PencilWriting-ZJ3T8mAD.js";import"./UforutsetteEndringer-CsQ6MBeZ.js";import"./ToggleGroup-2Tr-YXEl.js";import"./TilpassPlanenSteg-g29snnod.js";import"./HvaErMulig-BL2ouywC.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
