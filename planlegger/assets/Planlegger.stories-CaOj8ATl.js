import{w as c,j as e,r as l,E}from"./iframe-Ukjo43Q8.js";import{M as g,P as R}from"./usePlanleggerNavigator-DJW45f9S.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-CkSroYFd.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-CRywlFpI.js";import"./barnetUtils-BsgHdzze.js";import"./hvemHarRettUtils-D-LKDzek.js";import"./satserUtils-BMj8W-2F.js";import"./ArbeidssituasjonSteg-DLJGm-t6.js";import"./BlueRadioGroup-AYHmwVWT.js";import"./customErrorFormatter-Cwz6K5kT.js";import"./PlanleggerStepPage-BAt3v9ik.js";import"./useScrollBehaviour-BoOr8KfT.js";import"./BarnehageplassSteg-CqOLpY3Y.js";import"./uttakUtils-C4LS2J62.js";import"./BabyWrapped-Dv6fgjr1.js";import"./Information-DbsmA5P8.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-DQ2i8xKp.js";import"./HvemPlanleggerSteg-jIT3iQMA.js";import"./HvorLangPeriodeSteg-BFYooZqC.js";import"./HvorMyeSteg-CTwYSeBJ.js";import"./Wallet-CsHJ9Tod.js";import"./OmBarnetSteg-BhP2CTZM.js";import"./TasklistStart-BWjicgkj.js";import"./OmPlanleggerenSteg-BIP8NaY5.js";import"./OppsummeringSteg-DitmxVRg.js";import"./ShareDataInfobox-7DmkwKUX.js";import"./PlanenDeresSteg-DoolSnas.js";import"./OmÅTilpassePlanen-CGzswtpM.js";import"./PersonPregnant-Bp9Wp8Z0.js";import"./PencilWriting-DDKPzMd-.js";import"./UforutsetteEndringer-CAjw5XJa.js";import"./ToggleGroup-7X6prPwt.js";import"./TilpassPlanenSteg-D57KY6C8.js";import"./HvaErMulig-Jmdyk5oo.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const ot=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{t as Default,r as DefaultMockaStønadskontoerOgSatser,o as FarFarMockaStønadskontoerOgSatser,ot as __namedExportsOrder,rt as default};
