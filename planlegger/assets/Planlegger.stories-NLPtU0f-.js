import{w as c,j as r,r as l,E}from"./iframe-DYFgv16M.js";import{M as g,P as R}from"./usePlanleggerNavigator-B0PBkxrc.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D-Ok3oHd.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BYB95hwT.js";import"./barnetUtils-C04NbSMG.js";import"./hvemHarRettUtils-LKtMHgrp.js";import"./satserUtils-DSFAu-Gf.js";import"./ArbeidssituasjonSteg-BQIOlHm_.js";import"./BlueRadioGroup-slPuHnQz.js";import"./customErrorFormatter-ffOKKVVs.js";import"./PlanleggerStepPage-BPjfUK5E.js";import"./useScrollBehaviour-BaI-aIzL.js";import"./BarnehageplassSteg-CuvxLaGX.js";import"./uttakUtils-CMlcVcIq.js";import"./BabyWrapped-BmFYNsVQ.js";import"./Information-OwNdvBDC.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-B392SW-N.js";import"./HvemPlanleggerSteg-BD7pamN1.js";import"./HvorLangPeriodeSteg-DhExVBYZ.js";import"./PersonGroup-B8sL7BNQ.js";import"./HvorMyeSteg-BERYGDo6.js";import"./Wallet-DwfBefGG.js";import"./OmBarnetSteg-pgSDYlLS.js";import"./TasklistStart-D6DrdSwP.js";import"./OmPlanleggerenSteg-CPfhuWby.js";import"./OppsummeringSteg-DBmNPi7i.js";import"./ShareDataInfobox-zICxY0yW.js";import"./useLagUttaksplanForslag-j3QWekLU.js";import"./PlanenDeresSteg-hknbqIhb.js";import"./OmÅTilpassePlanen-mmVkLpCP.js";import"./PersonPregnant-LakVoU2V.js";import"./PencilWriting-BcoqxE6O.js";import"./UforutsetteEndringer-D47_Kkn_.js";import"./ToggleGroup-DRdKl1gk.js";import"./TilpassPlanenSteg-DG-3pxfW.js";import"./HvaErMulig-DYGjoE7e.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const at=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,at as __namedExportsOrder,nt as default};
