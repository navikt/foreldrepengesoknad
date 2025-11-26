import{w as c,j as r,r as l,E}from"./iframe-CND7gvRZ.js";import{M as g,P as R}from"./usePlanleggerNavigator-DBwyAt0R.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Ikfz0D8E.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B-dYRwNG.js";import"./barnetUtils-Bq0oj4K9.js";import"./hvemHarRettUtils-DVJrUW0J.js";import"./satserUtils-YDk6jGof.js";import"./ArbeidssituasjonSteg-gxdODCPi.js";import"./BlueRadioGroup-Cvu6mS6v.js";import"./customErrorFormatter-XtopXd6H.js";import"./PlanleggerStepPage-4FHb2hPs.js";import"./useScrollBehaviour-DgQAVS0g.js";import"./BarnehageplassSteg-DT7vbJ7R.js";import"./uttakUtils-r-BPWPam.js";import"./BabyWrapped-Dd4m86QN.js";import"./Information-dYJK-efX.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BdIu_goa.js";import"./HvemPlanleggerSteg-C-Ouhi1T.js";import"./HvorLangPeriodeSteg-D2OPF3aS.js";import"./PersonGroup-VF8Mxynd.js";import"./HvorMyeSteg-D3_3XKdj.js";import"./Wallet-BiVAabFm.js";import"./OmBarnetSteg-B6c2q3N5.js";import"./TasklistStart-BFjfj-qP.js";import"./OmPlanleggerenSteg-Czy2oxNz.js";import"./OppsummeringSteg-CwO4BRmY.js";import"./ShareDataInfobox-D6IVVP0A.js";import"./PlanenDeresSteg--Xrhg92q.js";import"./OmÅTilpassePlanen-DJt-SyM7.js";import"./PersonPregnant-lV0o0KKh.js";import"./PencilWriting-BJoevShj.js";import"./UforutsetteEndringer-DQ17ByW0.js";import"./ToggleGroup-BQpQh3Ub.js";import"./TilpassPlanenSteg-Be4X-1XB.js";import"./HvaErMulig-CJ5Tq1JF.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
