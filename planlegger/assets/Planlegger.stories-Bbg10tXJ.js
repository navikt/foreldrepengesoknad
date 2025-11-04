import{w as c,j as o,r as l,E}from"./iframe-5Q6VtAAo.js";import{M as k,P as g}from"./usePlanleggerNavigator-DjkwqAs9.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CLtWG0wR.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BaS1So_L.js";import"./barnetUtils-ThyT0CXo.js";import"./hvemHarRettUtils-CUAmVeYH.js";import"./satserUtils-BT2J8iIT.js";import"./ArbeidssituasjonSteg-BLlCVGWy.js";import"./BlueRadioGroup-CQHpv_Yt.js";import"./customErrorFormatter-Bfkcc01J.js";import"./PlanleggerStepPage-gNQM08EE.js";import"./useScrollBehaviour-BSDSqwOQ.js";import"./Spacer-BdFY-L4H.js";import"./BarnehageplassSteg-C32wrCN7.js";import"./uttakUtils-CZb5oOvv.js";import"./BabyWrapped-66-tChvS.js";import"./Information-LVQNkxDb.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-DsR0cP9z.js";import"./HvemPlanleggerSteg-h3zDM20E.js";import"./HvorLangPeriodeSteg-BuDc0g2n.js";import"./PersonGroup-BELxf0j6.js";import"./HvorMyeSteg-Dmi471I9.js";import"./Wallet-BZ2ix2Hr.js";import"./OmBarnetSteg-DOjJgkpG.js";import"./TasklistStart-ByVg2wLj.js";import"./OmPlanleggerenSteg-P43vjvJv.js";import"./OppsummeringSteg-CRXt56Yd.js";import"./ShareDataInfobox-Bu6WJ3tt.js";import"./CalendarLabels-DAPl7qwA.js";import"./CalendarIconLabel-KDBiThF6.js";import"./FamiliehendelseLabel-jtGM4AsO.js";import"./PlanenDeresSteg-C26MFpyq.js";import"./OmÅTilpassePlanen-CofpBrHe.js";import"./PersonPregnant-BbRBTz8i.js";import"./PencilWriting-CsrUfa8A.js";import"./UforutsetteEndringer-B-7eCCeW.js";import"./ToggleGroup-D6TuR9ft.js";import"./TilpassPlanenSteg-Cn7neiQj.js";import"./HvaErMulig-BXrTpPYu.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
