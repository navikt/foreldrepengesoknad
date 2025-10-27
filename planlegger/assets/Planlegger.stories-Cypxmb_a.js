import{w as E,j as n,r as l,E as g}from"./iframe-CKmKbywv.js";import{M as R,P as S}from"./usePlanleggerNavigator-1AbGXYeW.js";import{h as e,a as m,A as o,H as r}from"./Planlegger-Bz3VN0W2.js";import{D as d}from"./satserUtils-CkNzmm85.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Ckqzekpn.js";import"./barnetUtils-DqLZZUfD.js";import"./hvemHarRettUtils-BfRHJrRd.js";import"./ArbeidssituasjonSteg-x5DW0xcK.js";import"./BlueRadioGroup-Dt5cNWGH.js";import"./customErrorFormatter-DQtMeDnC.js";import"./PlanleggerStepPage-C2sApglb.js";import"./useScrollBehaviour-VsA90qnl.js";import"./Spacer-L_OsnOrD.js";import"./BarnehageplassSteg-Bf_VAW7B.js";import"./uttakUtils-cnlBWSzj.js";import"./BabyWrapped-WqrwzvT2.js";import"./Information-CjvRZhkj.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-Df5QKbSe.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DqXkspkH.js";import"./HvorLangPeriodeSteg-Bb7uChgU.js";import"./PersonGroup-D5ouniXZ.js";import"./HvorMyeSteg-B6Y31GiC.js";import"./Wallet-r7uNx4Ue.js";import"./OmBarnetSteg-CzHrgB7z.js";import"./TasklistStart-D3zcixjt.js";import"./OmPlanleggerenSteg-q2jL8qb6.js";import"./OppsummeringSteg-Dj9y6-Ic.js";import"./ShareDataInfobox-rSfalgiS.js";import"./CalendarLabels-DAf2ve5I.js";import"./CalendarIconLabel-DN-nWVNV.js";import"./FamiliehendelseLabel-42lriBym.js";import"./PlanenDeresSteg-ecsE6fgX.js";import"./OmÅTilpassePlanen-BgR8cZDO.js";import"./PersonPregnant-BR3x9N8A.js";import"./PencilWriting-Gt3bY252.js";import"./UforutsetteEndringer-eufOatd8.js";import"./ToggleGroup-CZUmAq_Q.js";import"./TilpassPlanenSteg-Dyjic_qq.js";import"./HvaErMulig-DG3Q8t8_.js";const T={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[E],parameters:{msw:{handlers:[e.post(o.konto,async({request:i})=>{const p=await i.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return r.json(c)}),e.get(o.satser,async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return r.json(p)})]}},render:()=>n.jsx(l.StrictMode,{children:n.jsx(R,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(S,{initialState:{},children:n.jsx(m,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},s={...t,parameters:{msw:{handlers:[e.post(o.konto,()=>r.json(T)),e.get(o.satser,()=>r.json(d))]}}},a={...t,parameters:{msw:{handlers:[e.post(o.konto,()=>r.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),e.get(o.satser,()=>r.json(d))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
