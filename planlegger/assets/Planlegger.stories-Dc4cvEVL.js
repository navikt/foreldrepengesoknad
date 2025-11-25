import{w as c,j as r,r as l,E}from"./iframe-uDieYuKP.js";import{M as g,P as R}from"./usePlanleggerNavigator-B609YJuk.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-477B8852.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CP4BlR1J.js";import"./barnetUtils-BsS2P0RL.js";import"./hvemHarRettUtils-B6VHKm9u.js";import"./satserUtils-_M0s5_rd.js";import"./ArbeidssituasjonSteg-BLxA6mcF.js";import"./BlueRadioGroup-BQz07ZfY.js";import"./customErrorFormatter-BQpCmrUk.js";import"./PlanleggerStepPage-D4gpZ8_4.js";import"./useScrollBehaviour-BsRlcKnh.js";import"./BarnehageplassSteg-Y_1gAnWq.js";import"./uttakUtils-C1kzxaPl.js";import"./BabyWrapped-RouUT9Wp.js";import"./Information-BnNaCj8F.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DpVi4_ql.js";import"./HvemPlanleggerSteg-BSPG6r0O.js";import"./HvorLangPeriodeSteg-EB9OLxSN.js";import"./PersonGroup-DeNp9e8B.js";import"./HvorMyeSteg-WpUW58nm.js";import"./Wallet-CcHeJ6UK.js";import"./OmBarnetSteg-CPjCVt_E.js";import"./TasklistStart-CBxqn_KW.js";import"./OmPlanleggerenSteg-1ouuTlgw.js";import"./OppsummeringSteg-sg385rda.js";import"./ShareDataInfobox-Z1paaVfE.js";import"./PlanenDeresSteg-Yqv8tOhF.js";import"./OmÅTilpassePlanen-BMNM8DRG.js";import"./PersonPregnant-CQ5oYOkv.js";import"./PencilWriting-CvyyPPPs.js";import"./UforutsetteEndringer-Cu-HSQug.js";import"./ToggleGroup-DbwaZ0bX.js";import"./TilpassPlanenSteg-BXT4RDD4.js";import"./HvaErMulig--DBcc0aT.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
