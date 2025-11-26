import{w as c,j as r,r as l,E}from"./iframe-B2wUc24z.js";import{M as g,P as R}from"./usePlanleggerNavigator-BdnaLhKo.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CDaMl981.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CFLpBo83.js";import"./barnetUtils-vrbQ9DH1.js";import"./hvemHarRettUtils-C5_FmJ4-.js";import"./satserUtils-D0s5TWBf.js";import"./ArbeidssituasjonSteg-BwrcsS3C.js";import"./BlueRadioGroup-BnxtkZ8k.js";import"./customErrorFormatter--yvgR3k1.js";import"./PlanleggerStepPage-CFHgO8UP.js";import"./useScrollBehaviour-CiTnw7aN.js";import"./BarnehageplassSteg-IaYaTm4H.js";import"./uttakUtils-C4nOF30U.js";import"./BabyWrapped-1PSEhdjO.js";import"./Information-VTNVWOdt.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CG-GYo-7.js";import"./HvemPlanleggerSteg-DFH5GuAq.js";import"./HvorLangPeriodeSteg-Ymxt4mPP.js";import"./PersonGroup-B8G8AoNp.js";import"./HvorMyeSteg-Du-TfsuD.js";import"./Wallet-3SDhTv8F.js";import"./OmBarnetSteg-CstflDxY.js";import"./TasklistStart-DUE2POKO.js";import"./OmPlanleggerenSteg-CTjJ18vS.js";import"./OppsummeringSteg-VM3-XXKy.js";import"./ShareDataInfobox-BjJXIpZm.js";import"./PlanenDeresSteg-BHtsUKfG.js";import"./OmÅTilpassePlanen-MPYwSFRU.js";import"./PersonPregnant-CCnPnE0t.js";import"./PencilWriting-CrqAWt0u.js";import"./UforutsetteEndringer-BDfcwny8.js";import"./ToggleGroup-D45NABZk.js";import"./TilpassPlanenSteg-DnFcrhQO.js";import"./HvaErMulig-BfP-79go.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
