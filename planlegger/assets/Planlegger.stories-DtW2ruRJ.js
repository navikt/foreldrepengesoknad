import{w as c,j as e,r as l,E}from"./iframe-B-xL9bbe.js";import{M as g,P as R}from"./usePlanleggerNavigator-CdvLdCpw.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-B5BVjEwT.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-3mdUJLcf.js";import"./barnetUtils-Bz9Ej-K2.js";import"./hvemHarRettUtils-UTHRpKTK.js";import"./satserUtils-D9qrk143.js";import"./ArbeidssituasjonSteg-TclJKxeE.js";import"./BlueRadioGroup-eS48o4at.js";import"./customErrorFormatter-BOg9yLKw.js";import"./PlanleggerStepPage-CJfdQQr_.js";import"./useScrollBehaviour-OUrFKsWf.js";import"./BarnehageplassSteg-Bsi3JdZq.js";import"./uttakUtils-p7urVtlv.js";import"./BabyWrapped-C_CpDUE-.js";import"./Information-BaldX4jh.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-DIU12ksY.js";import"./HvemPlanleggerSteg-CFZP--4K.js";import"./HvorLangPeriodeSteg-04IyrBy9.js";import"./HvorMyeSteg-DlMEWnGd.js";import"./Wallet-O5jv3pOD.js";import"./OmBarnetSteg-Dmme1nYG.js";import"./TasklistStart-C-js2wdL.js";import"./OmPlanleggerenSteg-DeCxCYNf.js";import"./OppsummeringSteg-FYmqXOm-.js";import"./ShareDataInfobox-CV7E52WL.js";import"./PlanenDeresSteg-BX5r9BvJ.js";import"./OmÅTilpassePlanen-D6C5I0st.js";import"./PersonPregnant-Dn0jyWYw.js";import"./PencilWriting-B6MLs9VT.js";import"./UforutsetteEndringer-NyKP_-kY.js";import"./ToggleGroup-DlV3n8PA.js";import"./TilpassPlanenSteg-tjseUO6r.js";import"./HvaErMulig-CBbOUkhv.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
