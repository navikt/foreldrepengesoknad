import{w as c,j as r,r as l,E}from"./iframe-DXmR1Gd2.js";import{M as g,P as R}from"./usePlanleggerNavigator-CObdI31m.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BviJf3_d.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DZ4zde2K.js";import"./barnetUtils-CHF2X3dE.js";import"./hvemHarRettUtils-CuJkh_Jp.js";import"./satserUtils-06Kx2Etz.js";import"./ArbeidssituasjonSteg-BKVuq161.js";import"./BlueRadioGroup-me84abFK.js";import"./customErrorFormatter-DBJo6hfB.js";import"./PlanleggerStepPage-DHx-4mv0.js";import"./useScrollBehaviour-BNqnYCkT.js";import"./BarnehageplassSteg-BBIr5qcR.js";import"./uttakUtils-BtQxtOfg.js";import"./BabyWrapped-BaVfJv0B.js";import"./Information-t4Qf-zrZ.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DBSyUhRW.js";import"./HvemPlanleggerSteg-B9FRW6C3.js";import"./HvorLangPeriodeSteg-Br7ON6xQ.js";import"./PersonGroup-CN36L_sr.js";import"./HvorMyeSteg-DUhIG3G2.js";import"./Wallet-K0FTCBiT.js";import"./OmBarnetSteg-C0PgWhEW.js";import"./TasklistStart-BkvT8_0t.js";import"./OmPlanleggerenSteg-BTfJkwp2.js";import"./OppsummeringSteg-DkWvorT8.js";import"./ShareDataInfobox-_4KT__tK.js";import"./PlanenDeresSteg-5LA71RSz.js";import"./OmÅTilpassePlanen-Dwe87bVi.js";import"./PersonPregnant-CXWvEuPm.js";import"./PencilWriting-sRLcnWLu.js";import"./UforutsetteEndringer-C4GMQb_F.js";import"./ToggleGroup-CGsfdSyz.js";import"./TilpassPlanenSteg-9mPyUmxM.js";import"./HvaErMulig-B3YvvG7I.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const nt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,e as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,nt as __namedExportsOrder,ot as default};
