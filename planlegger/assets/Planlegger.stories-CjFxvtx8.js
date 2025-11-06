import{w as c,j as o,r as l,E}from"./iframe-B50Cae9z.js";import{M as k,P as g}from"./usePlanleggerNavigator-DCXwG4ME.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DqDrL-gp.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BvnOrce_.js";import"./barnetUtils-Bxkg5ArW.js";import"./hvemHarRettUtils-D2yY4g-j.js";import"./satserUtils-BH0PXIeo.js";import"./ArbeidssituasjonSteg-CnHxpC3v.js";import"./BlueRadioGroup-Cuh9IMCO.js";import"./customErrorFormatter-CMOsrpa7.js";import"./PlanleggerStepPage-BuD5lLj8.js";import"./useScrollBehaviour-aOyZluAd.js";import"./Spacer-CXWXWCGK.js";import"./BarnehageplassSteg-CPwKxm6e.js";import"./uttakUtils-CnMMswRd.js";import"./BabyWrapped-Blu0oN9v.js";import"./Information-C1oh548T.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BWUCAnpP.js";import"./HvemPlanleggerSteg-Rx4LXE4x.js";import"./HvorLangPeriodeSteg-DYNnPUmQ.js";import"./PersonGroup-DQw69icz.js";import"./HvorMyeSteg-CfwZQ0j4.js";import"./Wallet-CIVSQc18.js";import"./OmBarnetSteg-VrPCgnSf.js";import"./TasklistStart-MVXpgyQ0.js";import"./OmPlanleggerenSteg-CVqxgQ2A.js";import"./OppsummeringSteg-DkX6DjAh.js";import"./ShareDataInfobox-Chq5UDqC.js";import"./CalendarLabels-CUTIy2ts.js";import"./CalendarIconLabel-CTOe6xf4.js";import"./FamiliehendelseLabel-Dwfrrt2P.js";import"./PlanenDeresSteg-Bbr2rRtA.js";import"./OmÅTilpassePlanen-CcWk5FYT.js";import"./PersonPregnant-xAvcWALG.js";import"./PencilWriting-DfUlBiZz.js";import"./UforutsetteEndringer-B47YEezS.js";import"./ToggleGroup-Dfk_r_fe.js";import"./TilpassPlanenSteg-B4ytoe4J.js";import"./HvaErMulig-d1izFTNR.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      } satisfies {
        '80': KontoBeregningDto_fpoversikt;
        '100': KontoBeregningDto_fpoversikt;
      }))]
    }
  }
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
