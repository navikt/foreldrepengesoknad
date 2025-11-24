import{w as c,j as r,r as l,E}from"./iframe-DopYwZIu.js";import{M as g,P as R}from"./usePlanleggerNavigator-Cg9VshSA.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CdFMrGyV.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BVvKr-MV.js";import"./barnetUtils-BbxS6IP9.js";import"./hvemHarRettUtils-CBWWIKJD.js";import"./satserUtils-CQ4961Fo.js";import"./ArbeidssituasjonSteg-DCNtBF3S.js";import"./BlueRadioGroup-D8aCRBeh.js";import"./customErrorFormatter-C33lXk1u.js";import"./PlanleggerStepPage-DeSgwWzE.js";import"./useScrollBehaviour-Dia02Sma.js";import"./BarnehageplassSteg-Bjb22qJs.js";import"./uttakUtils-BbUTIhxp.js";import"./BabyWrapped-Cs-m-Yeu.js";import"./Information-CO5wDfPO.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DcyY3TUN.js";import"./HvemPlanleggerSteg-CQzM29xO.js";import"./HvorLangPeriodeSteg-6qcTRbwh.js";import"./PersonGroup-BrcHvsPC.js";import"./HvorMyeSteg-CBRugZ7I.js";import"./Wallet-DMijkZHo.js";import"./OmBarnetSteg-B4wHoSwl.js";import"./TasklistStart-C9n23s8P.js";import"./OmPlanleggerenSteg-kXdC2bqH.js";import"./OppsummeringSteg-C500zB6x.js";import"./ShareDataInfobox-BDpmB_0Y.js";import"./PlanenDeresSteg-BudBOZIj.js";import"./OmÅTilpassePlanen-B8tIeXuf.js";import"./PersonPregnant-DAUhr43Q.js";import"./PencilWriting-C4fdP7Kp.js";import"./UforutsetteEndringer-D5LosF4M.js";import"./ToggleGroup-BZ7ux_CJ.js";import"./TilpassPlanenSteg-BoM7CING.js";import"./HvaErMulig-BOtprgq3.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
