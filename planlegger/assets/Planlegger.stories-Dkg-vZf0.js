import{w as c,j as r,r as l,E}from"./iframe-CMC7Xe2P.js";import{M as g,P as R}from"./usePlanleggerNavigator-CfaTeEcN.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CPoaSc-h.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CfBsuVkw.js";import"./barnetUtils-AHOf_QLU.js";import"./hvemHarRettUtils-WquL6pme.js";import"./satserUtils-CltFdgA3.js";import"./ArbeidssituasjonSteg-hT_gmwCz.js";import"./BlueRadioGroup-D5AluL2M.js";import"./customErrorFormatter-Cn9R71hj.js";import"./PlanleggerStepPage-DHmB47hl.js";import"./useScrollBehaviour-CjUdYfh-.js";import"./BarnehageplassSteg-DqBstU6i.js";import"./uttakUtils-BBoEUoe-.js";import"./BabyWrapped-Bi-Ihvcq.js";import"./Information-a2rXBHVr.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CfYnxoYH.js";import"./HvemPlanleggerSteg-Do372Gdb.js";import"./HvorLangPeriodeSteg-CQ_9ELDF.js";import"./PersonGroup-DAGyU4Yh.js";import"./HvorMyeSteg-BQxo3prt.js";import"./Wallet-Dlok2SiK.js";import"./OmBarnetSteg-BInjY-IJ.js";import"./TasklistStart-DhQwugQz.js";import"./OmPlanleggerenSteg-Br6AOWmQ.js";import"./OppsummeringSteg-Cuc9TwVI.js";import"./ShareDataInfobox-DLlfjG5z.js";import"./PlanenDeresSteg-5DPHK1eM.js";import"./OmÅTilpassePlanen-DngUUUsx.js";import"./PersonPregnant-DxOTNori.js";import"./PencilWriting-q71AZl7O.js";import"./UforutsetteEndringer-Cmw8180T.js";import"./ToggleGroup-Cb9u9DDL.js";import"./TilpassPlanenSteg-Dxmxn0ue.js";import"./HvaErMulig-CMpNn4wO.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
