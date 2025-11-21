import{w as c,j as r,r as l,E}from"./iframe-1ZV8dGaw.js";import{M as g,P as R}from"./usePlanleggerNavigator-CJi9ht2g.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-C985Zohw.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-m94xhm0J.js";import"./barnetUtils-Bz_JKvQA.js";import"./hvemHarRettUtils-Cpk3yokq.js";import"./satserUtils-CGRUMMng.js";import"./ArbeidssituasjonSteg-CqwRdD5C.js";import"./BlueRadioGroup-CLG7oO9s.js";import"./customErrorFormatter-7Jcnh5io.js";import"./PlanleggerStepPage-0S5O3P5I.js";import"./useScrollBehaviour-_ClA7OUS.js";import"./BarnehageplassSteg-DjekeUdy.js";import"./uttakUtils-CsrH4dEO.js";import"./BabyWrapped-BpdFU2xp.js";import"./Information-DgRpJjbj.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Bby7rMqj.js";import"./HvemPlanleggerSteg-B3UD8M26.js";import"./HvorLangPeriodeSteg-BVMznUTh.js";import"./PersonGroup-CbATaaSN.js";import"./HvorMyeSteg-DkdDh_Ns.js";import"./Wallet-D7cN8wsR.js";import"./OmBarnetSteg-DhoZ3oV9.js";import"./TasklistStart-DpUcA5FF.js";import"./OmPlanleggerenSteg-UT04NYpA.js";import"./OppsummeringSteg-C9PAD0ha.js";import"./ShareDataInfobox-BRC9ddHY.js";import"./PlanenDeresSteg-Di_Hy5v4.js";import"./OmÅTilpassePlanen-CBM9-vJt.js";import"./PersonPregnant-DgaHWEc_.js";import"./PencilWriting-JcspiRdn.js";import"./UforutsetteEndringer-DruiJUkB.js";import"./ToggleGroup-DOnMMBP-.js";import"./TilpassPlanenSteg-XLp1RIZ5.js";import"./HvaErMulig-D5El4Ga8.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
