import{w as c,j as r,r as l,E}from"./iframe-Wty8Loba.js";import{M as g,P as R}from"./usePlanleggerNavigator-Lo8-lb1f.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Dt6s9993.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BMHW_fxe.js";import"./barnetUtils-B2gxGhQV.js";import"./hvemHarRettUtils-CHepebtj.js";import"./satserUtils-a0nJNTx6.js";import"./ArbeidssituasjonSteg-Dxw53sq0.js";import"./BlueRadioGroup-OwFSbaoH.js";import"./customErrorFormatter-2-33wFyv.js";import"./PlanleggerStepPage-Chug6eJN.js";import"./useScrollBehaviour-DkVOp9VI.js";import"./BarnehageplassSteg-DgIGiuU1.js";import"./uttakUtils-C6KPBSxo.js";import"./BabyWrapped-B16SS9iI.js";import"./Information-BnSm_tnD.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DT5IqVuM.js";import"./HvemPlanleggerSteg-BvwwTBYh.js";import"./HvorLangPeriodeSteg-CpeUphaS.js";import"./PersonGroup-DqALX9km.js";import"./HvorMyeSteg-DJI-SUAa.js";import"./Wallet-v4RHXCrr.js";import"./OmBarnetSteg-pcUGhRcb.js";import"./TasklistStart-UIXE7in4.js";import"./OmPlanleggerenSteg-C_xzFJk8.js";import"./OppsummeringSteg-Cis6J3m2.js";import"./ShareDataInfobox-BTnxpAus.js";import"./PlanenDeresSteg-De8ko1so.js";import"./OmÅTilpassePlanen-DtycBQBf.js";import"./PersonPregnant-By98u2lX.js";import"./PencilWriting-B2zZyBjy.js";import"./UforutsetteEndringer-CZ4RNmzM.js";import"./ToggleGroup-DYUjAPTW.js";import"./TilpassPlanenSteg-D3T1GRNU.js";import"./HvaErMulig-BpAQ-qYF.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
