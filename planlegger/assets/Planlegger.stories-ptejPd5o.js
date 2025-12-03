import{w as c,j as r,r as l,E}from"./iframe-DQW4fLSv.js";import{M as g,P as R}from"./usePlanleggerNavigator-C2_RByF1.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CliCtAXU.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-AYK1kYYu.js";import"./barnetUtils-BYFd3jIs.js";import"./hvemHarRettUtils-7JTBnPyp.js";import"./satserUtils-CdcpNVUY.js";import"./ArbeidssituasjonSteg-Bzuyv5WM.js";import"./BlueRadioGroup-oidoab13.js";import"./customErrorFormatter-yxQTxdHA.js";import"./PlanleggerStepPage-BtnhxELg.js";import"./useScrollBehaviour-xX9W-mIF.js";import"./BarnehageplassSteg-Zw86qFYE.js";import"./uttakUtils-CYR2ptU9.js";import"./BabyWrapped-BNUKi49f.js";import"./Information-umbYfg-t.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Dl6CZ_YG.js";import"./HvemPlanleggerSteg-DYxLN0f3.js";import"./HvorLangPeriodeSteg-6JcL_MRQ.js";import"./PersonGroup-jhMDc4GN.js";import"./HvorMyeSteg-C-2WCjgu.js";import"./Wallet-gdWn7eq5.js";import"./OmBarnetSteg-n2RAVdx6.js";import"./TasklistStart-D5fOZl6H.js";import"./OmPlanleggerenSteg-DK_KG_in.js";import"./OppsummeringSteg-BvvKstKz.js";import"./ShareDataInfobox-qo3hmC77.js";import"./useLagUttaksplanForslag-oLZO3pJD.js";import"./PlanenDeresSteg-CD4jQ0I7.js";import"./OmÅTilpassePlanen-DZiHgHs2.js";import"./PersonPregnant-BHWQ_Cbu.js";import"./PencilWriting-DWnQgwxm.js";import"./UforutsetteEndringer-Dl7udYQg.js";import"./ToggleGroup-C0C9PYSW.js";import"./TilpassPlanenSteg-BaZULBwY.js";import"./HvaErMulig-DrR8W9pE.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
