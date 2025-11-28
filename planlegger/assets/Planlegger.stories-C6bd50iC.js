import{w as c,j as r,r as l,E}from"./iframe-V7pqAypP.js";import{M as g,P as R}from"./usePlanleggerNavigator-C-J9V5ys.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-N_CsAZyW.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BcrcubWo.js";import"./barnetUtils-BVgmnxzl.js";import"./hvemHarRettUtils-XKSgMEzl.js";import"./satserUtils-D3K1Ch_a.js";import"./ArbeidssituasjonSteg-BGLaUO_q.js";import"./BlueRadioGroup-nUYPRcQW.js";import"./customErrorFormatter-DcAkEEz_.js";import"./PlanleggerStepPage-D4GMrjoP.js";import"./useScrollBehaviour-CdW0edWY.js";import"./BarnehageplassSteg-DNxIP7Ff.js";import"./uttakUtils-CoaUGF2n.js";import"./BabyWrapped-B-52dIZc.js";import"./Information-DVU5OK05.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BXb-FiFe.js";import"./HvemPlanleggerSteg-qTbv9gqm.js";import"./HvorLangPeriodeSteg-v1pe5buf.js";import"./PersonGroup-xvoFPOfZ.js";import"./HvorMyeSteg-BWAm9s2z.js";import"./Wallet-D00kAGZs.js";import"./OmBarnetSteg-Bvwb3aIY.js";import"./TasklistStart-CkRgoRFn.js";import"./OmPlanleggerenSteg-CbQMxG7L.js";import"./OppsummeringSteg-S8NoEENj.js";import"./ShareDataInfobox-m51fSKEr.js";import"./useLagUttaksplanForslag-CKUZattz.js";import"./PlanenDeresSteg-Bdz9pX_k.js";import"./OmÅTilpassePlanen-B-ek3Vf3.js";import"./PersonPregnant-BJLZItaI.js";import"./PencilWriting-00KIWar-.js";import"./UforutsetteEndringer-nfndDCpg.js";import"./ToggleGroup-Bepm0rnM.js";import"./TilpassPlanenSteg-BO3wqAt2.js";import"./HvaErMulig-uy3VgfwT.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
