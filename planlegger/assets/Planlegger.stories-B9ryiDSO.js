import{w as c,j as r,r as l,E}from"./iframe-B3Mp_DS4.js";import{M as g,P as R}from"./usePlanleggerNavigator-CM9xs6UR.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-suMdv7f6.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-C7iQDjvq.js";import"./barnetUtils-CdOIaaSA.js";import"./hvemHarRettUtils-CtHttqq5.js";import"./satserUtils-BRJ1Jsxt.js";import"./ArbeidssituasjonSteg-BkLLgAmh.js";import"./BlueRadioGroup-BxaBi33G.js";import"./customErrorFormatter-Cc_SY2Be.js";import"./PlanleggerStepPage-DMgr4DEy.js";import"./useScrollBehaviour-DyiBnv40.js";import"./BarnehageplassSteg-D_k0qUx0.js";import"./uttakUtils-DLkO9m70.js";import"./BabyWrapped-CO9lKKyt.js";import"./Information-BO5nAgyJ.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-tkwgJIvw.js";import"./HvemPlanleggerSteg-C1wNm6ni.js";import"./HvorLangPeriodeSteg-CCebpoUl.js";import"./PersonGroup-BSPs8ifH.js";import"./HvorMyeSteg-Y0l7dQxu.js";import"./Wallet-BXcAVUQK.js";import"./OmBarnetSteg-DZnf62yW.js";import"./TasklistStart-BHhXqE9J.js";import"./OmPlanleggerenSteg-C_vAD3E3.js";import"./OppsummeringSteg-BOIvO1-L.js";import"./ShareDataInfobox-DXCobNWD.js";import"./PlanenDeresSteg-CQgsjNBW.js";import"./OmÅTilpassePlanen-bO1H8tBQ.js";import"./PersonPregnant-CmDHivop.js";import"./PencilWriting-B93y8BA7.js";import"./UforutsetteEndringer-DRTJy1vX.js";import"./ToggleGroup-adNdR_c0.js";import"./TilpassPlanenSteg-CDlEePdg.js";import"./HvaErMulig-B7atT8NS.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
