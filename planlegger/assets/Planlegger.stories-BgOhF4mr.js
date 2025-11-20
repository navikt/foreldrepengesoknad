import{w as c,j as e,r as l,E}from"./iframe-ILT2IdEK.js";import{M as g,P as R}from"./usePlanleggerNavigator-Bvdwho5-.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CeEExwaW.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-JXcdgWVE.js";import"./barnetUtils-C4OcNDNV.js";import"./hvemHarRettUtils-CJmIV4x8.js";import"./satserUtils-B5eyDzCg.js";import"./ArbeidssituasjonSteg-BgozFA9k.js";import"./BlueRadioGroup-CP1y3UfE.js";import"./customErrorFormatter-CeiaqehV.js";import"./PlanleggerStepPage-BQ0M-YSv.js";import"./useScrollBehaviour-D-CqDtlp.js";import"./BarnehageplassSteg-Cu3zI3tE.js";import"./uttakUtils-DJUWjVOm.js";import"./BabyWrapped-Q8-Nb-5w.js";import"./Information-DDcn1BZ9.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-C1epNmyW.js";import"./HvemPlanleggerSteg-Dxpk7TrQ.js";import"./HvorLangPeriodeSteg-C6ev4zlN.js";import"./HvorMyeSteg-lBozqkiX.js";import"./Wallet-Bzs_ZdnY.js";import"./OmBarnetSteg-DgBhonOM.js";import"./TasklistStart-BBIr93vL.js";import"./OmPlanleggerenSteg-DirL9ZC7.js";import"./OppsummeringSteg-qpcpHSvo.js";import"./ShareDataInfobox-BklGTqAX.js";import"./PlanenDeresSteg-DN8IOGpz.js";import"./OmÅTilpassePlanen-BzH2Sp_J.js";import"./PersonPregnant-Bs_Oq4Lz.js";import"./PencilWriting-DwENNm8m.js";import"./UforutsetteEndringer-De_g1-5Q.js";import"./ToggleGroup-CrvwW-O_.js";import"./TilpassPlanenSteg-Bt_2m1dX.js";import"./HvaErMulig-DC4HMY3h.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
