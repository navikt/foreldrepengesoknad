import{w as c,j as r,r as l,E}from"./iframe-VJG6LM5B.js";import{M as g,P as R}from"./usePlanleggerNavigator-B_rsuIXM.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DyTR5e5W.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-TEo8OulQ.js";import"./barnetUtils-CALyY0Dq.js";import"./hvemHarRettUtils-Bch1lOcO.js";import"./satserUtils-Ce2rw6se.js";import"./ArbeidssituasjonSteg-Bzq8_y3J.js";import"./BlueRadioGroup-xYJG6-NW.js";import"./customErrorFormatter-BTtDxPdW.js";import"./PlanleggerStepPage-CHLdL9dC.js";import"./useScrollBehaviour-CjczuYRM.js";import"./BarnehageplassSteg-BNnFXKJL.js";import"./uttakUtils-DnBP28cS.js";import"./BabyWrapped-C9gyWLby.js";import"./Information-C6qEne_k.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-88pjb-uy.js";import"./HvemPlanleggerSteg-BMKX8cH9.js";import"./HvorLangPeriodeSteg-yA_tsm07.js";import"./PersonGroup-B0f-SMmR.js";import"./HvorMyeSteg-fr4FGT6o.js";import"./Wallet-CvGrdSKF.js";import"./OmBarnetSteg-c2_21YGd.js";import"./TasklistStart-hKMvxWNv.js";import"./OmPlanleggerenSteg-BUoaGZZe.js";import"./OppsummeringSteg-BPOqng_k.js";import"./ShareDataInfobox-CMIoMa8V.js";import"./useLagUttaksplanForslag-Dt3QGwVI.js";import"./PlanenDeresSteg-DxvR97mw.js";import"./OmÅTilpassePlanen-kJoBm6ET.js";import"./PersonPregnant-B1NtjmfQ.js";import"./PencilWriting-ZHBP3tCj.js";import"./UforutsetteEndringer-BibGbfEs.js";import"./ToggleGroup-COB3QP6t.js";import"./TilpassPlanenSteg-DgEtViQo.js";import"./HvaErMulig-C2r1rk0B.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
