import{w as c,j as r,r as l,E}from"./iframe-DR_yTEQ2.js";import{M as g,P as R}from"./usePlanleggerNavigator-DWUOwdmn.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CDPtuAzI.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-l8npJuzn.js";import"./barnetUtils-Bs42bmr7.js";import"./hvemHarRettUtils-qloti3_b.js";import"./satserUtils-AGsKM-Dl.js";import"./ArbeidssituasjonSteg-CYvAD2op.js";import"./BlueRadioGroup-3Wq5XYg4.js";import"./customErrorFormatter-u3RWS8jf.js";import"./PlanleggerStepPage-DbjmFHsl.js";import"./useScrollBehaviour-Cgp3rorI.js";import"./BarnehageplassSteg-Pw82Dk39.js";import"./uttakUtils-CqMuu9lD.js";import"./BabyWrapped-Cl19KcSC.js";import"./Information-DhWhGotA.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-C3pZs1jW.js";import"./HvemPlanleggerSteg-Ca_oE5hK.js";import"./HvorLangPeriodeSteg-DzkMaCQk.js";import"./PersonGroup-BWDgD8ux.js";import"./HvorMyeSteg-D3_Qp2c4.js";import"./Wallet-H6praxef.js";import"./OmBarnetSteg-FCHvTBCN.js";import"./TasklistStart-DERmyBGC.js";import"./OmPlanleggerenSteg-zud3c8Ad.js";import"./OppsummeringSteg-L391wfMP.js";import"./ShareDataInfobox-CCC09vFU.js";import"./PlanenDeresSteg-Bt9_wzMi.js";import"./OmÅTilpassePlanen-DQD9Zm_l.js";import"./PersonPregnant-Jxj1n8yR.js";import"./PencilWriting-YR5NYrNx.js";import"./UforutsetteEndringer-B422KPGi.js";import"./ToggleGroup-D20vMHYY.js";import"./TilpassPlanenSteg-Bt-9F7JX.js";import"./HvaErMulig-Q4eMQpe-.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
