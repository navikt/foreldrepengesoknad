import{w as c,j as r,r as l,E}from"./iframe-BPbmYEnR.js";import{M as g,P as R}from"./usePlanleggerNavigator-T9JlRQgU.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CtG94RLa.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-D7pJpaY2.js";import"./barnetUtils-DXeQjFd7.js";import"./hvemHarRettUtils-DgSN_IR2.js";import"./satserUtils-CtSfJR1R.js";import"./ArbeidssituasjonSteg-BP9ZuvKD.js";import"./BlueRadioGroup-gCiGp73c.js";import"./customErrorFormatter-DqP1YZ3n.js";import"./PlanleggerStepPage-hQ3K3wGU.js";import"./useScrollBehaviour-DoLhHi25.js";import"./BarnehageplassSteg-DShD0Bnh.js";import"./uttakUtils-BLz06hIE.js";import"./BabyWrapped-ClbGysdY.js";import"./Information-hnRajPLZ.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-yZxMLIqZ.js";import"./HvemPlanleggerSteg-oMX00Dgf.js";import"./HvorLangPeriodeSteg-_v9MfeU-.js";import"./PersonGroup-QCTm3BAZ.js";import"./HvorMyeSteg-Cf4Lq9iK.js";import"./Wallet-urVnB7r5.js";import"./OmBarnetSteg-B5R15uAh.js";import"./TasklistStart-BjDOgLyE.js";import"./OmPlanleggerenSteg-CWYqEy4A.js";import"./OppsummeringSteg-IZ55RIzj.js";import"./ShareDataInfobox-C8cmNWof.js";import"./PlanenDeresSteg-CkfuQz2S.js";import"./OmÅTilpassePlanen-ANPh1531.js";import"./PersonPregnant-BLB0lyK7.js";import"./PencilWriting-Bg6Gw5e5.js";import"./UforutsetteEndringer-C3Rz4hYi.js";import"./ToggleGroup-_EdNeFPA.js";import"./TilpassPlanenSteg-BySTQimc.js";import"./HvaErMulig-VFONeUN-.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
