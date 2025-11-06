import{w as c,j as o,r as l,E}from"./iframe-B4T40G7c.js";import{M as k,P as g}from"./usePlanleggerNavigator-Dz5qMlJN.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DUVJEuPL.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BbBvbGaE.js";import"./barnetUtils-Cxg4Jc6F.js";import"./hvemHarRettUtils-CCto_yh3.js";import"./satserUtils-BGXNuL2K.js";import"./ArbeidssituasjonSteg-DvUGET3t.js";import"./BlueRadioGroup-DqdCC5j5.js";import"./customErrorFormatter-C5eGzTHy.js";import"./PlanleggerStepPage-DWH8VJRH.js";import"./useScrollBehaviour-BQyFOCJG.js";import"./Spacer-CaRqkwdx.js";import"./BarnehageplassSteg-P8-oXVi_.js";import"./uttakUtils-C9k6hm3m.js";import"./BabyWrapped-Bzgx_087.js";import"./Information-BwvxV0Du.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-1_Yac21a.js";import"./HvemPlanleggerSteg-BTi5d6XI.js";import"./HvorLangPeriodeSteg-DHs-94EJ.js";import"./PersonGroup-BcJe7GDy.js";import"./HvorMyeSteg-DJpCiyEu.js";import"./Wallet-Bnp99Ryh.js";import"./OmBarnetSteg-BLzy5aiF.js";import"./TasklistStart-Do_ETzho.js";import"./OmPlanleggerenSteg-CI5XwMEo.js";import"./OppsummeringSteg-DysM6L87.js";import"./ShareDataInfobox-ud2pz-QN.js";import"./CalendarLabels-CfPUyByX.js";import"./CalendarIconLabel-QCysZsq6.js";import"./FamiliehendelseLabel-C8uvNE5T.js";import"./PlanenDeresSteg-DldrnNXC.js";import"./OmÅTilpassePlanen-bAeG4B5Y.js";import"./PersonPregnant-EclxzUNO.js";import"./PencilWriting-bOcc5Psu.js";import"./UforutsetteEndringer-Dd0MnrKc.js";import"./ToggleGroup-CKSnSQsM.js";import"./TilpassPlanenSteg-kowMLOha.js";import"./HvaErMulig-Zmjstnu_.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      } satisfies {
        '80': KontoBeregningDto_fpoversikt;
        '100': KontoBeregningDto_fpoversikt;
      }))]
    }
  }
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
