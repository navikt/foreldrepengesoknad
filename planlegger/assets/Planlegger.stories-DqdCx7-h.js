import{w as c,j as o,r as l,E}from"./iframe-QcIIXMKc.js";import{M as k,P as g}from"./usePlanleggerNavigator-BKl2fk20.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CigHcibJ.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DCwAEm2F.js";import"./barnetUtils-DWElueYq.js";import"./hvemHarRettUtils-TnwzgLHC.js";import"./satserUtils-ChIS-CpN.js";import"./ArbeidssituasjonSteg-D5a47OPK.js";import"./BlueRadioGroup-D174tpRG.js";import"./customErrorFormatter-b-wB1b3t.js";import"./PlanleggerStepPage-BdA_pHs-.js";import"./useScrollBehaviour-BLfdwcXt.js";import"./Spacer-CP_Or_Vr.js";import"./BarnehageplassSteg-CGkTrxti.js";import"./uttakUtils-CSKoC6Po.js";import"./BabyWrapped-DAzYrC3y.js";import"./Information-ingiNmJx.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-B3ncuMaJ.js";import"./HvemPlanleggerSteg-DzFNXdpn.js";import"./HvorLangPeriodeSteg-DCgzGsiy.js";import"./PersonGroup-YIQPNj29.js";import"./HvorMyeSteg-CNVCVypS.js";import"./Wallet-BSpTEnuQ.js";import"./OmBarnetSteg-CZ1Pu6fz.js";import"./TasklistStart-D2KPCDzh.js";import"./OmPlanleggerenSteg-DTnCkAYu.js";import"./OppsummeringSteg-MI3nxRth.js";import"./ShareDataInfobox-CDC5HOXF.js";import"./CalendarLabels-K509nmGj.js";import"./CalendarIconLabel-Y6Gs4Naj.js";import"./FamiliehendelseLabel-Drym3SMS.js";import"./PlanenDeresSteg-B0GMpJ6h.js";import"./OmÅTilpassePlanen-tX_ieQb9.js";import"./PersonPregnant-DLtP3-T8.js";import"./PencilWriting-DtTuT2zR.js";import"./UforutsetteEndringer-DwsdObm2.js";import"./ToggleGroup-D1TNLZE5.js";import"./TilpassPlanenSteg-CklnsHER.js";import"./HvaErMulig-BiBtUbSi.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
