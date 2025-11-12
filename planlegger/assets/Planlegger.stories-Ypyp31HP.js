import{w as c,j as r,r as l,E}from"./iframe-CPqy_GpJ.js";import{M as g,P as R}from"./usePlanleggerNavigator-Bp823Xiz.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-BWqNMN7u.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DmkGvhNR.js";import"./barnetUtils-D2LayTNC.js";import"./hvemHarRettUtils-BaSznbJL.js";import"./satserUtils-DRht0FNW.js";import"./ArbeidssituasjonSteg-CggZipVj.js";import"./BlueRadioGroup-D6i8Bt3_.js";import"./customErrorFormatter-D9lq2oJP.js";import"./PlanleggerStepPage-BpSgPf8-.js";import"./useScrollBehaviour-wnx_ulCS.js";import"./Spacer-DwkoMG2v.js";import"./BarnehageplassSteg-sK2ctlOG.js";import"./uttakUtils-C1kNIKIr.js";import"./BabyWrapped-B5VjA-mj.js";import"./Information-VZCk5prT.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-DYNHsyzL.js";import"./HvemPlanleggerSteg-DjPnNg-p.js";import"./HvorLangPeriodeSteg-DMKUuOiV.js";import"./PersonGroup-CKLhu74d.js";import"./HvorMyeSteg-CdEZsiJV.js";import"./Wallet-C9fvUt8u.js";import"./OmBarnetSteg-DFqez1nk.js";import"./TasklistStart-CKAk9ohz.js";import"./OmPlanleggerenSteg-Bqsz18aA.js";import"./OppsummeringSteg-rUymRm9G.js";import"./ShareDataInfobox-DI7_Z0VN.js";import"./CalendarLabels-C712pX7a.js";import"./CalendarIconLabel-B_Nff1pR.js";import"./FamiliehendelseLabel-OdiBnB2c.js";import"./PlanenDeresSteg-isQO74Hb.js";import"./OmÅTilpassePlanen-CykZEWZh.js";import"./PersonPregnant-BDOI0zDI.js";import"./PencilWriting-Cm_w8fPo.js";import"./UforutsetteEndringer-D3-xcoWV.js";import"./ToggleGroup-DgBgAhyq.js";import"./TilpassPlanenSteg-CY-LF6Ja.js";import"./HvaErMulig-DR90xxDy.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},it={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>r.jsx(l.StrictMode,{children:r.jsx(g,{children:r.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:r.jsx(R,{initialState:{},children:r.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},e={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
