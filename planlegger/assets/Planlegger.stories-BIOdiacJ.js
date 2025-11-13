import{w as c,j as r,r as l,E}from"./iframe-DGox5AG8.js";import{M as g,P as R}from"./usePlanleggerNavigator-BB_xjfPm.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-B-Axtf34.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Cgm3fVHx.js";import"./barnetUtils-BGVIfSbe.js";import"./hvemHarRettUtils-CY-3LH80.js";import"./satserUtils-BURjBDPb.js";import"./ArbeidssituasjonSteg-BUHKTkHm.js";import"./BlueRadioGroup-Hat0Ifx5.js";import"./customErrorFormatter-SuQ71r9v.js";import"./PlanleggerStepPage-oVa3kVqa.js";import"./useScrollBehaviour-DJhPC210.js";import"./Spacer-Bsn-IcPX.js";import"./BarnehageplassSteg-C_yQ5gyT.js";import"./uttakUtils-CxrZvpBS.js";import"./BabyWrapped-BXunAIdT.js";import"./Information-BXZsYTs4.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BnmGgwDU.js";import"./HvemPlanleggerSteg-DPQg1LJo.js";import"./HvorLangPeriodeSteg-BfFNBSJm.js";import"./PersonGroup-DXAkgYKm.js";import"./HvorMyeSteg-D2g0MqRV.js";import"./Wallet-DHPYE8hY.js";import"./OmBarnetSteg-BJUOj5__.js";import"./TasklistStart-CZEwvx1-.js";import"./OmPlanleggerenSteg-CIKY9grU.js";import"./OppsummeringSteg-Cjr4lWMo.js";import"./ShareDataInfobox-CMDjisJv.js";import"./CalendarLabels-DQsQRn4p.js";import"./CalendarIconLabel-B3WWygg3.js";import"./FamiliehendelseLabel-C0K9XbUP.js";import"./PlanenDeresSteg-NqqKKCtK.js";import"./OmÅTilpassePlanen-CG1VhFs4.js";import"./PersonPregnant-CUYXi6qS.js";import"./PencilWriting-DleGGkxq.js";import"./UforutsetteEndringer-BKS8LPrQ.js";import"./ToggleGroup-DxWGKOhl.js";import"./TilpassPlanenSteg-DsPglq1b.js";import"./HvaErMulig-DkDLrVWA.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,mt as __namedExportsOrder,it as default};
