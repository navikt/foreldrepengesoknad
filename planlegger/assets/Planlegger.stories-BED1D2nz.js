import{w as c,j as r,r as l,E}from"./iframe-CvFX0fyO.js";import{M as g,P as R}from"./usePlanleggerNavigator-QHuCG5qY.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-E5H5FGDa.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BgNlB-xC.js";import"./barnetUtils-C9NqLi_b.js";import"./hvemHarRettUtils-Dp7C0R_7.js";import"./satserUtils-DY3x1t74.js";import"./ArbeidssituasjonSteg-BI70TGNs.js";import"./BlueRadioGroup-DwqJqZHL.js";import"./customErrorFormatter-UgdbaX87.js";import"./PlanleggerStepPage-CDYwpUHN.js";import"./useScrollBehaviour-CeypbIBF.js";import"./BarnehageplassSteg-BkDhgSa1.js";import"./uttakUtils-Domz_3yl.js";import"./BabyWrapped-DoYc4EWi.js";import"./Information-DFUJx1cX.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-FwrCnEI0.js";import"./HvemPlanleggerSteg-CdNI2PQH.js";import"./HvorLangPeriodeSteg-nKgb6hAv.js";import"./PersonGroup-CNbJDIaw.js";import"./HvorMyeSteg-CLlyBWoE.js";import"./Wallet-C03iBgMJ.js";import"./OmBarnetSteg-CzjnK4DH.js";import"./TasklistStart-sMgX-jNi.js";import"./OmPlanleggerenSteg-D28C9RPE.js";import"./OppsummeringSteg-Cnn5Tu-P.js";import"./ShareDataInfobox-tYKD88Q9.js";import"./useLagUttaksplanForslag-BLS_W2me.js";import"./PlanenDeresSteg-CYFgUn-p.js";import"./OmÅTilpassePlanen-BIiOyc5I.js";import"./PersonPregnant-CoEuNupm.js";import"./PencilWriting-DADJZSc1.js";import"./UforutsetteEndringer-DhUq3jsk.js";import"./ToggleGroup-BCMspiZC.js";import"./TilpassPlanenSteg-CAVnIEbc.js";import"./HvaErMulig-CbfY8j6H.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
