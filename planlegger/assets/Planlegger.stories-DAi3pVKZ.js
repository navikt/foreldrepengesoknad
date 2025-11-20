import{w as c,j as e,r as l,E}from"./iframe-C8xoTh7u.js";import{M as g,P as R}from"./usePlanleggerNavigator-Be2S4eno.js";import{h as n,a as p,A as a,H as s}from"./Planlegger-D30CwRbE.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./HvemPlanleggerUtils-ClsRQUyD.js";import"./barnetUtils-oxuKoF_A.js";import"./hvemHarRettUtils-GoPsfcRr.js";import"./satserUtils-DN8GC6Ob.js";import"./ArbeidssituasjonSteg-D1Sp4bPJ.js";import"./BlueRadioGroup-3Rvjeks5.js";import"./customErrorFormatter-D0vkNJXO.js";import"./PlanleggerStepPage-BapELUfm.js";import"./useScrollBehaviour-BCjHYY-e.js";import"./BarnehageplassSteg-BlFTIWRc.js";import"./uttakUtils-B-tRlxpT.js";import"./BabyWrapped-BaZJKT2O.js";import"./Information-CyxHDxD5.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FordelingSteg-s-vJ0p0i.js";import"./HvemPlanleggerSteg-B2eHOGGz.js";import"./HvorLangPeriodeSteg-v9DbGrJ8.js";import"./HvorMyeSteg-otOSlQzB.js";import"./Wallet-CHbWtpK_.js";import"./OmBarnetSteg-BimD_8Nb.js";import"./TasklistStart-DDbqmlCj.js";import"./OmPlanleggerenSteg-BmL3aq_8.js";import"./OppsummeringSteg-BalLhF3G.js";import"./ShareDataInfobox-CCanAyME.js";import"./PlanenDeresSteg-3LN8zZJ8.js";import"./OmÅTilpassePlanen-Bi7h5QCe.js";import"./PersonPregnant-Yes2pUDa.js";import"./PencilWriting-D03khgNI.js";import"./UforutsetteEndringer-Bhoih6O1.js";import"./ToggleGroup-Bik5yL0n.js";import"./TilpassPlanenSteg-Bpk8H08u.js";import"./HvaErMulig-DM8zyJep.js";const k={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},rt={title:"PlanleggerDataFetcher",component:p,decorators:[c],parameters:{msw:{handlers:[n.post(a.konto,async({request:i})=>{const m=await i.json(),d=await(await fetch("https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto",{body:JSON.stringify(m),method:"POST",headers:{"Content-Type":"application/json"}})).json();return s.json(d)})]}},render:()=>e.jsx(l.StrictMode,{children:e.jsx(g,{children:e.jsx(E,{appName:"planlegger",retryCallback:()=>{},children:e.jsx(R,{initialState:{},children:e.jsx(p,{})})})})})},t={args:{changeLocale:()=>{},locale:"nb"}},r={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json(k))]}}},o={...t,parameters:{msw:{handlers:[n.post(a.konto,()=>s.json({100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
