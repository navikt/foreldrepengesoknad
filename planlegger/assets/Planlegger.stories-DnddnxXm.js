import{w as c,j as r,r as l,E}from"./iframe-CuhQm1XG.js";import{M as g,P as R}from"./usePlanleggerNavigator-kXCGeuF7.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CkUipuJF.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-VGNcaR9c.js";import"./barnetUtils-BB7EzIaN.js";import"./hvemHarRettUtils-Hyt4sFoS.js";import"./satserUtils-DatSF3TW.js";import"./ArbeidssituasjonSteg-BuSF80Cc.js";import"./BlueRadioGroup-Dnv85UpM.js";import"./customErrorFormatter-BN_iNQJ1.js";import"./PlanleggerStepPage-DQ8XsUKF.js";import"./useScrollBehaviour-B4NhvzIg.js";import"./BarnehageplassSteg-trWlQCke.js";import"./uttakUtils-CUWlDSIX.js";import"./BabyWrapped-BlCA8SlA.js";import"./Information-DJ43k-JH.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DrDv3d1u.js";import"./HvemPlanleggerSteg-_wvj2_HZ.js";import"./HvorLangPeriodeSteg-BZWdkWtY.js";import"./PersonGroup-CGdLS87V.js";import"./HvorMyeSteg-DEdqodxB.js";import"./Wallet-CLs3wwg8.js";import"./OmBarnetSteg-BeY0Z7eU.js";import"./TasklistStart-CfEYlTqP.js";import"./OmPlanleggerenSteg-DejTqbFH.js";import"./OppsummeringSteg-CtiAJzHe.js";import"./ShareDataInfobox-AE4SMXza.js";import"./PlanenDeresSteg-B--9yYW4.js";import"./OmÅTilpassePlanen-DIfzyCYK.js";import"./PersonPregnant-DnX2Hu8h.js";import"./PencilWriting-h4M3a5pi.js";import"./UforutsetteEndringer-CohqxMp5.js";import"./ToggleGroup-BcLuGATD.js";import"./TilpassPlanenSteg-jxwUTZi8.js";import"./HvaErMulig-DUu6Hojr.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
