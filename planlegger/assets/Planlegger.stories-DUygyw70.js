import{w as c,j as r,r as l,E}from"./iframe-Cn0_mrCM.js";import{M as g,P as R}from"./usePlanleggerNavigator-Ck5lm-kq.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BG9KpAm_.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-rIOVALoa.js";import"./barnetUtils-CpoUio30.js";import"./hvemHarRettUtils-XOBrJ1MW.js";import"./satserUtils-Dmq2jxhT.js";import"./ArbeidssituasjonSteg-Dg2hycej.js";import"./BlueRadioGroup-zCLozxWg.js";import"./customErrorFormatter-LMDAoLSK.js";import"./PlanleggerStepPage-CSkRwTaK.js";import"./useScrollBehaviour-BfGgoy88.js";import"./BarnehageplassSteg-d_HUPh_s.js";import"./uttakUtils-CCZZZ9mR.js";import"./BabyWrapped-Ct3bWOTv.js";import"./Information-BX6WhX4m.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DLi5jUYQ.js";import"./HvemPlanleggerSteg-Ctdl2Pxo.js";import"./HvorLangPeriodeSteg-CXEhD_H5.js";import"./PersonGroup-lUk9cr0k.js";import"./HvorMyeSteg-DvcocM6N.js";import"./Wallet-DUpIoyoU.js";import"./OmBarnetSteg-BAotxHRF.js";import"./TasklistStart-jerI9zV3.js";import"./OmPlanleggerenSteg-H8LIZzfE.js";import"./OppsummeringSteg-CyaP0-hW.js";import"./ShareDataInfobox-Ce6lKYx6.js";import"./PlanenDeresSteg-CJnsDZRg.js";import"./OmÅTilpassePlanen-D2lf5Qup.js";import"./PersonPregnant-CkDDY1iU.js";import"./PencilWriting-CLri8V-B.js";import"./UforutsetteEndringer-C7uMrOTj.js";import"./ToggleGroup-Bvy7b-4O.js";import"./TilpassPlanenSteg-p-l2XrlO.js";import"./HvaErMulig-DIgl_q5E.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
