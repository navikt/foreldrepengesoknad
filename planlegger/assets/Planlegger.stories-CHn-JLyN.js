import{w as c,j as r,r as l,E}from"./iframe-1RAPXDqg.js";import{M as g,P as R}from"./usePlanleggerNavigator-Dp3H9YqK.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DtPfzyzr.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BijxW9Kl.js";import"./barnetUtils-N4qVP2ts.js";import"./hvemHarRettUtils-T2VdMjPb.js";import"./satserUtils-DnlBeZSv.js";import"./ArbeidssituasjonSteg-CVp-A9K8.js";import"./BlueRadioGroup-Dy6gUUOf.js";import"./customErrorFormatter-BHYkncf8.js";import"./PlanleggerStepPage-DU1OeYK3.js";import"./useScrollBehaviour-D00qNnhb.js";import"./BarnehageplassSteg-DSfM4YGu.js";import"./uttakUtils-DBTMIyvD.js";import"./BabyWrapped-LdZqAL9P.js";import"./Information-DwRC1uL0.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BMD-vr2p.js";import"./HvemPlanleggerSteg-BslmRbjp.js";import"./HvorLangPeriodeSteg-DshiX9Sj.js";import"./PersonGroup-Cd4yu1V1.js";import"./HvorMyeSteg-BoiXNLZY.js";import"./Wallet-C5Ylfsm9.js";import"./OmBarnetSteg-COM2Wpe5.js";import"./TasklistStart-BQqMQsdm.js";import"./OmPlanleggerenSteg-S-kZvgDh.js";import"./OppsummeringSteg-UzsGb8XP.js";import"./ShareDataInfobox-Cq06i65a.js";import"./useLagUttaksplanForslag-CmYVjTi7.js";import"./PlanenDeresSteg-4PULis3t.js";import"./OmÅTilpassePlanen-orNuHZpl.js";import"./PersonPregnant-BlHZWjVf.js";import"./PencilWriting-CkjaM07N.js";import"./UforutsetteEndringer-DWCNiHhh.js";import"./ToggleGroup-4cuhIiIi.js";import"./TilpassPlanenSteg-D6Po5uOx.js";import"./HvaErMulig-Ci9KdLG_.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
