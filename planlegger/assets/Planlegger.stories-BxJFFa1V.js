import{w as c,j as r,r as l,E}from"./iframe-CLuD6Pyp.js";import{M as g,P as R}from"./usePlanleggerNavigator-TRhl6Zd5.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-QhXgPyx7.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Bf9pIaHB.js";import"./barnetUtils-BvsBzuic.js";import"./hvemHarRettUtils-DXVGG9t8.js";import"./satserUtils-QcZ_vKwe.js";import"./ArbeidssituasjonSteg-3-FYJ4ff.js";import"./BlueRadioGroup-BKg0Hvmu.js";import"./customErrorFormatter-D_P0i5YO.js";import"./PlanleggerStepPage-DVLF264X.js";import"./useScrollBehaviour-C3nzbIeI.js";import"./BarnehageplassSteg-DFXyUFQX.js";import"./uttakUtils-CV_BkfP2.js";import"./BabyWrapped-YS-1KgUO.js";import"./Information-DDGmoc2f.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DqmZL9Ka.js";import"./HvemPlanleggerSteg-Dvp-q_W7.js";import"./HvorLangPeriodeSteg-B4dci8tl.js";import"./PersonGroup-Mn4swOFe.js";import"./HvorMyeSteg-BtBIA0m7.js";import"./Wallet-C1ym7O54.js";import"./OmBarnetSteg-5YNleKu6.js";import"./TasklistStart-C0NezmDe.js";import"./OmPlanleggerenSteg-C_GxW8T4.js";import"./OppsummeringSteg-BlyelMvK.js";import"./ShareDataInfobox-4j81g57V.js";import"./useLagUttaksplanForslag-CevE0Fsd.js";import"./PlanenDeresSteg-B9B3RSQP.js";import"./OmÅTilpassePlanen-Dro239Xo.js";import"./PersonPregnant-Cl7nGAK6.js";import"./PencilWriting-CHOgskVP.js";import"./UforutsetteEndringer-DtUlPTx7.js";import"./ToggleGroup-B1BAsfds.js";import"./TilpassPlanenSteg-P35Y_mBb.js";import"./HvaErMulig-BrXrrpoQ.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
