import{w as c,j as r,r as l,E}from"./iframe-D8mjBvJA.js";import{M as g,P as R}from"./usePlanleggerNavigator-CinR9LHG.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Dbb_yM8L.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BiD0mqJ_.js";import"./barnetUtils-DdBsnp7q.js";import"./hvemHarRettUtils-CtA2zEDd.js";import"./satserUtils-0x2nuqUk.js";import"./ArbeidssituasjonSteg-DSAQng3o.js";import"./BlueRadioGroup-C9Og3ZiN.js";import"./customErrorFormatter-DUuFYDyb.js";import"./PlanleggerStepPage-D_WtiP_E.js";import"./useScrollBehaviour-BMpvn4dU.js";import"./Spacer-CYF4OmiF.js";import"./BarnehageplassSteg-xRmilAnR.js";import"./uttakUtils-B8HHfy4f.js";import"./BabyWrapped-CarMPW4P.js";import"./Information-D-LBaJbH.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-BEm_sb2m.js";import"./HvemPlanleggerSteg-CNLy-Vhi.js";import"./HvorLangPeriodeSteg-CXuE4rPg.js";import"./PersonGroup-BrUDNlkN.js";import"./HvorMyeSteg-BIWZY88H.js";import"./Wallet-D2grH7Vp.js";import"./OmBarnetSteg-DfHs2_L5.js";import"./TasklistStart-C2kmxcjd.js";import"./OmPlanleggerenSteg-CMkpgAp7.js";import"./OppsummeringSteg-BIvfEcMr.js";import"./ShareDataInfobox-DbXwSXLt.js";import"./CalendarLabels-BQLCrKyd.js";import"./CalendarIconLabel-D0KrBSVe.js";import"./FamiliehendelseLabel-s2S2uOu9.js";import"./PlanenDeresSteg-Yx9PB5hD.js";import"./OmÅTilpassePlanen-BjSkJj11.js";import"./PersonPregnant-PxCECx26.js";import"./PencilWriting-BxcLgPY9.js";import"./UforutsetteEndringer-fVKNuIRt.js";import"./ToggleGroup-SlYgTO6V.js";import"./TilpassPlanenSteg-CVI5x67X.js";import"./HvaErMulig-DNxHuZT4.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
