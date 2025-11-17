import{w as c,j as e,r as l,E}from"./iframe-B-YLx0WR.js";import{M as g,P as R}from"./usePlanleggerNavigator-BvhKiUhp.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Cv4ZVjP5.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DGGO8TtG.js";import"./barnetUtils-C_pyBIgu.js";import"./hvemHarRettUtils-COkJyK59.js";import"./satserUtils-CDhM9ii0.js";import"./ArbeidssituasjonSteg-KgEcsEF2.js";import"./BlueRadioGroup-ChK10ZFG.js";import"./customErrorFormatter-BwWh8acr.js";import"./PlanleggerStepPage-B_fLIpZt.js";import"./useScrollBehaviour-brqN7wxf.js";import"./BarnehageplassSteg-C3AZ1iU6.js";import"./uttakUtils-dPYf_eYs.js";import"./BabyWrapped-D0wfig_i.js";import"./Information-bGbMqaHL.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-Brp0snhu.js";import"./HvemPlanleggerSteg-B5KG2ndA.js";import"./HvorLangPeriodeSteg-DFy-j-zf.js";import"./HvorMyeSteg-2f3z5-dR.js";import"./Wallet-1_XQ_k9e.js";import"./OmBarnetSteg-DZFym5wW.js";import"./TasklistStart-Dj3jxh_Z.js";import"./OmPlanleggerenSteg-CuPhUekn.js";import"./OppsummeringSteg-CfVtAPyY.js";import"./ShareDataInfobox-BcBx7Ok2.js";import"./PlanenDeresSteg-CtNfbu7j.js";import"./OmÅTilpassePlanen-CRzRxJri.js";import"./PersonPregnant-N57H2hDj.js";import"./PencilWriting-Des_m_4b.js";import"./UforutsetteEndringer-BNH4faI-.js";import"./ToggleGroup-DXmdV7EV.js";import"./TilpassPlanenSteg-BT9-R89N.js";import"./HvaErMulig-BAWNY8O9.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
