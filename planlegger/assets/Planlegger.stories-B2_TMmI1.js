import{w as c,j as r,r as l,E}from"./iframe-CF6-4WTJ.js";import{M as g,P as R}from"./usePlanleggerNavigator-DDrwTwer.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CN3__2Dv.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BxIx-Wv2.js";import"./barnetUtils-Dj8nVZRr.js";import"./hvemHarRettUtils-BSvQxGXb.js";import"./satserUtils-CQ7_Y5Cm.js";import"./ArbeidssituasjonSteg-BwTObAXP.js";import"./BlueRadioGroup-BtiNPcen.js";import"./customErrorFormatter-DuMXyWJD.js";import"./PlanleggerStepPage-_jOoFkHp.js";import"./useScrollBehaviour-C8BBZEa2.js";import"./BarnehageplassSteg-Ce03nD3e.js";import"./uttakUtils-uXNCl4_0.js";import"./BabyWrapped-FCdXuJTq.js";import"./Information-CXhHEaXs.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Rdb38RKO.js";import"./HvemPlanleggerSteg-Ckb-KlRj.js";import"./HvorLangPeriodeSteg-I_bRpo69.js";import"./PersonGroup-Dne4zsRj.js";import"./HvorMyeSteg-DF6tKP2b.js";import"./Wallet-CnnOQqfw.js";import"./OmBarnetSteg-DkXZUmMC.js";import"./TasklistStart-Bmyy6UHr.js";import"./OmPlanleggerenSteg-BtgtaLN5.js";import"./OppsummeringSteg-BsZXa5Tw.js";import"./ShareDataInfobox-Bnt30vL4.js";import"./PlanenDeresSteg-DxPZQ-oS.js";import"./OmÅTilpassePlanen-DM_rdtYD.js";import"./PersonPregnant-BCa2As-Q.js";import"./PencilWriting-ByNcqwgj.js";import"./UforutsetteEndringer-CXZ_lKvN.js";import"./ToggleGroup-BnoW0ZEZ.js";import"./TilpassPlanenSteg-DuZLvlEn.js";import"./HvaErMulig-E3mQwjuV.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
