import{w as c,j as e,r as l,E}from"./iframe-DbyDkS-h.js";import{M as g,P as R}from"./usePlanleggerNavigator-B4v1Xm5C.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CpmVil2I.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-qNqvCx9W.js";import"./barnetUtils-gawtI8Fg.js";import"./hvemHarRettUtils-BtePtPzh.js";import"./satserUtils-C3XHxkEU.js";import"./ArbeidssituasjonSteg-Bv1PQWae.js";import"./BlueRadioGroup-DTvfnxJU.js";import"./customErrorFormatter-BFlwoTBh.js";import"./PlanleggerStepPage-BR87OOj5.js";import"./useScrollBehaviour-Bd90G6Bk.js";import"./BarnehageplassSteg-CG9up5fA.js";import"./uttakUtils-BHmWdwGw.js";import"./BabyWrapped-D2KFgbvE.js";import"./Information-D1LbN3s5.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-B_C8jsQO.js";import"./HvemPlanleggerSteg-BRh4N1k6.js";import"./HvorLangPeriodeSteg-BaHyXcFC.js";import"./HvorMyeSteg-BcDLWxaI.js";import"./Wallet-VVCuAlcQ.js";import"./OmBarnetSteg-aja1Enee.js";import"./TasklistStart-CZpI4WTD.js";import"./OmPlanleggerenSteg-5_QYNmUJ.js";import"./OppsummeringSteg-B6Acwanl.js";import"./ShareDataInfobox-Bvk7LL-D.js";import"./PlanenDeresSteg-avmEbrBp.js";import"./OmÅTilpassePlanen-DExZfJBt.js";import"./PersonPregnant-BpYmkQsD.js";import"./PencilWriting-Db1rFwmX.js";import"./UforutsetteEndringer-4B4HTTl6.js";import"./ToggleGroup-tCvVfKM3.js";import"./TilpassPlanenSteg-LPS6sGyp.js";import"./HvaErMulig-DnLBWlDY.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
