import{w as c,j as e,r as l,E}from"./iframe-DtAtaVjt.js";import{M as g,P as R}from"./usePlanleggerNavigator-BPGMgF0r.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BxFdFril.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-a6Dsmy6_.js";import"./barnetUtils-DiitruI_.js";import"./hvemHarRettUtils-gdWc9cLl.js";import"./satserUtils-Bi9Bigzw.js";import"./ArbeidssituasjonSteg-1e0Bh3UP.js";import"./BlueRadioGroup-GSFxnQ4r.js";import"./customErrorFormatter-eBJ4654G.js";import"./PlanleggerStepPage-3pAPG4bi.js";import"./useScrollBehaviour--0STkOdF.js";import"./BarnehageplassSteg-DqEXGQA2.js";import"./uttakUtils-CdUIao7H.js";import"./BabyWrapped-CY05zauh.js";import"./Information-B6yqNi-L.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-D5kD7uaZ.js";import"./HvemPlanleggerSteg-BbzsCuib.js";import"./HvorLangPeriodeSteg-rrbEHoKy.js";import"./HvorMyeSteg-CIpqyDSq.js";import"./Wallet-B9wjdthi.js";import"./OmBarnetSteg-Cq3yLKrN.js";import"./TasklistStart-BuNb_RNj.js";import"./OmPlanleggerenSteg-BVDycJEm.js";import"./OppsummeringSteg-DU2mgBJB.js";import"./ShareDataInfobox-BrD3bUc7.js";import"./PlanenDeresSteg-DWLrv_Vn.js";import"./OmÅTilpassePlanen-D-kIMhjR.js";import"./PersonPregnant-CZ0VSVFi.js";import"./PencilWriting-a3QROGVm.js";import"./UforutsetteEndringer-Chy-CIxz.js";import"./ToggleGroup-BiEhpzy6.js";import"./TilpassPlanenSteg-B7BJj0rr.js";import"./HvaErMulig-CjSgLn-U.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ot=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,ot as __namedExportsOrder,rt as default};
