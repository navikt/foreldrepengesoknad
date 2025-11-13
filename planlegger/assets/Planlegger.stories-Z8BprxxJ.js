import{w as c,j as r,r as l,E}from"./iframe-BmfBZu0l.js";import{M as g,P as R}from"./usePlanleggerNavigator-Dj9C4Nyp.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BJfQbgUx.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Bs-ZfEDw.js";import"./barnetUtils-Dofq_Q_Q.js";import"./hvemHarRettUtils-DECMHiYv.js";import"./satserUtils-BEly-f7w.js";import"./ArbeidssituasjonSteg-C8WSbVkV.js";import"./BlueRadioGroup-CImY1vwV.js";import"./customErrorFormatter-BCER0Vj7.js";import"./PlanleggerStepPage-CvmbZCCD.js";import"./useScrollBehaviour-KvIAk1ME.js";import"./Spacer-BK_A7io3.js";import"./BarnehageplassSteg-OLx_YdNI.js";import"./uttakUtils-Djr5qVc5.js";import"./BabyWrapped-C297Z-Iv.js";import"./Information-DopWOI8k.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-CaCg7dC3.js";import"./HvemPlanleggerSteg-BWOSsZTE.js";import"./HvorLangPeriodeSteg-BajsiLKq.js";import"./PersonGroup-B6mx9PBs.js";import"./HvorMyeSteg-BOL9cpUR.js";import"./Wallet-nYv9DA6i.js";import"./OmBarnetSteg-BkuZdiwk.js";import"./TasklistStart-De5Iqb9I.js";import"./OmPlanleggerenSteg-DTdsVOZA.js";import"./OppsummeringSteg-CdnQEtcr.js";import"./ShareDataInfobox-DDUh8dOk.js";import"./CalendarLabels-0FwP3h7d.js";import"./CalendarIconLabel-klX28UuJ.js";import"./FamiliehendelseLabel-D3yxQYW_.js";import"./PlanenDeresSteg-DocRVLkh.js";import"./OmÅTilpassePlanen-DMg4-BwB.js";import"./PersonPregnant-D-nzoDSt.js";import"./PencilWriting-BEZbb6vd.js";import"./UforutsetteEndringer-DyddmywD.js";import"./ToggleGroup-CSxcOa6V.js";import"./TilpassPlanenSteg-CFXfkbY0.js";import"./HvaErMulig-W4amB9dP.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
