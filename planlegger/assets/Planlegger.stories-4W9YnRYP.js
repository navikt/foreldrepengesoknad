import{w as c,j as r,r as l,E}from"./iframe-o4shCni1.js";import{M as g,P as R}from"./usePlanleggerNavigator-BZ-10njr.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CUdEPQGA.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CdyfOQtg.js";import"./barnetUtils-C8Yc7JVL.js";import"./hvemHarRettUtils-Cjv5p980.js";import"./satserUtils-CZOj9pYJ.js";import"./ArbeidssituasjonSteg-DOyhrRWk.js";import"./BlueRadioGroup-50Bch4sb.js";import"./customErrorFormatter-CwlhUuLd.js";import"./PlanleggerStepPage-BCxlzEK1.js";import"./useScrollBehaviour-D7Whc-c4.js";import"./BarnehageplassSteg-DmazK8oL.js";import"./uttakUtils-CoHy987u.js";import"./BabyWrapped-Cl37OzFw.js";import"./Information-BL5FrRFi.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-BUp6S26r.js";import"./HvemPlanleggerSteg-BLkNn9U5.js";import"./HvorLangPeriodeSteg-bdvIAY_r.js";import"./PersonGroup-CmPvKuZL.js";import"./HvorMyeSteg-CqIoW5Lp.js";import"./Wallet-BmLS1jrm.js";import"./OmBarnetSteg-uOHW8vAj.js";import"./TasklistStart-DEy3UDV1.js";import"./OmPlanleggerenSteg-Drf6hTsQ.js";import"./OppsummeringSteg-bRBnsJ1n.js";import"./ShareDataInfobox-CtGUYBYr.js";import"./PlanenDeresSteg-DQw2Bgm3.js";import"./OmÅTilpassePlanen-B40EKO-Z.js";import"./PersonPregnant-CPgVTj91.js";import"./PencilWriting-DTHdGyBN.js";import"./UforutsetteEndringer-B_VxvFNt.js";import"./ToggleGroup-8Ob9Ll1s.js";import"./TilpassPlanenSteg-BYrIVGlG.js";import"./HvaErMulig-DRO5C3Ie.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
