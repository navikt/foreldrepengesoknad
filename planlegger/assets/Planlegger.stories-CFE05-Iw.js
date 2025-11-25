import{w as c,j as r,r as l,E}from"./iframe-Da6-FvV5.js";import{M as g,P as R}from"./usePlanleggerNavigator-UglliHKn.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-o-l7tyyh.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DdckuY2X.js";import"./barnetUtils-MnK7qRPc.js";import"./hvemHarRettUtils-Yrk7bZ8v.js";import"./satserUtils-k1Apl-wb.js";import"./ArbeidssituasjonSteg-CF2Oufz1.js";import"./BlueRadioGroup-C1-nKVb8.js";import"./customErrorFormatter-DtQIMVBg.js";import"./PlanleggerStepPage-BqQ9uC91.js";import"./useScrollBehaviour-CiEGESab.js";import"./BarnehageplassSteg-JgHod3fw.js";import"./uttakUtils-Dtz2ZsY1.js";import"./BabyWrapped-C0Iaknq1.js";import"./Information-DoukVNiP.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Czr0mlJS.js";import"./HvemPlanleggerSteg-CIlnlX6v.js";import"./HvorLangPeriodeSteg-DoWeBalb.js";import"./PersonGroup-BsSbdPao.js";import"./HvorMyeSteg-Dh6-dCPm.js";import"./Wallet-C1AsHztI.js";import"./OmBarnetSteg-BrVS5h2E.js";import"./TasklistStart-Cl0OA5Wc.js";import"./OmPlanleggerenSteg-DUPc729H.js";import"./OppsummeringSteg-Bi7Pynwl.js";import"./ShareDataInfobox-CA-P4cmY.js";import"./PlanenDeresSteg-B8-OKg7A.js";import"./OmÅTilpassePlanen-D9-z_NP5.js";import"./PersonPregnant-Dr-d2TkW.js";import"./PencilWriting-BnpKF8dC.js";import"./UforutsetteEndringer-3dlzwGNM.js";import"./ToggleGroup-MO7OWyEe.js";import"./TilpassPlanenSteg-CzUl-ODH.js";import"./HvaErMulig-B2F6CytE.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
