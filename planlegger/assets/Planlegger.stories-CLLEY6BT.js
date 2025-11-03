import{w as c,j as o,r as l,E}from"./iframe-BXBZKDVn.js";import{M as k,P as g}from"./usePlanleggerNavigator-ClkpMoTR.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D5OibzzY.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BYD4XHud.js";import"./barnetUtils-lilmROvh.js";import"./hvemHarRettUtils-C6_Jrxsi.js";import"./satserUtils-C3DgBZbn.js";import"./ArbeidssituasjonSteg-C6qYlpsQ.js";import"./BlueRadioGroup-CoTbV9ei.js";import"./customErrorFormatter-DaIjz-PU.js";import"./PlanleggerStepPage-BoelLzOk.js";import"./useScrollBehaviour-koDUDfJH.js";import"./Spacer-CneNCOYf.js";import"./BarnehageplassSteg-C1-VyQla.js";import"./uttakUtils-CHM-8UEs.js";import"./BabyWrapped-CHxICpa8.js";import"./Information-qSxxtrAF.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-DRq_TKPK.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DiwRNyTf.js";import"./HvorLangPeriodeSteg-BWgbJHzD.js";import"./PersonGroup-BGXWkwY8.js";import"./HvorMyeSteg-BXa33Us3.js";import"./Wallet-4VLvDYr6.js";import"./OmBarnetSteg-CVfNAIt5.js";import"./TasklistStart-D6-xIl4J.js";import"./OmPlanleggerenSteg-DXjvrwK7.js";import"./OppsummeringSteg-BMq1Qpob.js";import"./ShareDataInfobox-gKXraL6F.js";import"./CalendarLabels-C2A3Ak0e.js";import"./CalendarIconLabel-TDLntCqH.js";import"./FamiliehendelseLabel-TZql0ag_.js";import"./PlanenDeresSteg-J_lobzqi.js";import"./OmÅTilpassePlanen-dXr5hFOh.js";import"./PersonPregnant-CbY6khkF.js";import"./PencilWriting-D7dbqJW1.js";import"./UforutsetteEndringer-D_tAflSN.js";import"./ToggleGroup-De1n4hwF.js";import"./TilpassPlanenSteg-ByrGC5Ni.js";import"./HvaErMulig-BI3zrtkP.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
