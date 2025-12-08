import{w as c,j as r,r as l,E}from"./iframe-DN35LVIV.js";import{M as g,P as R}from"./usePlanleggerNavigator-L6Xh66-e.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BWG4fuNv.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-DRYgFI_s.js";import"./barnetUtils-CR2x_0yo.js";import"./hvemHarRettUtils-D_8Mk0gQ.js";import"./satserUtils-WR6T6bY3.js";import"./ArbeidssituasjonSteg-B3yZ-dvB.js";import"./BlueRadioGroup-C8Nwtvoq.js";import"./customErrorFormatter-BTAgrpzl.js";import"./PlanleggerStepPage-BpUw_6uF.js";import"./useScrollBehaviour-CSaQ_eYz.js";import"./BarnehageplassSteg-BoYGF9rk.js";import"./uttakUtils-D5SnWSir.js";import"./BabyWrapped-PuR0Up1-.js";import"./Information-BZ7z0bbK.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-Vjo8McD3.js";import"./HvemPlanleggerSteg-DccG059l.js";import"./HvorLangPeriodeSteg-BA1ljzO9.js";import"./PersonGroup-DMtllUdR.js";import"./HvorMyeSteg-CnmGSiNP.js";import"./Wallet-BERywHwv.js";import"./OmBarnetSteg-D_PLK2Q9.js";import"./TasklistStart-4QHDJoEW.js";import"./OmPlanleggerenSteg-O2aDi370.js";import"./OppsummeringSteg-CxN6sxQv.js";import"./ShareDataInfobox-D4VddT5V.js";import"./useLagUttaksplanForslag-D731izpo.js";import"./PlanenDeresSteg-skz9_ZNk.js";import"./OmÅTilpassePlanen-DOiWoopC.js";import"./PersonPregnant-ibAuym7R.js";import"./PencilWriting-E6MOVc2Q.js";import"./UforutsetteEndringer-CRGhcEvO.js";import"./ToggleGroup-Do6XzpXa.js";import"./TilpassPlanenSteg-BU8oXKPf.js";import"./HvaErMulig-mUwPm_17.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},nt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
