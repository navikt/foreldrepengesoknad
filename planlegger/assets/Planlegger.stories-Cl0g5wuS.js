import{w as c,j as r,r as l,E}from"./iframe-B7QlyDym.js";import{M as g,P as R}from"./usePlanleggerNavigator-StAAspj_.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Hj3E5fUe.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BmZBdrmg.js";import"./barnetUtils-DEqj_PmB.js";import"./hvemHarRettUtils-5jma13Y8.js";import"./satserUtils-D99iadeS.js";import"./ArbeidssituasjonSteg-DVIG_MWc.js";import"./BlueRadioGroup-BBCK9J8C.js";import"./customErrorFormatter-CDEIY-7g.js";import"./PlanleggerStepPage-DfkFDCca.js";import"./useScrollBehaviour-CAzPxzbo.js";import"./BarnehageplassSteg-DlRsyjrC.js";import"./uttakUtils-C6m8LmNr.js";import"./BabyWrapped-B6MTLuYM.js";import"./Information-CQMiw5qc.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CIQl4oKs.js";import"./HvemPlanleggerSteg-CXeNKm1L.js";import"./HvorLangPeriodeSteg-B8DQui1n.js";import"./PersonGroup-BeU19sPw.js";import"./HvorMyeSteg-DdAuUkEz.js";import"./Wallet-Dkos_fHF.js";import"./OmBarnetSteg-OmFSHNzu.js";import"./TasklistStart-DDyBeUEB.js";import"./OmPlanleggerenSteg-8wRBweCf.js";import"./OppsummeringSteg-_6eopK1V.js";import"./ShareDataInfobox-CI7Rtidx.js";import"./PlanenDeresSteg-DVFFY4K1.js";import"./OmÅTilpassePlanen-BABjPi6A.js";import"./PersonPregnant-HLUAnw-y.js";import"./PencilWriting-BEhazhFX.js";import"./UforutsetteEndringer-CSsu6_zC.js";import"./ToggleGroup-D7tUt1fa.js";import"./TilpassPlanenSteg-C27x2Ef6.js";import"./HvaErMulig-DbFW4QZn.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
