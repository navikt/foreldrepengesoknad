import{w as c,j as r,r as l,E}from"./iframe-DdOPkLQ9.js";import{M as g,P as R}from"./usePlanleggerNavigator-BuFYCHZh.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Wy6hizqD.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BKRaMCFP.js";import"./barnetUtils-wHxIMM4c.js";import"./hvemHarRettUtils-s0UiSp0W.js";import"./satserUtils-SQscTTak.js";import"./ArbeidssituasjonSteg-CYzZ_-SH.js";import"./BlueRadioGroup-DREGzNt2.js";import"./customErrorFormatter-BPCGT_C7.js";import"./PlanleggerStepPage-CvkNy1WE.js";import"./useScrollBehaviour-BvoOoGD9.js";import"./BarnehageplassSteg-Bdn7ZwoA.js";import"./uttakUtils-mc39f1jw.js";import"./BabyWrapped-_CkDL0a4.js";import"./Information-BhP3CCki.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-D1MoArrn.js";import"./HvemPlanleggerSteg-CI7eQgxt.js";import"./HvorLangPeriodeSteg-DO18xDzW.js";import"./PersonGroup-Cq1KZp4n.js";import"./HvorMyeSteg-BJ_qrSd6.js";import"./Wallet-PKec16iJ.js";import"./OmBarnetSteg-JleP9iFA.js";import"./TasklistStart-CN6esWw5.js";import"./OmPlanleggerenSteg-CJcn3Z5w.js";import"./OppsummeringSteg-D8SL8Zo8.js";import"./ShareDataInfobox-pfUL__6H.js";import"./PlanenDeresSteg-67Mv2gst.js";import"./OmÅTilpassePlanen-BJknpvLU.js";import"./PersonPregnant-CZTXin6n.js";import"./PencilWriting-DBoSAvJc.js";import"./UforutsetteEndringer-B30hWrxX.js";import"./ToggleGroup-DiQvfbag.js";import"./TilpassPlanenSteg-C3r2FuGn.js";import"./HvaErMulig-WheYfZ_s.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
