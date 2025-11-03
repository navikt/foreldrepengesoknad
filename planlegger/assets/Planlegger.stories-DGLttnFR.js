import{w as c,j as o,r as l,E}from"./iframe-3O5WXtlm.js";import{M as k,P as g}from"./usePlanleggerNavigator-BOaMwcQc.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BEBdGS1j.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-B_AoHGNR.js";import"./barnetUtils-DhE53VwJ.js";import"./hvemHarRettUtils-DqifVOpu.js";import"./satserUtils-D9ZtxjGH.js";import"./ArbeidssituasjonSteg-l34-kC4k.js";import"./BlueRadioGroup-DymbNScb.js";import"./customErrorFormatter-BxbX_E8_.js";import"./PlanleggerStepPage-DFLh4lK8.js";import"./useScrollBehaviour-gn_EjiBT.js";import"./Spacer-DNA1VvAw.js";import"./BarnehageplassSteg-CNRLhUK7.js";import"./uttakUtils-DEf-Yj1w.js";import"./BabyWrapped-C2s8j5NR.js";import"./Information-DbXZC5mX.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CxOaapu9.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Cv6D6RiT.js";import"./HvorLangPeriodeSteg-xxrxkUcb.js";import"./PersonGroup-LCDDo2ls.js";import"./HvorMyeSteg-D1D30Sji.js";import"./Wallet-Dzp9vSwX.js";import"./OmBarnetSteg-DwwRw3m4.js";import"./TasklistStart-Cye_O1GT.js";import"./OmPlanleggerenSteg-CmGQ6m8p.js";import"./OppsummeringSteg-vxuqTfHD.js";import"./ShareDataInfobox-BaTPD7bx.js";import"./CalendarLabels-BS-TQrTj.js";import"./CalendarIconLabel-CbMVqOiV.js";import"./FamiliehendelseLabel-DeztMjaI.js";import"./PlanenDeresSteg-2kFVcWAR.js";import"./OmÅTilpassePlanen-D5K6vh-q.js";import"./PersonPregnant-B3lAYzPO.js";import"./PencilWriting-DQkEFC7i.js";import"./UforutsetteEndringer-0h7_-8Yi.js";import"./ToggleGroup-C6fERkiY.js";import"./TilpassPlanenSteg-DN_VHR1M.js";import"./HvaErMulig-B-wBenn3.js";const R={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpoversikt.intern.dev.nav.no/fpoversikt/internal/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>o.jsx(l.StrictMode,{children:o.jsx(k,{children:o.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:o.jsx(g,{initialState:{},children:o.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(R))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,e as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
