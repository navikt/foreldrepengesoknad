import{w as c,j as r,r as l,E}from"./iframe-BgUnYUlx.js";import{M as g,P as R}from"./usePlanleggerNavigator-BArc6010.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D78Kl6jH.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-BALeCqv3.js";import"./barnetUtils-7nEI09vT.js";import"./hvemHarRettUtils-Dm_gBHHR.js";import"./satserUtils-PQZixkUd.js";import"./ArbeidssituasjonSteg-Der9mkmA.js";import"./BlueRadioGroup-_yG7cv9s.js";import"./customErrorFormatter-3qFQ0Apu.js";import"./PlanleggerStepPage-Dd7aojZP.js";import"./useScrollBehaviour-C-0HsuT7.js";import"./BarnehageplassSteg-Deh9eaTt.js";import"./uttakUtils-36x2zICy.js";import"./BabyWrapped-DMy7dQU2.js";import"./Information-B4AuGRx8.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./FordelingSteg-DYVNiXOg.js";import"./HvemPlanleggerSteg-DIQojL81.js";import"./HvorLangPeriodeSteg-a-R26-Ve.js";import"./PersonGroup-S2GhRudL.js";import"./HvorMyeSteg-ByDsvGow.js";import"./Wallet-Bc3370Vp.js";import"./OmBarnetSteg--cn-6BVW.js";import"./TasklistStart-D9fv5fo7.js";import"./OmPlanleggerenSteg-IC9B7U4c.js";import"./OppsummeringSteg-C-Xq8f-w.js";import"./ShareDataInfobox-CjUUnYKX.js";import"./PlanenDeresSteg-IhuCqhdb.js";import"./OmÅTilpassePlanen--qHeA_-F.js";import"./PersonPregnant-B-YAfR18.js";import"./PencilWriting-C4SCwfeD.js";import"./UforutsetteEndringer-757QIN8C.js";import"./ToggleGroup-3UB0Q1Yq.js";import"./TilpassPlanenSteg-C1RL9a7C.js";import"./HvaErMulig-DsoWlym4.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ot={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
