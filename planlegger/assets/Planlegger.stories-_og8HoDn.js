import{w as c,j as r,r as l,E}from"./iframe-slImoZ84.js";import{M as g,P as R}from"./usePlanleggerNavigator-CTdzzoAf.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CIVhxZLS.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DNhfEgSR.js";import"./barnetUtils-CSyd1qsz.js";import"./hvemHarRettUtils-DzZgJ8fS.js";import"./satserUtils-nVjWBNIa.js";import"./ArbeidssituasjonSteg-bhDlnsWs.js";import"./BlueRadioGroup-Pt0OqIuv.js";import"./customErrorFormatter-kudnqKoV.js";import"./PlanleggerStepPage-CgqYxu3S.js";import"./useScrollBehaviour-DShkkaBV.js";import"./BarnehageplassSteg-O9LdvAb4.js";import"./uttakUtils-Ci7GqOJ0.js";import"./BabyWrapped-BUOVLs-M.js";import"./Information-BAw5RLtU.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DuYwN__R.js";import"./HvemPlanleggerSteg-W_WLZ1bV.js";import"./HvorLangPeriodeSteg-BDFdpJDO.js";import"./PersonGroup-DmHnjdBt.js";import"./HvorMyeSteg-D5b18akw.js";import"./Wallet-CC9zlRhK.js";import"./OmBarnetSteg-CdJA0pJ0.js";import"./TasklistStart-_SewxeGq.js";import"./OmPlanleggerenSteg-DEmPmI2Z.js";import"./OppsummeringSteg-CYp8EzlH.js";import"./ShareDataInfobox-BFkjLOJM.js";import"./useLagUttaksplanForslag-9Aj1njCE.js";import"./PlanenDeresSteg-CICrM4Ox.js";import"./OmÅTilpassePlanen-CzeHKCXo.js";import"./PersonPregnant-rLSz24oG.js";import"./PencilWriting-BIs6BGb_.js";import"./UforutsetteEndringer-m8On9IfG.js";import"./ToggleGroup-DBhKR-9w.js";import"./TilpassPlanenSteg-Bgd4moJr.js";import"./HvaErMulig-Bx0YklBn.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const at=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,at as __namedExportsOrder,nt as default};
