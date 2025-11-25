import{w as c,j as r,r as l,E}from"./iframe-v0rzsIQp.js";import{M as g,P as R}from"./usePlanleggerNavigator-b4bY1PpU.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-0Dcj7NQ_.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DWTEWFPs.js";import"./barnetUtils-V6NFNb4u.js";import"./hvemHarRettUtils-C2tWb-qT.js";import"./satserUtils-DvM6xaXK.js";import"./ArbeidssituasjonSteg-D55_K-s1.js";import"./BlueRadioGroup-B0PaKNhY.js";import"./customErrorFormatter-aGGj88Cl.js";import"./PlanleggerStepPage-CyhlJHfE.js";import"./useScrollBehaviour-cluBLU8L.js";import"./BarnehageplassSteg-B0pW6QwG.js";import"./uttakUtils-BLcGko1t.js";import"./BabyWrapped-BXt4yk4X.js";import"./Information-CUV7AUsg.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Cgj1eN1X.js";import"./HvemPlanleggerSteg-r_MsI_BE.js";import"./HvorLangPeriodeSteg-B8JuaDF_.js";import"./PersonGroup-CnXPo5Xk.js";import"./HvorMyeSteg-DGb3WRuL.js";import"./Wallet-nQUeF7UN.js";import"./OmBarnetSteg-easmRmdw.js";import"./TasklistStart-DMGbyMIA.js";import"./OmPlanleggerenSteg-AIFCuipJ.js";import"./OppsummeringSteg-CGJkIIis.js";import"./ShareDataInfobox-DTPeWipO.js";import"./PlanenDeresSteg-CvncknJ4.js";import"./OmÅTilpassePlanen-NPKF3ihv.js";import"./PersonPregnant-K8sGxovZ.js";import"./PencilWriting-CeWe25RG.js";import"./UforutsetteEndringer-c4qG2gaC.js";import"./ToggleGroup-DJuMXku_.js";import"./TilpassPlanenSteg-CdzfB_bZ.js";import"./HvaErMulig-CtxxI202.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
