import{w as c,j as r,r as l,E}from"./iframe-B9AY85Ci.js";import{M as g,P as R}from"./usePlanleggerNavigator-sw2j4-aC.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Ugolol15.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Ce_Nzusw.js";import"./barnetUtils-COe360JJ.js";import"./hvemHarRettUtils-BesH3zpi.js";import"./satserUtils-DGdx-zXE.js";import"./ArbeidssituasjonSteg-lupqymnK.js";import"./BlueRadioGroup-BNlPP2Lu.js";import"./customErrorFormatter-BnSX9V_H.js";import"./PlanleggerStepPage-CwVR42My.js";import"./useScrollBehaviour-mDQjNNOo.js";import"./BarnehageplassSteg-DZp8Rw5W.js";import"./uttakUtils-vLWzthTC.js";import"./BabyWrapped-rfncKXIL.js";import"./Information-xOwjoLla.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-IPFEsZiP.js";import"./HvemPlanleggerSteg-DfMLkpKQ.js";import"./HvorLangPeriodeSteg-B_nbzxvA.js";import"./PersonGroup-XKainxGy.js";import"./HvorMyeSteg-CmKRNmvN.js";import"./Wallet-B_KbJ4ts.js";import"./OmBarnetSteg-yfer-2Wu.js";import"./TasklistStart-ChYOU1Tn.js";import"./OmPlanleggerenSteg-DTfWroo7.js";import"./OppsummeringSteg-CHdLsN0t.js";import"./ShareDataInfobox-B2WrJYXW.js";import"./PlanenDeresSteg-qWwHntu_.js";import"./OmÅTilpassePlanen-DY8XNOF-.js";import"./PersonPregnant-1FEd45k9.js";import"./PencilWriting-BJwwAHvx.js";import"./UforutsetteEndringer-CGHvR2ym.js";import"./ToggleGroup-CeaQDhZ9.js";import"./TilpassPlanenSteg-BM-hx0bH.js";import"./HvaErMulig-WSTfULUQ.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
