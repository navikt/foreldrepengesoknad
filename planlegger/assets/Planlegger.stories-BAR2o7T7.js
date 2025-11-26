import{w as c,j as r,r as l,E}from"./iframe-BY7Gzvym.js";import{M as g,P as R}from"./usePlanleggerNavigator-DtzffCCx.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DWYt7Bia.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BoWVtHsr.js";import"./barnetUtils-Dqo6OLgX.js";import"./hvemHarRettUtils-X9qhZCYa.js";import"./satserUtils-BT_XOq5V.js";import"./ArbeidssituasjonSteg-4BVlu5_q.js";import"./BlueRadioGroup-B_WnF79n.js";import"./customErrorFormatter-Cf997UV3.js";import"./PlanleggerStepPage-DB5U_R9w.js";import"./useScrollBehaviour-ktNB52OP.js";import"./BarnehageplassSteg-BUlt1vOL.js";import"./uttakUtils-CEbFY4ZD.js";import"./BabyWrapped-CzpxgBqw.js";import"./Information-C-HNQ4ny.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BwSAkm5i.js";import"./HvemPlanleggerSteg-Ca9N2yR4.js";import"./HvorLangPeriodeSteg-D0VNsWwp.js";import"./PersonGroup-DIn90lRD.js";import"./HvorMyeSteg-CuNcyh54.js";import"./Wallet-BPQADdix.js";import"./OmBarnetSteg-CkD-363A.js";import"./TasklistStart-BWMto7W2.js";import"./OmPlanleggerenSteg-CWntMGlz.js";import"./OppsummeringSteg-qCuyZw4l.js";import"./ShareDataInfobox-DJvPtRl7.js";import"./PlanenDeresSteg-4SQjoEyZ.js";import"./OmÅTilpassePlanen-B_WwV14H.js";import"./PersonPregnant-CuYoce09.js";import"./PencilWriting-DRWNZbAu.js";import"./UforutsetteEndringer-ebHZqU_v.js";import"./ToggleGroup-DDi1l791.js";import"./TilpassPlanenSteg-DB-9HNwN.js";import"./HvaErMulig-D99zSu6I.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
