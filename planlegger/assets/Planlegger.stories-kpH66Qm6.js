import{w as c,j as r,r as l,E}from"./iframe-DB7pqv55.js";import{M as g,P as R}from"./usePlanleggerNavigator-Cp5BkLC7.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-l4ib7rBh.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BbNdZgbe.js";import"./barnetUtils-ClIchO_2.js";import"./hvemHarRettUtils-BpexxDWu.js";import"./satserUtils-1JHaC4Vq.js";import"./ArbeidssituasjonSteg-BGfmE9vQ.js";import"./BlueRadioGroup-Cr0B_01m.js";import"./customErrorFormatter-Bt2tso4-.js";import"./PlanleggerStepPage-CDx2LBSi.js";import"./useScrollBehaviour-D7XLKSQH.js";import"./BarnehageplassSteg-aE3laNaH.js";import"./uttakUtils-VnuYaxZn.js";import"./BabyWrapped-C46adwpV.js";import"./Information-DP9NT-EC.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-u3Gx2fN6.js";import"./HvemPlanleggerSteg-DefNDdDh.js";import"./HvorLangPeriodeSteg-CwtQBN8Z.js";import"./PersonGroup-CfwxzXza.js";import"./HvorMyeSteg-CgIC7x8O.js";import"./Wallet-DI4p2iyn.js";import"./OmBarnetSteg-DUdPnHV7.js";import"./TasklistStart-C3HjDQCb.js";import"./OmPlanleggerenSteg-B3eF1oCC.js";import"./OppsummeringSteg-5UwF2_Iy.js";import"./ShareDataInfobox-6Ynn6jU9.js";import"./PlanenDeresSteg-uHOFWrEI.js";import"./OmÅTilpassePlanen-Dzr_wQ-l.js";import"./PersonPregnant-DwRFlKYn.js";import"./PencilWriting-CDmvf9m4.js";import"./UforutsetteEndringer-0MuL0RWE.js";import"./ToggleGroup-Brp9jRVA.js";import"./TilpassPlanenSteg-1tJ8C_Vx.js";import"./HvaErMulig-DJ7TsxIJ.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
