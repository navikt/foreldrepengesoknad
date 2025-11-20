import{w as c,j as e,r as l,E}from"./iframe-Dt7vkiOY.js";import{M as g,P as R}from"./usePlanleggerNavigator-DBmTsFjX.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DNqZEezK.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BED2qUjo.js";import"./barnetUtils-Dz3J3BTF.js";import"./hvemHarRettUtils-DA-HlOJE.js";import"./satserUtils-B9-qflPo.js";import"./ArbeidssituasjonSteg-Duzy9_HL.js";import"./BlueRadioGroup-E4juWAXf.js";import"./customErrorFormatter-CyX8G4Wi.js";import"./PlanleggerStepPage-Mp-9V9ql.js";import"./useScrollBehaviour-XYLY9skx.js";import"./BarnehageplassSteg-CFFd0CMt.js";import"./uttakUtils-B986u7wt.js";import"./BabyWrapped-CZS3R37v.js";import"./Information-CPBaSFx5.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BW15Epcx.js";import"./HvemPlanleggerSteg-DA2lznVR.js";import"./HvorLangPeriodeSteg-wssi-lsi.js";import"./HvorMyeSteg-fBiUB048.js";import"./Wallet-C-xQuckS.js";import"./OmBarnetSteg-CZbnCRix.js";import"./TasklistStart-B3CNGeI4.js";import"./OmPlanleggerenSteg-E4Vzebby.js";import"./OppsummeringSteg-BN6ohYWa.js";import"./ShareDataInfobox-DYxBmb5w.js";import"./PlanenDeresSteg-DLpvQIHu.js";import"./OmÅTilpassePlanen-CeoA54x-.js";import"./PersonPregnant-C6t_Pd9b.js";import"./PencilWriting-DCEn8IgI.js";import"./UforutsetteEndringer-DB89jiJ-.js";import"./ToggleGroup-BOiPIK0h.js";import"./TilpassPlanenSteg-kyO9BWoT.js";import"./HvaErMulig-DXYVSLpK.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
