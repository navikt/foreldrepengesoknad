import{w as c,j as r,r as l,E}from"./iframe-BP7Be1GZ.js";import{M as g,P as R}from"./usePlanleggerNavigator-cAUPC7cO.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Ct2z2hQq.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CS0bTpC2.js";import"./barnetUtils-CEQMBKFv.js";import"./hvemHarRettUtils-DkTeWwmy.js";import"./satserUtils-CvXA4v8m.js";import"./ArbeidssituasjonSteg-6w-xITPy.js";import"./BlueRadioGroup-HGTbHwNV.js";import"./customErrorFormatter-ChtGGmrl.js";import"./PlanleggerStepPage-TfvU0Gvz.js";import"./useScrollBehaviour-Dfo-9KB7.js";import"./BarnehageplassSteg-Bo6a4O8o.js";import"./uttakUtils-DyDKSrFF.js";import"./BabyWrapped-CWaEmOhJ.js";import"./Information-CHP7gnel.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CqDA1Qr9.js";import"./HvemPlanleggerSteg-BjudMxZq.js";import"./HvorLangPeriodeSteg-C-4m3yyl.js";import"./PersonGroup-CIcmQCup.js";import"./HvorMyeSteg-C9_049VN.js";import"./Wallet-BUX2Wdg2.js";import"./OmBarnetSteg-B-oNYG7n.js";import"./TasklistStart-CqST8c8v.js";import"./OmPlanleggerenSteg-BpTiOZP5.js";import"./OppsummeringSteg-DFMs5P9I.js";import"./ShareDataInfobox-CKusjRfX.js";import"./PlanenDeresSteg-DlO2JmWA.js";import"./OmÅTilpassePlanen-DPN68C__.js";import"./PersonPregnant-BWsh0ug5.js";import"./PencilWriting-t-goaOKs.js";import"./UforutsetteEndringer-DflESKWk.js";import"./ToggleGroup-B8UZD3Sg.js";import"./TilpassPlanenSteg-ijynl3eA.js";import"./HvaErMulig-D9Kphp5I.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
