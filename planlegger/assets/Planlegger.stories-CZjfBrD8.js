import{w as c,j as o,r as l,E}from"./iframe-DwNXJb82.js";import{M as k,P as g}from"./usePlanleggerNavigator-CLzasTXJ.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-zLOX1fqR.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Dkd7A5y5.js";import"./barnetUtils-CLC2CqSH.js";import"./hvemHarRettUtils-f63VnPec.js";import"./satserUtils-BBL2xTeQ.js";import"./ArbeidssituasjonSteg-pe7HQcdo.js";import"./BlueRadioGroup-CSYC_C9J.js";import"./customErrorFormatter-eRjw4sGC.js";import"./PlanleggerStepPage-BgOIIN2Y.js";import"./useScrollBehaviour-CsNekJQD.js";import"./Spacer-COTtzXRU.js";import"./BarnehageplassSteg-DQxWMWc5.js";import"./uttakUtils-DA1-3Kmh.js";import"./BabyWrapped-CTZW5J4F.js";import"./Information-uf5dUIIJ.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CZeKwGJ1.js";import"./HvemPlanleggerSteg-DEfpXBGD.js";import"./HvorLangPeriodeSteg-C1MpvBB6.js";import"./PersonGroup-1qL5lUUA.js";import"./HvorMyeSteg-CnaxdMdj.js";import"./Wallet-DIQt4jZP.js";import"./OmBarnetSteg-BxF-XW1U.js";import"./TasklistStart-DxMFzhis.js";import"./OmPlanleggerenSteg-hRnIr9BX.js";import"./OppsummeringSteg-DXkGWaCi.js";import"./ShareDataInfobox-DPJraIX9.js";import"./CalendarLabels-C3cxaGNd.js";import"./CalendarIconLabel-Cmc40vcb.js";import"./FamiliehendelseLabel-DPPgsZ8W.js";import"./PlanenDeresSteg-B9F_XYvI.js";import"./OmÅTilpassePlanen-CidTc32A.js";import"./PersonPregnant-yfd9LImW.js";import"./PencilWriting-rwRumbLg.js";import"./UforutsetteEndringer-COYrAnOM.js";import"./ToggleGroup-CK0L2Ydd.js";import"./TilpassPlanenSteg-MG_x3jzZ.js";import"./HvaErMulig-C1H7-YAG.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      } satisfies {
        '80': KontoBeregningDto_fpoversikt;
        '100': KontoBeregningDto_fpoversikt;
      }))]
    }
  }
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
