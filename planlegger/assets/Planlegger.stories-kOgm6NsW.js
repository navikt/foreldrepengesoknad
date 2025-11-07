import{w as c,j as o,r as l,E}from"./iframe-gHXU7Rrw.js";import{M as k,P as g}from"./usePlanleggerNavigator-CRGxsD_E.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BtSiXHTm.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CYYnqd9w.js";import"./barnetUtils-DhXUboP0.js";import"./hvemHarRettUtils-CaHg86U9.js";import"./satserUtils-4XgPU_mc.js";import"./ArbeidssituasjonSteg-T8OlmEwp.js";import"./BlueRadioGroup-6aMg9UiC.js";import"./customErrorFormatter-nvLzAQE3.js";import"./PlanleggerStepPage-B7Eleq4g.js";import"./useScrollBehaviour-CSDWWSTT.js";import"./Spacer-LdL95rx3.js";import"./BarnehageplassSteg-DHW4jAAH.js";import"./uttakUtils-CoTmKVrD.js";import"./BabyWrapped-CK86-sdZ.js";import"./Information-CgXf48ay.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-Cm5sFOxZ.js";import"./HvemPlanleggerSteg-BjK84k5-.js";import"./HvorLangPeriodeSteg-CpavuPMx.js";import"./PersonGroup-Cjd7DDXr.js";import"./HvorMyeSteg-BcwUYXU8.js";import"./Wallet-Nd69rnbp.js";import"./OmBarnetSteg-DJP-YNkj.js";import"./TasklistStart-DeIM6FK_.js";import"./OmPlanleggerenSteg-BBmOV1Hh.js";import"./OppsummeringSteg-uf5r1jzd.js";import"./ShareDataInfobox--wF8eMgL.js";import"./CalendarLabels-SBO2XzqK.js";import"./CalendarIconLabel-BIcZ-obr.js";import"./FamiliehendelseLabel-DUWj-Y18.js";import"./PlanenDeresSteg-DdPC24TP.js";import"./OmÅTilpassePlanen-CbY7ZZro.js";import"./PersonPregnant-LrJoHhcH.js";import"./PencilWriting-9R7dpB5V.js";import"./UforutsetteEndringer-CV3qrpsB.js";import"./ToggleGroup-B2NbykbW.js";import"./TilpassPlanenSteg-BR2oi6j3.js";import"./HvaErMulig-CjHNTARD.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
