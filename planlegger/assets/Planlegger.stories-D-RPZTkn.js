import{w as c,j as r,r as l,E}from"./iframe-BmBYrKFm.js";import{M as g,P as R}from"./usePlanleggerNavigator-DvYqRITx.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-nUyi9ZNi.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CdgfqY0S.js";import"./barnetUtils-CDOjzT0b.js";import"./hvemHarRettUtils-DUoilJO5.js";import"./satserUtils-CMa7w1al.js";import"./ArbeidssituasjonSteg-CV-VkC82.js";import"./BlueRadioGroup-CzyRErpY.js";import"./customErrorFormatter-Bc4U1R2Y.js";import"./PlanleggerStepPage-COETepEa.js";import"./useScrollBehaviour-BvR4DsZ2.js";import"./BarnehageplassSteg-DTuwyHvJ.js";import"./uttakUtils-Zq1lGIMm.js";import"./BabyWrapped-DPf58hGW.js";import"./Information-DTaWEvSp.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DXW4vGKX.js";import"./HvemPlanleggerSteg-DFF8baBs.js";import"./HvorLangPeriodeSteg-gKRTsJAH.js";import"./PersonGroup-CIMpRW39.js";import"./HvorMyeSteg-D1P2yLWp.js";import"./Wallet-C9qoxy1m.js";import"./OmBarnetSteg-XhiR9LxB.js";import"./TasklistStart-YLpD0qMo.js";import"./OmPlanleggerenSteg-9a1-Lp6z.js";import"./OppsummeringSteg-QTfeIF4x.js";import"./ShareDataInfobox-qlyv28Ql.js";import"./useLagUttaksplanForslag-C4oiT_Kn.js";import"./PlanenDeresSteg-DJMqZOf0.js";import"./OmÅTilpassePlanen-7g2OoTgy.js";import"./PersonPregnant-SMO78Jig.js";import"./PencilWriting-DlNpBeOW.js";import"./UforutsetteEndringer-CSRAJRIq.js";import"./ToggleGroup-B_sD6wgB.js";import"./TilpassPlanenSteg-BDU_W2Ha.js";import"./HvaErMulig-DmW124Le.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
