import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BEKC_1W-.js";import{M as S,P as u}from"./usePlanleggerNavigator-DeJFaoMM.js";import{h as r,a as m,H as o}from"./Planlegger-CwOWjJ5g.js";import{D as d}from"./satserUtils-CAfI6DpW.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-ibJC3-zE.js";import"./barnetUtils-Bkg4acId.js";import"./hvemHarRettUtils-BIASkUEU.js";import"./ArbeidssituasjonSteg-CHgJq4P6.js";import"./BlueRadioGroup-BMzXEzKb.js";import"./customErrorFormatter-CNIha0eM.js";import"./PlanleggerStepPage-CoUigVbo.js";import"./useScrollBehaviour-DIS0bImj.js";import"./Spacer-Ct2AH03l.js";import"./BarnehageplassSteg-XoRRxzer.js";import"./uttakUtils-wg5hkjWY.js";import"./BabyWrapped-DqvvKDng.js";import"./Information-B5zirWs5.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-ByGJs94R.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CawB0SU_.js";import"./HvorLangPeriodeSteg-ClHxfRiE.js";import"./PersonGroup-B2xqoktW.js";import"./HvorMyeSteg-BLfrAj-2.js";import"./Wallet-DCAResKU.js";import"./OmBarnetSteg-BlIxPPcU.js";import"./TasklistStart-BD3sUbTI.js";import"./OmPlanleggerenSteg-CnUFfjTa.js";import"./OppsummeringSteg-vcq8uCQa.js";import"./ShareDataInfobox-s9yBPPSp.js";import"./CalendarLabels-DHpw3x3x.js";import"./CalendarIconLabel-DnIx6TQC.js";import"./FamiliehendelseLabel-CEPOtgv2.js";import"./PlanenDeresSteg-D1YQ0uUL.js";import"./OmÅTilpassePlanen-D1S-AXLP.js";import"./PersonPregnant-C0uzFZe0.js";import"./PencilWriting-Cyl1r7oU.js";import"./UforutsetteEndringer-C_497R6u.js";import"./ToggleGroup-BHwvWQ09.js";import"./TilpassPlanenSteg-BdskvoK6.js";import"./HvaErMulig-OCHZUx_2.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const lt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,lt as __namedExportsOrder,dt as default};
