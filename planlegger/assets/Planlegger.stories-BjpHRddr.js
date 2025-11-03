import{w as c,j as o,r as l,E}from"./iframe-sZKdk1M8.js";import{M as k,P as g}from"./usePlanleggerNavigator-gNaO3tz6.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DEsotGQq.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DwYQ5YIk.js";import"./barnetUtils-C-1qeUhM.js";import"./hvemHarRettUtils-p6Tli1Sl.js";import"./satserUtils-Boal3XqD.js";import"./ArbeidssituasjonSteg-C53vf2Rf.js";import"./BlueRadioGroup-DWXk2EbH.js";import"./customErrorFormatter-DV08rxhF.js";import"./PlanleggerStepPage-keAfExaG.js";import"./useScrollBehaviour-C2SfCzPe.js";import"./Spacer-CzAB50LY.js";import"./BarnehageplassSteg-5FlJ3FKR.js";import"./uttakUtils-BDO55G7-.js";import"./BabyWrapped-Dbubyszm.js";import"./Information-DcOXZW2L.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-5HJAl_Px.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-COk4yjdR.js";import"./HvorLangPeriodeSteg-Bh6iJIAB.js";import"./PersonGroup-wiqQQpGc.js";import"./HvorMyeSteg-BrlAf0ZM.js";import"./Wallet-Dj40T4Ds.js";import"./OmBarnetSteg-CK3rbkuK.js";import"./TasklistStart-DP_v2_m0.js";import"./OmPlanleggerenSteg-BHkwaRUg.js";import"./OppsummeringSteg-B4vWddq3.js";import"./ShareDataInfobox-BCsrWd3J.js";import"./CalendarLabels-BYauqw11.js";import"./CalendarIconLabel-DyX3Q89i.js";import"./FamiliehendelseLabel-D57_IFY2.js";import"./PlanenDeresSteg-DdPZZr6j.js";import"./OmÅTilpassePlanen-DkWvXP1Y.js";import"./PersonPregnant-B0b2W-QG.js";import"./PencilWriting-DvRMDoJO.js";import"./UforutsetteEndringer-BnbcnRKg.js";import"./ToggleGroup-BkV0VNBW.js";import"./TilpassPlanenSteg-CcBhNefZ.js";import"./HvaErMulig-B543wzCj.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
