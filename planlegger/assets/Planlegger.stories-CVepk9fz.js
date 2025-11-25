import{w as c,j as r,r as l,E}from"./iframe-BrpL8Smn.js";import{M as g,P as R}from"./usePlanleggerNavigator-C6g0fzkQ.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Iu-e1hfl.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-Cr55RwFa.js";import"./barnetUtils-BAGDZ56Q.js";import"./hvemHarRettUtils-7XqPGGgr.js";import"./satserUtils-CsGqQ5qK.js";import"./ArbeidssituasjonSteg-6PDs-cmz.js";import"./BlueRadioGroup-IDMYTqBR.js";import"./customErrorFormatter-BUKYM0Ws.js";import"./PlanleggerStepPage-DD4_9mk0.js";import"./useScrollBehaviour-Jj7dhqCb.js";import"./BarnehageplassSteg-DlP2KMex.js";import"./uttakUtils-BUDrhJ1V.js";import"./BabyWrapped-Dm-bXP4b.js";import"./Information-Cuof8sF_.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-SnhZ8XIV.js";import"./HvemPlanleggerSteg-i5Ng4nKs.js";import"./HvorLangPeriodeSteg-C4dYIuXB.js";import"./PersonGroup-Ce_m1LBX.js";import"./HvorMyeSteg-D9xZYPjg.js";import"./Wallet-DUWoyEO7.js";import"./OmBarnetSteg-BAHU4Fn4.js";import"./TasklistStart-B9r38UYY.js";import"./OmPlanleggerenSteg-CCHHcZgJ.js";import"./OppsummeringSteg-DrGSAz1u.js";import"./ShareDataInfobox-BZlSV6_e.js";import"./PlanenDeresSteg-CJVVy6Rb.js";import"./OmÅTilpassePlanen-C3nBKNsE.js";import"./PersonPregnant-BdPGLgMG.js";import"./PencilWriting-mXCIVn4v.js";import"./UforutsetteEndringer-DDOlV7RY.js";import"./ToggleGroup-l7Z9t8MV.js";import"./TilpassPlanenSteg-BRB_jIBO.js";import"./HvaErMulig-ChPXW6Gt.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
