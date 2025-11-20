import{w as c,j as e,r as l,E}from"./iframe-CqpaHpsP.js";import{M as g,P as R}from"./usePlanleggerNavigator-CDYhMHvD.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CJjMSmpH.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CXeopcoj.js";import"./barnetUtils-Bq7xs2fP.js";import"./hvemHarRettUtils-DgvQDmo4.js";import"./satserUtils-CfYzQYrp.js";import"./ArbeidssituasjonSteg-BHlGCCOK.js";import"./BlueRadioGroup-D93UNGGy.js";import"./customErrorFormatter-CbimyLpv.js";import"./PlanleggerStepPage-DO4h1Bm6.js";import"./useScrollBehaviour-uDXFbdz0.js";import"./BarnehageplassSteg-DrlIntUn.js";import"./uttakUtils-pvxT4b3y.js";import"./BabyWrapped-C64QZ5Ax.js";import"./Information-BNMEtNBL.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-tkhdGhlP.js";import"./HvemPlanleggerSteg-70kaj_2u.js";import"./HvorLangPeriodeSteg-CEnGLjtD.js";import"./HvorMyeSteg-DTdhP75x.js";import"./Wallet-Bcl25vgj.js";import"./OmBarnetSteg-zph1k0dP.js";import"./TasklistStart-C3qyLyZ2.js";import"./OmPlanleggerenSteg-zwiCyhHI.js";import"./OppsummeringSteg-DKFwA4dU.js";import"./ShareDataInfobox-SxE7zIYr.js";import"./PlanenDeresSteg-B0eI4CS0.js";import"./OmÅTilpassePlanen-DOf0OmaM.js";import"./PersonPregnant-O_X3wLXj.js";import"./PencilWriting-C7Qq0ug-.js";import"./UforutsetteEndringer-C8uhJF-F.js";import"./ToggleGroup-CeARi0sb.js";import"./TilpassPlanenSteg-DrQpSmh3.js";import"./HvaErMulig-C8lMUz_U.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
