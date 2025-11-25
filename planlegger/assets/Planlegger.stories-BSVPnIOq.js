import{w as c,j as r,r as l,E}from"./iframe-BKOeQY9w.js";import{M as g,P as R}from"./usePlanleggerNavigator-sV73MKLf.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-VO5Y5sH5.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B1_u_rPx.js";import"./barnetUtils-BOuxP2dR.js";import"./hvemHarRettUtils-C7CNjcnI.js";import"./satserUtils-Bp8BlPjU.js";import"./ArbeidssituasjonSteg-DNW3AEpR.js";import"./BlueRadioGroup-Do2ayQ_a.js";import"./customErrorFormatter-fsQ2CJXk.js";import"./PlanleggerStepPage-C7k_Gq1E.js";import"./useScrollBehaviour-oiz7ZCY8.js";import"./BarnehageplassSteg-Bkr5RriJ.js";import"./uttakUtils-BmPknzXZ.js";import"./BabyWrapped-DdQZmmNM.js";import"./Information-Cljo21_b.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BsVxj9E7.js";import"./HvemPlanleggerSteg-DdAhpXX1.js";import"./HvorLangPeriodeSteg-BHmB-dzx.js";import"./PersonGroup-D2_WCdH5.js";import"./HvorMyeSteg-D5Z1e5AW.js";import"./Wallet-BVJ5fd-L.js";import"./OmBarnetSteg-DfTWqNKx.js";import"./TasklistStart-BVdeUfXu.js";import"./OmPlanleggerenSteg-DRlkqqzf.js";import"./OppsummeringSteg-u2Q9bOul.js";import"./ShareDataInfobox-Bb8VRivH.js";import"./PlanenDeresSteg-DOXQZXQh.js";import"./OmÅTilpassePlanen-BBX5qV7K.js";import"./PersonPregnant-BH9cGwkm.js";import"./PencilWriting-DpB147iw.js";import"./UforutsetteEndringer-w3trASE9.js";import"./ToggleGroup-CyiVBNee.js";import"./TilpassPlanenSteg-CBjUJOKg.js";import"./HvaErMulig-CfVPvdWf.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
