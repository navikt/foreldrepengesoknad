import{w as c,j as r,r as l,E}from"./iframe-CFDKleqI.js";import{M as g,P as R}from"./usePlanleggerNavigator-C3FRe92y.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CvYJZcej.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-C8FvzZ4X.js";import"./barnetUtils-C4fKxOGi.js";import"./hvemHarRettUtils-i7Dfjx-0.js";import"./satserUtils-Czrvakbr.js";import"./ArbeidssituasjonSteg-DDzqoDyo.js";import"./BlueRadioGroup-CZp0fyG8.js";import"./customErrorFormatter-CHNPl4iD.js";import"./PlanleggerStepPage-tEdH06AI.js";import"./useScrollBehaviour-pThViHM8.js";import"./BarnehageplassSteg-DCUDXcHa.js";import"./uttakUtils-D3CFKwh9.js";import"./BabyWrapped-CSjOcZhz.js";import"./Information-BtsthasB.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BUI1nyxr.js";import"./HvemPlanleggerSteg-C2XJ84No.js";import"./HvorLangPeriodeSteg-Bu4BEn4W.js";import"./PersonGroup-DwHfmeNM.js";import"./HvorMyeSteg-C4Px2v0y.js";import"./Wallet-CFablR4J.js";import"./OmBarnetSteg-DMYowYPW.js";import"./TasklistStart-X_q8Wpzy.js";import"./OmPlanleggerenSteg-rEIkp9HT.js";import"./OppsummeringSteg-CxhOc8Tg.js";import"./ShareDataInfobox-9HhZniTt.js";import"./PlanenDeresSteg-DhcbL_wv.js";import"./OmÅTilpassePlanen-lcY9jLoL.js";import"./PersonPregnant-Bzq4SBFK.js";import"./PencilWriting-3DOZjm1M.js";import"./UforutsetteEndringer-DroL7hFm.js";import"./ToggleGroup-DUoY6VWS.js";import"./TilpassPlanenSteg-DwD-WUip.js";import"./HvaErMulig-CxD1cqrk.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
