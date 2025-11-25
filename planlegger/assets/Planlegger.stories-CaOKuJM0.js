import{w as c,j as r,r as l,E}from"./iframe-CMkNJkSM.js";import{M as g,P as R}from"./usePlanleggerNavigator-CXMvQy56.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Bshv7Tc7.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DV_lwsOe.js";import"./barnetUtils-hPEuMOgy.js";import"./hvemHarRettUtils-_7btudWu.js";import"./satserUtils-DTQ0o_qo.js";import"./ArbeidssituasjonSteg-PSLNd0ys.js";import"./BlueRadioGroup-dZnyUSSW.js";import"./customErrorFormatter-Ei7JncCD.js";import"./PlanleggerStepPage-CDHghln3.js";import"./useScrollBehaviour-CsEp3Eta.js";import"./BarnehageplassSteg-CDTy5bo3.js";import"./uttakUtils-D3A5fW4W.js";import"./BabyWrapped-oD_DpOJZ.js";import"./Information-pNQcFuh9.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-vzOQiVv0.js";import"./HvemPlanleggerSteg-DJSmCF5B.js";import"./HvorLangPeriodeSteg-D0FNLrQK.js";import"./PersonGroup-BWq5zBqk.js";import"./HvorMyeSteg-pzuvsMqW.js";import"./Wallet-CebsnNnu.js";import"./OmBarnetSteg-CoNIl9m2.js";import"./TasklistStart-gUAtEs7f.js";import"./OmPlanleggerenSteg-DM0B8k94.js";import"./OppsummeringSteg-Dadn7c8C.js";import"./ShareDataInfobox-SDwWl3mg.js";import"./PlanenDeresSteg-CL5K4IZK.js";import"./OmÅTilpassePlanen-CBJnSEiM.js";import"./PersonPregnant-DpRaysCW.js";import"./PencilWriting-vV4sf9I7.js";import"./UforutsetteEndringer-BhDCrAXn.js";import"./ToggleGroup-BxFmoRNv.js";import"./TilpassPlanenSteg-COzYSqEf.js";import"./HvaErMulig-BoVumdKF.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
