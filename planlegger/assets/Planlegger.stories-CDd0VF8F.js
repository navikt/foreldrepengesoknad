import{w as c,j as o,r as l,E}from"./iframe-c5v-qNxu.js";import{M as k,P as g}from"./usePlanleggerNavigator-B50b9qfH.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BUEFedcH.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BxB4zgEe.js";import"./barnetUtils-BTC2mTxF.js";import"./hvemHarRettUtils-oz3D1TZ-.js";import"./satserUtils-Br-VoXcc.js";import"./ArbeidssituasjonSteg-CMA4_nhe.js";import"./BlueRadioGroup-DUs1L3oP.js";import"./customErrorFormatter-CQ8tU9So.js";import"./PlanleggerStepPage-yIYXZLn6.js";import"./useScrollBehaviour-h9xXUY8i.js";import"./Spacer-BZHUJsqi.js";import"./BarnehageplassSteg-CZ-lxJPv.js";import"./uttakUtils-BzOKAQqW.js";import"./BabyWrapped-DK039s4O.js";import"./Information-BnKzTtP_.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CqO3F_YK.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BYHPMqz6.js";import"./HvorLangPeriodeSteg-COHqe18E.js";import"./PersonGroup-BVlTRxtM.js";import"./HvorMyeSteg-B4bR5kn8.js";import"./Wallet-BVHVmRqk.js";import"./OmBarnetSteg-Br6FHTOK.js";import"./TasklistStart-C3z5e4ZI.js";import"./OmPlanleggerenSteg-Cyaw2RX8.js";import"./OppsummeringSteg-0IBvd9Iq.js";import"./ShareDataInfobox-BC5unqXL.js";import"./CalendarLabels-DVAcD5LJ.js";import"./CalendarIconLabel-DwnVghyp.js";import"./FamiliehendelseLabel-Vkp5y6vK.js";import"./PlanenDeresSteg-B_c1dGcy.js";import"./OmÅTilpassePlanen-Cy9lhyeJ.js";import"./PersonPregnant-D9ZVN0Ft.js";import"./PencilWriting-7DaxvqI9.js";import"./UforutsetteEndringer-DzUuloUw.js";import"./ToggleGroup-BXg9KZsZ.js";import"./TilpassPlanenSteg-BpjPXpdx.js";import"./HvaErMulig-DiOBmHuC.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
