import{w as c,j as r,r as l,E}from"./iframe-zmjYcO9I.js";import{M as g,P as R}from"./usePlanleggerNavigator-Bf01xAyW.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DuD4nyXH.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-C_6u9qRw.js";import"./barnetUtils-_VBoVJ7V.js";import"./hvemHarRettUtils-BedZ6-kg.js";import"./satserUtils-D2DNsN7v.js";import"./ArbeidssituasjonSteg-AKtpyBJ2.js";import"./BlueRadioGroup-CeFTJL7t.js";import"./customErrorFormatter-BFon893q.js";import"./PlanleggerStepPage-PD11bkp7.js";import"./useScrollBehaviour-B08UCJVd.js";import"./BarnehageplassSteg-BtVExF1n.js";import"./uttakUtils-BUQgDoiV.js";import"./BabyWrapped-7iDu8Vbm.js";import"./Information-wDaB_Ukp.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CJtxt4vi.js";import"./HvemPlanleggerSteg-bGyt7VUH.js";import"./HvorLangPeriodeSteg-BJbJTfEz.js";import"./PersonGroup-jBnISgMy.js";import"./HvorMyeSteg-BxZJya5W.js";import"./Wallet-dSMKM-df.js";import"./OmBarnetSteg-D82yNmxh.js";import"./TasklistStart-BnnzxlqI.js";import"./OmPlanleggerenSteg-BAKED1VE.js";import"./OppsummeringSteg-Bcyla8vc.js";import"./ShareDataInfobox-D8NUDyWO.js";import"./PlanenDeresSteg-BLpjaf9g.js";import"./OmÅTilpassePlanen-D81MykL_.js";import"./PersonPregnant-BWE7M65k.js";import"./PencilWriting-CLZm1CLd.js";import"./UforutsetteEndringer-BCRNCUdS.js";import"./ToggleGroup-pHrnwauE.js";import"./TilpassPlanenSteg-Cbn0XB95.js";import"./HvaErMulig-CnpigGbz.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
