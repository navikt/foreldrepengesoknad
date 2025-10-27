import{w as E,j as n,r as l,E as g}from"./iframe-CXegrdZ4.js";import{M as R,P as S}from"./usePlanleggerNavigator-CFKj76Es.js";import{h as e,a as m,A as o,H as r}from"./Planlegger-BIX_TNW9.js";import{D as d}from"./satserUtils-CEd1W6bx.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-qo65HTMU.js";import"./barnetUtils-CZ6bt1Qi.js";import"./hvemHarRettUtils-enWZ5Bkr.js";import"./ArbeidssituasjonSteg-BiaIjG13.js";import"./BlueRadioGroup-B_1tSe5C.js";import"./customErrorFormatter-CIz06KNk.js";import"./PlanleggerStepPage-CNVwdaaW.js";import"./useScrollBehaviour-BNdQXo4u.js";import"./Spacer-CHVJ0IR1.js";import"./BarnehageplassSteg-gelKKnCX.js";import"./uttakUtils-bfoaHJ7n.js";import"./BabyWrapped-DEW9ZJHf.js";import"./Information-Co4xyIhO.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-B92SoqcN.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DYH1ypvx.js";import"./HvorLangPeriodeSteg-9TixhyOu.js";import"./PersonGroup-D3cV_xsX.js";import"./HvorMyeSteg-C4LdZoWI.js";import"./Wallet-CQmxSfxH.js";import"./OmBarnetSteg-CIVJxbxx.js";import"./TasklistStart-B_3HPO3O.js";import"./OmPlanleggerenSteg-CTA58evH.js";import"./OppsummeringSteg-CujNE88X.js";import"./ShareDataInfobox-imP1hv6O.js";import"./CalendarLabels-BILAc7dw.js";import"./CalendarIconLabel-DdlIHcG_.js";import"./FamiliehendelseLabel-D3TaYAXv.js";import"./PlanenDeresSteg-b0jN9i6r.js";import"./OmÅTilpassePlanen-B1Cz_vIo.js";import"./PersonPregnant-FK5HkMZA.js";import"./PencilWriting-AZGS0d3b.js";import"./UforutsetteEndringer-BhyCgJPQ.js";import"./ToggleGroup-DOiT7LHs.js";import"./TilpassPlanenSteg-YuQSIY6R.js";import"./HvaErMulig-CQ967YzP.js";const T={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[E],parameters:{msw:{handlers:[e.post(o.konto,async({request:i})=>{const p=await i.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return r.json(c)}),e.get(o.satser,async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return r.json(p)})]}},render:()=>n.jsx(l.StrictMode,{children:n.jsx(R,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(S,{initialState:{},children:n.jsx(m,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},s={...t,parameters:{msw:{handlers:[e.post(o.konto,()=>r.json(T)),e.get(o.satser,()=>r.json(d))]}}},a={...t,parameters:{msw:{handlers:[e.post(o.konto,()=>r.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),e.get(o.satser,()=>r.json(d))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER)), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
        '80': KontoBeregningDto;
        '100': KontoBeregningDto;
      })), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};const ct=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,ct as __namedExportsOrder,dt as default};
