import{w as c,j as o,r as l,E}from"./iframe-C53Y_tsP.js";import{M as k,P as g}from"./usePlanleggerNavigator-bFAnPask.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CJbM6caZ.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CgylmF95.js";import"./barnetUtils-BqEgQFzE.js";import"./hvemHarRettUtils-ufiij2CG.js";import"./satserUtils-Cgd72F6b.js";import"./ArbeidssituasjonSteg-Ck8h2EFn.js";import"./BlueRadioGroup-D6j_KFMJ.js";import"./customErrorFormatter-EZKDZYpj.js";import"./PlanleggerStepPage-BxclBB3Q.js";import"./useScrollBehaviour-Chg05p7v.js";import"./Spacer-B528p8fw.js";import"./BarnehageplassSteg-Bbm4U7W3.js";import"./uttakUtils-93unqIkh.js";import"./BabyWrapped-BiAMNF6N.js";import"./Information-DvpOalms.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-if07oBFV.js";import"./HvemPlanleggerSteg-BFZnbhqg.js";import"./HvorLangPeriodeSteg-Ci53GfVz.js";import"./PersonGroup-Cvj815tx.js";import"./HvorMyeSteg-UVxvDpml.js";import"./Wallet-DVR_aQHR.js";import"./OmBarnetSteg-gpRN9l5f.js";import"./TasklistStart-DZqyHyJW.js";import"./OmPlanleggerenSteg-CLqDr5AI.js";import"./OppsummeringSteg-UIGe8u9E.js";import"./ShareDataInfobox-BZbJEV-4.js";import"./CalendarLabels-ZJPl5EX6.js";import"./CalendarIconLabel-D5fwn9eS.js";import"./FamiliehendelseLabel-CyJAdUPg.js";import"./PlanenDeresSteg-B9pkCnQU.js";import"./OmÅTilpassePlanen-yI8UyqeA.js";import"./PersonPregnant-B9NKMgRO.js";import"./PencilWriting-BXAq86HG.js";import"./UforutsetteEndringer-CAiST-Y7.js";import"./ToggleGroup-DKrHN_E0.js";import"./TilpassPlanenSteg-CV7i5ne9.js";import"./HvaErMulig-Cr3sspQ_.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
