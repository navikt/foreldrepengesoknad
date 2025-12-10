import{w as c,j as e,r as l,E}from"./iframe-DwWxxAya.js";import{M as g,P as R}from"./usePlanleggerNavigator-ossaAdRq.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-Cec1lpvS.js";import"./preload-helper-PPVm8Dsz.js";import"./routes-gnI_NAHe.js";import"./HvemPlanleggerUtils-B-SNuSes.js";import"./barnetUtils-BF8Zfmq2.js";import"./hvemHarRettUtils-DLrOKaW6.js";import"./satserUtils-DTonUwCu.js";import"./ArbeidssituasjonSteg-DfCW2vhc.js";import"./BlueRadioGroup-DkpPgtHH.js";import"./customErrorFormatter-5JKpdK9K.js";import"./PlanleggerStepPage-uuqHVgdp.js";import"./useScrollBehaviour-CIrmMkFv.js";import"./BarnehageplassSteg-CycMlQ8g.js";import"./uttakUtils-SVWhwV3m.js";import"./BabyWrapped-CuSdT7Gy.js";import"./Information-CMdXCYmt.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-CEQmRokT.js";import"./HvemPlanleggerSteg-BsjO4OaG.js";import"./HvorLangPeriodeSteg-Cx0nK311.js";import"./PersonGroup-CQKJVDnD.js";import"./HvorMyeSteg-C3o-ozeu.js";import"./Wallet-EODZgJQA.js";import"./OmBarnetSteg-yK88Upof.js";import"./TasklistStart-3p32I06v.js";import"./OmPlanleggerenSteg-q7Wm7jf_.js";import"./OppsummeringSteg-koT0EsqV.js";import"./ShareDataInfobox-BlwvdFxE.js";import"./useLagUttaksplanForslag-pizsrYI6.js";import"./PlanenDeresSteg-D5JjyyLQ.js";import"./HvaErMulig-DxjaVnFU.js";import"./PersonPregnant-BX38Jbn9.js";import"./UforutsetteEndringer-Ccqg3il1.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},tt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const et=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,et as __namedExportsOrder,tt as default};
