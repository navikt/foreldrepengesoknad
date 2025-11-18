import{w as c,j as e,r as l,E}from"./iframe-C4-wFx7X.js";import{M as g,P as R}from"./usePlanleggerNavigator-Cmmid0J0.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-8IduTPVF.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-NruZEeUK.js";import"./barnetUtils-DVHArMEa.js";import"./hvemHarRettUtils-F0sYhsvg.js";import"./satserUtils-9Cfm1G92.js";import"./ArbeidssituasjonSteg-CDP-qOT4.js";import"./BlueRadioGroup-C1NOTDK3.js";import"./customErrorFormatter-DW4CPBcw.js";import"./PlanleggerStepPage-CRwkesOD.js";import"./useScrollBehaviour-D9hNALVf.js";import"./BarnehageplassSteg-DNhh9yKl.js";import"./uttakUtils-82AuU3ry.js";import"./BabyWrapped-0De3K0-7.js";import"./Information-Crrqv3Q6.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BRlqoAFy.js";import"./HvemPlanleggerSteg-BNeq4AxM.js";import"./HvorLangPeriodeSteg-BTJOprET.js";import"./HvorMyeSteg-VZHVLHke.js";import"./Wallet-CK6CYZzs.js";import"./OmBarnetSteg-DvmRjjjz.js";import"./TasklistStart-C0_fTJXu.js";import"./OmPlanleggerenSteg-C1j3vVFy.js";import"./OppsummeringSteg-F_zJ4p8v.js";import"./ShareDataInfobox-B-6p4O7S.js";import"./PlanenDeresSteg-Vp8v_LW4.js";import"./OmÅTilpassePlanen-Dz6gK0qN.js";import"./PersonPregnant-CMHPeBOm.js";import"./PencilWriting-CDeL9agM.js";import"./UforutsetteEndringer-Bb50f7na.js";import"./ToggleGroup-Cx0xAcS2.js";import"./TilpassPlanenSteg-J66kXX40.js";import"./HvaErMulig-pWFPVZb8.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
