import{w as c,j as o,r as l,E}from"./iframe-DBjg2Hvv.js";import{M as k,P as g}from"./usePlanleggerNavigator-BO_6n8ry.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CF9bzEzt.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CXlZG0hM.js";import"./barnetUtils-DzknqKCS.js";import"./hvemHarRettUtils-8hfbsuHq.js";import"./satserUtils-CJjUcVSH.js";import"./ArbeidssituasjonSteg-Bq6hPJzi.js";import"./BlueRadioGroup-CBas3Yzt.js";import"./customErrorFormatter-hVpBIE03.js";import"./PlanleggerStepPage-BnLoL_UU.js";import"./useScrollBehaviour-CPEAqzoR.js";import"./Spacer-D_uyYVPo.js";import"./BarnehageplassSteg-CpqL3cMs.js";import"./uttakUtils-d-UAWvve.js";import"./BabyWrapped-CiN5_j2e.js";import"./Information-BPNZGke0.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-B_z_cXX1.js";import"./HvemPlanleggerSteg-D_8SnPVj.js";import"./HvorLangPeriodeSteg-Cs9g8xqS.js";import"./PersonGroup-DH_MMBs2.js";import"./HvorMyeSteg-BpCXNSux.js";import"./Wallet-GIR27Akt.js";import"./OmBarnetSteg-BygFrDGu.js";import"./TasklistStart-1S8hrdEi.js";import"./OmPlanleggerenSteg-CY3zksL-.js";import"./OppsummeringSteg-H2OtgZD-.js";import"./ShareDataInfobox-xd0gJAXP.js";import"./CalendarLabels-DHWUW4IR.js";import"./CalendarIconLabel-BEK4DFkJ.js";import"./FamiliehendelseLabel-CRqLJ-pV.js";import"./PlanenDeresSteg-CjyGMKXF.js";import"./OmÅTilpassePlanen-DKwoWkiv.js";import"./PersonPregnant-BTIXd91m.js";import"./PencilWriting-QviO6CCL.js";import"./UforutsetteEndringer-DV5ysybl.js";import"./ToggleGroup-ANigO_jg.js";import"./TilpassPlanenSteg-D9ThUDpy.js";import"./HvaErMulig-BwaaEjNM.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      } satisfies {
        '80': KontoBeregningDto_fpoversikt;
        '100': KontoBeregningDto_fpoversikt;
      }))]
    }
  }
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
