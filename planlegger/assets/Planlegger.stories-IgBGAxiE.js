import{w as c,j as r,r as l,E}from"./iframe-BRGaeTCr.js";import{M as g,P as R}from"./usePlanleggerNavigator-CC4tXfpx.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-ByLAJ-e-.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B0y8iI29.js";import"./barnetUtils-DS2_SCQv.js";import"./hvemHarRettUtils-CInZ-ZbR.js";import"./satserUtils-Cu1ngz-H.js";import"./ArbeidssituasjonSteg-D8TC80hF.js";import"./BlueRadioGroup-Dnb650T1.js";import"./customErrorFormatter-D4J2qm8M.js";import"./PlanleggerStepPage-DZAIZYQ3.js";import"./useScrollBehaviour-BzqJ9Fk-.js";import"./BarnehageplassSteg-B4lXeTDV.js";import"./uttakUtils-KlTUv_HV.js";import"./BabyWrapped-o5TQGx2L.js";import"./Information-DWOapUYq.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-D4OMFXA4.js";import"./HvemPlanleggerSteg-DN5QkbHi.js";import"./HvorLangPeriodeSteg-CFNKo-ma.js";import"./PersonGroup-DJ0apLOb.js";import"./HvorMyeSteg-Bmcse-EU.js";import"./Wallet-DbDuxkeT.js";import"./OmBarnetSteg-BHVjDdlU.js";import"./TasklistStart-B8mTUFim.js";import"./OmPlanleggerenSteg-kCE3vioT.js";import"./OppsummeringSteg-DCTzEKR4.js";import"./ShareDataInfobox-bmfnvpQs.js";import"./useLagUttaksplanForslag-OAEzwMvE.js";import"./PlanenDeresSteg-Bpa-_m08.js";import"./OmÅTilpassePlanen-rZ4p20SZ.js";import"./PersonPregnant-CA0QliIv.js";import"./PencilWriting-CYfUZqud.js";import"./UforutsetteEndringer-Fy8smxVU.js";import"./ToggleGroup-CTfBAXm2.js";import"./TilpassPlanenSteg-C__pLj9k.js";import"./HvaErMulig-D75LZmHY.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
