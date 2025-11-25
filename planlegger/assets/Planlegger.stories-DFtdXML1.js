import{w as c,j as r,r as l,E}from"./iframe-D_mF4ixZ.js";import{M as g,P as R}from"./usePlanleggerNavigator-CZgRicc3.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DAOc816H.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-KcSvFOwB.js";import"./barnetUtils-CQJzc-tr.js";import"./hvemHarRettUtils-DgvDZ5Ck.js";import"./satserUtils-DzcQYHom.js";import"./ArbeidssituasjonSteg-BNmGbaT9.js";import"./BlueRadioGroup-CEXoMbcm.js";import"./customErrorFormatter-CkAQo_5w.js";import"./PlanleggerStepPage-CsSRN1bD.js";import"./useScrollBehaviour-Bpm_s4AK.js";import"./BarnehageplassSteg-Bu8VTIid.js";import"./uttakUtils-1pxWXfBj.js";import"./BabyWrapped-HqNVemH3.js";import"./Information-D3-TiJMG.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DV2gz71S.js";import"./HvemPlanleggerSteg-CQAOYWy5.js";import"./HvorLangPeriodeSteg-BRPz0Q6r.js";import"./PersonGroup-B1C5uW8k.js";import"./HvorMyeSteg-DsA7HUhu.js";import"./Wallet-gk9U7Mxg.js";import"./OmBarnetSteg-BYKUcZuM.js";import"./TasklistStart-G1JWbp2F.js";import"./OmPlanleggerenSteg-mHCGYsOx.js";import"./OppsummeringSteg-CW73OaEg.js";import"./ShareDataInfobox-Cjpxyeyp.js";import"./PlanenDeresSteg-B0paYnNC.js";import"./OmÅTilpassePlanen-OJR3jBP1.js";import"./PersonPregnant-BL0KRYwV.js";import"./PencilWriting-UcTEN0V0.js";import"./UforutsetteEndringer-Bde_yaQH.js";import"./ToggleGroup-BZOdF3x1.js";import"./TilpassPlanenSteg-DYSyOsHo.js";import"./HvaErMulig-BLpXN0lb.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
