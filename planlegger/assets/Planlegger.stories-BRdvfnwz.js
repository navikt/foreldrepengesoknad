import{w as c,j as r,r as l,E}from"./iframe-DWRt5Mwh.js";import{M as g,P as R}from"./usePlanleggerNavigator-K7DBivIy.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DlugALmY.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-V4dcRfe4.js";import"./barnetUtils-D0xow1gw.js";import"./hvemHarRettUtils-B36-QIYy.js";import"./satserUtils-CWcFcrpQ.js";import"./ArbeidssituasjonSteg-DJwQs1Cp.js";import"./BlueRadioGroup-BaylLvW0.js";import"./customErrorFormatter-CJIfMypA.js";import"./PlanleggerStepPage-CPbGdMX9.js";import"./useScrollBehaviour-CmxFSpyq.js";import"./BarnehageplassSteg-dLPiUOr5.js";import"./uttakUtils-DR1JzcqK.js";import"./BabyWrapped-D2ozno7K.js";import"./Information-zDlL7jQz.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BEaNx2OQ.js";import"./HvemPlanleggerSteg-BtFX0T9J.js";import"./HvorLangPeriodeSteg-7J2oHlnS.js";import"./PersonGroup-DYXWCcrK.js";import"./HvorMyeSteg-C-R6UF6S.js";import"./Wallet-FDbRWaAz.js";import"./OmBarnetSteg-Bpln14y0.js";import"./TasklistStart-DPXmvFJV.js";import"./OmPlanleggerenSteg-C2ds9pSS.js";import"./OppsummeringSteg-Daox0WnQ.js";import"./ShareDataInfobox-zYecIHyG.js";import"./useLagUttaksplanForslag-fNd6YHU0.js";import"./PlanenDeresSteg-CU4MOvf1.js";import"./OmÅTilpassePlanen-lkpJxU5W.js";import"./PersonPregnant-BKEg7QaM.js";import"./PencilWriting-DnDwgD5S.js";import"./UforutsetteEndringer-a50Lbpcu.js";import"./ToggleGroup-CVUqs4hP.js";import"./TilpassPlanenSteg-CqOrXQ9Z.js";import"./HvaErMulig-D9f_-ApT.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
