import{w as c,j as e,r as l,E}from"./iframe-BZ_BZSCi.js";import{M as g,P as R}from"./usePlanleggerNavigator-DMgB3-HN.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-xXQ4nHmR.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-B7MtmgTR.js";import"./barnetUtils-yxzrrtXM.js";import"./hvemHarRettUtils-DjNPMg9C.js";import"./satserUtils-7KB_U2Hh.js";import"./ArbeidssituasjonSteg-y4L7Qcaj.js";import"./BlueRadioGroup-e2kVXbqR.js";import"./customErrorFormatter-Dfrx3qLP.js";import"./PlanleggerStepPage-CecxoCRI.js";import"./useScrollBehaviour-CBLQvq6E.js";import"./BarnehageplassSteg-DpaUG_sT.js";import"./uttakUtils-DeVRp-VM.js";import"./BabyWrapped-C5M7_6LX.js";import"./Information-CISaG-xE.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BqLY-dHi.js";import"./HvemPlanleggerSteg-DD_vZtco.js";import"./HvorLangPeriodeSteg-BhtNv9_X.js";import"./HvorMyeSteg-DkcmxWZw.js";import"./Wallet-DLasrekX.js";import"./OmBarnetSteg-D_37QwfE.js";import"./TasklistStart-BrP20KYB.js";import"./OmPlanleggerenSteg-fiZYmH6D.js";import"./OppsummeringSteg-tSlBQ7cS.js";import"./ShareDataInfobox-B3HOlIYM.js";import"./PlanenDeresSteg-BA0x9Ivq.js";import"./OmÅTilpassePlanen-DZUG0K1t.js";import"./PersonPregnant-C0EDg_fW.js";import"./PencilWriting-Y-AMFXHp.js";import"./UforutsetteEndringer-CTJOuYHY.js";import"./ToggleGroup-BSlWIhN4.js";import"./TilpassPlanenSteg-Dbvr7A4r.js";import"./HvaErMulig-CKoHdLT8.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
