import{w as c,j as n,r as k,E as g,l as t}from"./iframe-lQp3spMt.js";import{M as S,P as u}from"./usePlanleggerNavigator-B4tkWjv3.js";import{h as r,a as m,H as o}from"./Planlegger-B8hHIcX9.js";import{D as d}from"./satserUtils-CFb8mnsk.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BN412Ngh.js";import"./barnetUtils-126h3eTM.js";import"./hvemHarRettUtils-BblnxKaG.js";import"./ArbeidssituasjonSteg-LOV2zZFh.js";import"./BlueRadioGroup-CoIJ7gfl.js";import"./customErrorFormatter-ByVips7c.js";import"./PlanleggerStepPage-DgPX9gP_.js";import"./useScrollBehaviour-BwJRysQl.js";import"./Spacer-B3jPneWW.js";import"./BarnehageplassSteg-B2u2Fy3l.js";import"./uttakUtils-CvslOyGo.js";import"./BabyWrapped-DL1nILSV.js";import"./Information-Dh1xX2tu.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-EarpbLez.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BQEUNAqO.js";import"./HvorLangPeriodeSteg-DXLMClZI.js";import"./PersonGroup-Csbf841L.js";import"./HvorMyeSteg-DjTWoC5X.js";import"./Wallet-BRYeS0dP.js";import"./OmBarnetSteg-DLCfNdSR.js";import"./TasklistStart-OgWfcHpC.js";import"./OmPlanleggerenSteg-D276Jw67.js";import"./OppsummeringSteg-DfBMIcUi.js";import"./ShareDataInfobox-Bs05lrgF.js";import"./CalendarLabels-BYi-3LBu.js";import"./CalendarIconLabel-vbvemWae.js";import"./FamiliehendelseLabel-4FyFs50Q.js";import"./PlanenDeresSteg-VFspL-Al.js";import"./OmÅTilpassePlanen-DOIL8_SD.js";import"./PersonPregnant-DezFrW1I.js";import"./PencilWriting-IufyReAN.js";import"./UforutsetteEndringer-qjww4iR1.js";import"./ToggleGroup-YRSsFE3W.js";import"./TilpassPlanenSteg-D8FM2FrA.js";import"./HvaErMulig-D8I9oa1P.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json({
        '100': {
          kontoer: [{
            konto: StønadskontoType.AktivitetsfriKvote,
            dager: 75
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        },
        '80': {
          kontoer: [{
            konto: StønadskontoType.AktivitetsfriKvote,
            dager: 95
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
