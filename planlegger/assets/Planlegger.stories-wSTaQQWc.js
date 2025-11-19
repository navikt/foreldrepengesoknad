import{w as c,j as e,r as l,E}from"./iframe-CcG9Brow.js";import{M as g,P as R}from"./usePlanleggerNavigator-CYcKgGMl.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-DzyZLmTY.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DdWiubaA.js";import"./barnetUtils-C-iRLWvN.js";import"./hvemHarRettUtils-Cr9ryv1g.js";import"./satserUtils-Dn4v1xtQ.js";import"./ArbeidssituasjonSteg-Bst2J00s.js";import"./BlueRadioGroup-CbhBx-8T.js";import"./customErrorFormatter-DfoUqDKo.js";import"./PlanleggerStepPage-C_BimzKK.js";import"./useScrollBehaviour-BJ4cF77z.js";import"./BarnehageplassSteg-dSxu14Tp.js";import"./uttakUtils-CZGTzinC.js";import"./BabyWrapped-DoiZ-29l.js";import"./Information-DRgTlUnd.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-CHW42k9T.js";import"./HvemPlanleggerSteg-DC9jPirG.js";import"./HvorLangPeriodeSteg-Ct9z9gw0.js";import"./HvorMyeSteg-CMhMUBC7.js";import"./Wallet-ezjVecw7.js";import"./OmBarnetSteg-DoAyrfgg.js";import"./TasklistStart-CdpskKwq.js";import"./OmPlanleggerenSteg-CGIPRS5E.js";import"./OppsummeringSteg-DYIwHKE4.js";import"./ShareDataInfobox-JI5H5td4.js";import"./PlanenDeresSteg-DKN9nFKZ.js";import"./OmÅTilpassePlanen-B45vwVwq.js";import"./PersonPregnant-BF_0cHZq.js";import"./PencilWriting-DZOqC9Un.js";import"./UforutsetteEndringer-qBBfaJf9.js";import"./ToggleGroup-Cdg-PJBw.js";import"./TilpassPlanenSteg-DLkAzBdw.js";import"./HvaErMulig-DjfSKy91.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER))]
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ot=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,ot as __namedExportsOrder,rt as default};
