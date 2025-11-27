import{w as c,j as r,r as l,E}from"./iframe-Bw72fHOg.js";import{M as g,P as R}from"./usePlanleggerNavigator-DWqvmVwd.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CsIqMmU7.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B7YAeihx.js";import"./barnetUtils-CuzM9yC2.js";import"./hvemHarRettUtils-g2ppHgr7.js";import"./satserUtils-PqJJenuN.js";import"./ArbeidssituasjonSteg-CTNiXKE7.js";import"./BlueRadioGroup-BQ29ruMe.js";import"./customErrorFormatter-BS167-RK.js";import"./PlanleggerStepPage-NOssewOn.js";import"./useScrollBehaviour--zi0LlKb.js";import"./BarnehageplassSteg-B9Fmt_lv.js";import"./uttakUtils-FQLsKS5I.js";import"./BabyWrapped-Dg20LoYA.js";import"./Information-Bm55K9GD.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-a2xvCnVX.js";import"./HvemPlanleggerSteg-CLu707zb.js";import"./HvorLangPeriodeSteg-22Kvyr8V.js";import"./PersonGroup-CKgBfp1Y.js";import"./HvorMyeSteg-kCKxgDOZ.js";import"./Wallet-B4c0WJLf.js";import"./OmBarnetSteg-nGxPmHCp.js";import"./TasklistStart-BldO70N-.js";import"./OmPlanleggerenSteg-Unu9Lu5J.js";import"./OppsummeringSteg-BQsDLNKk.js";import"./ShareDataInfobox-DlsDjqlV.js";import"./useLagUttaksplanForslag-D5mnDL6b.js";import"./PlanenDeresSteg-C2XIAKp6.js";import"./OmÅTilpassePlanen-DymrFCBQ.js";import"./PersonPregnant-CxnO44WF.js";import"./PencilWriting-D_K-qMMZ.js";import"./UforutsetteEndringer-SER_CW1r.js";import"./ToggleGroup-DAhrAQWB.js";import"./TilpassPlanenSteg-gPnNJVFH.js";import"./HvaErMulig-CSH01wC4.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
