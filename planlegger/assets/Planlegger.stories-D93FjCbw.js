import{w as c,j as e,r as l,E}from"./iframe-CAwUq1ma.js";import{M as g,P as R}from"./usePlanleggerNavigator-DYRYD6Ug.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-OdpCH7Bc.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DQHJEt0w.js";import"./barnetUtils-uBIEt9wZ.js";import"./hvemHarRettUtils-7mBJwb3r.js";import"./satserUtils-BkEM2Ps_.js";import"./ArbeidssituasjonSteg-C8-o5tGF.js";import"./BlueRadioGroup-D-sRqqvL.js";import"./customErrorFormatter-qvXoQE60.js";import"./PlanleggerStepPage-Bd3APFKg.js";import"./useScrollBehaviour-Dr8OzE-1.js";import"./BarnehageplassSteg-Dph9Wn8c.js";import"./uttakUtils-D-eVSxib.js";import"./BabyWrapped-8I56iCcZ.js";import"./Information-BJc-Paj8.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-Cp-uCLMN.js";import"./HvemPlanleggerSteg-DEUecKBv.js";import"./HvorLangPeriodeSteg-SoPw4bPJ.js";import"./HvorMyeSteg-41ZTSNX9.js";import"./Wallet-Dqt2i6m-.js";import"./OmBarnetSteg-BpGiTT1P.js";import"./TasklistStart-DDbO29k3.js";import"./OmPlanleggerenSteg-f1P4RY4v.js";import"./OppsummeringSteg-CwJqYdyT.js";import"./ShareDataInfobox-BflBRCDe.js";import"./PlanenDeresSteg-C-2HjjnM.js";import"./OmÅTilpassePlanen-Cj24V3pF.js";import"./PersonPregnant-BgPNGmWF.js";import"./PencilWriting-BY3ww-5U.js";import"./UforutsetteEndringer-CLkASL6J.js";import"./ToggleGroup-CouTEOs4.js";import"./TilpassPlanenSteg-CwLd58P8.js";import"./HvaErMulig-BoTcjxvT.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
