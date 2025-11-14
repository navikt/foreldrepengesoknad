import{w as c,j as e,r as l,E}from"./iframe-cXdQcjoV.js";import{M as g,P as R}from"./usePlanleggerNavigator-5DAng2pJ.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-JV1WC4Lq.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-D_1mivYD.js";import"./barnetUtils-CqAn0LBT.js";import"./hvemHarRettUtils-P_vdmZiK.js";import"./satserUtils-D4OOMi3W.js";import"./ArbeidssituasjonSteg-ZLELCD17.js";import"./BlueRadioGroup-C8ZAYgvQ.js";import"./customErrorFormatter-DNAn520L.js";import"./PlanleggerStepPage-CBXO2Zb8.js";import"./useScrollBehaviour-HNzjv16M.js";import"./BarnehageplassSteg-BA8Hlg1i.js";import"./uttakUtils-CxuFHUr_.js";import"./BabyWrapped-BS2CWt3j.js";import"./Information-M0dS-eb_.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-484k2wIM.js";import"./HvemPlanleggerSteg-C7GoSI6Z.js";import"./HvorLangPeriodeSteg-4WNNVfpb.js";import"./HvorMyeSteg-Dd55Zki_.js";import"./Wallet-C13VZmm1.js";import"./OmBarnetSteg-DNktntKm.js";import"./TasklistStart-CHhUNs1v.js";import"./OmPlanleggerenSteg-8LWTvL-e.js";import"./OppsummeringSteg-HZDG1LY_.js";import"./ShareDataInfobox-C5UShxW7.js";import"./PlanenDeresSteg-BJ5iid6L.js";import"./OmÅTilpassePlanen-7PP7AK6f.js";import"./PersonPregnant-BGuEAtQJ.js";import"./PencilWriting-Dmy47YDH.js";import"./UforutsetteEndringer-BTe_uygw.js";import"./ToggleGroup-753dr5mL.js";import"./TilpassPlanenSteg-DPwUGV7s.js";import"./HvaErMulig-D_ywBjv_.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
