import{w as c,j as o,r as l,E}from"./iframe-XGK4EWHO.js";import{M as k,P as g}from"./usePlanleggerNavigator-D5BlZ87I.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DQRFS42_.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Bb38QmLx.js";import"./barnetUtils-Be6XyooX.js";import"./hvemHarRettUtils-B4mbOgxC.js";import"./satserUtils-aluCH22s.js";import"./ArbeidssituasjonSteg-D45snh8W.js";import"./BlueRadioGroup-BjN0quEc.js";import"./customErrorFormatter-Cyu_OsUm.js";import"./PlanleggerStepPage-DcZC-mzf.js";import"./useScrollBehaviour-5MXSj2uO.js";import"./Spacer-0Tk3fNS1.js";import"./BarnehageplassSteg-CZrDknfW.js";import"./uttakUtils-LkQAyLc0.js";import"./BabyWrapped-C2oqtKSi.js";import"./Information-D_uyVbYK.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-C0cXBEJ4.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BKggNHcK.js";import"./HvorLangPeriodeSteg-DRwl_quN.js";import"./PersonGroup-BpuZnAWh.js";import"./HvorMyeSteg-D6yL1Hwv.js";import"./Wallet-D9cuvnK9.js";import"./OmBarnetSteg-C9v9Ghkn.js";import"./TasklistStart-CeldiAj2.js";import"./OmPlanleggerenSteg-COGEt2fn.js";import"./OppsummeringSteg-DT9jntDI.js";import"./ShareDataInfobox-JcRadUAO.js";import"./CalendarLabels-CIgyajHS.js";import"./CalendarIconLabel-DozuJo-B.js";import"./FamiliehendelseLabel-oxS_S95Z.js";import"./PlanenDeresSteg-BwDjLvYG.js";import"./OmÅTilpassePlanen-CGHN4iQz.js";import"./PersonPregnant-D0Y_dTEo.js";import"./PencilWriting-BvjF1XBC.js";import"./UforutsetteEndringer-rq_EDUeL.js";import"./ToggleGroup-HCVX1w3x.js";import"./TilpassPlanenSteg-DaM53to8.js";import"./HvaErMulig-Ct3AWKk-.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
