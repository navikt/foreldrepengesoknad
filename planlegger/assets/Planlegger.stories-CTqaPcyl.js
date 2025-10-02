import{w as c,j as n,r as k,E as g,l as t}from"./iframe-a4keJrcb.js";import{M as S,P as u}from"./usePlanleggerNavigator-CVIIaEqO.js";import{h as r,a as m,H as o}from"./Planlegger-Shrxr1_C.js";import{D as d}from"./satserUtils-CSZUN6H6.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-2OZXZT4S.js";import"./barnetUtils-C7B8nh6r.js";import"./hvemHarRettUtils-J0fy3LXf.js";import"./ArbeidssituasjonSteg-B3fz2g-h.js";import"./BlueRadioGroup-CBT5fUXw.js";import"./customErrorFormatter-H52dtIF6.js";import"./PlanleggerStepPage-D8CSFGWb.js";import"./useScrollBehaviour-Bz9f2hca.js";import"./Spacer-DPEtsxRk.js";import"./BarnehageplassSteg-CfvwStq1.js";import"./uttakUtils-CK4OPKGa.js";import"./BabyWrapped-Gm7GVi-U.js";import"./Information-3XSanuXQ.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BSSoGFMR.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-C3o-cTcC.js";import"./HvorLangPeriodeSteg-CqXsXrt5.js";import"./PersonGroup-B8yex9so.js";import"./HvorMyeSteg-BB_-ZPV6.js";import"./Wallet-Dz7UKUiL.js";import"./OmBarnetSteg-DOtWEbiD.js";import"./TasklistStart-C_TWAO2Z.js";import"./OmPlanleggerenSteg-uhuUXVjm.js";import"./OppsummeringSteg-BVCLmnPq.js";import"./ShareDataInfobox-lINqUQA-.js";import"./CalendarLabels-8uoUtnCb.js";import"./CalendarIconLabel-D-sYRAQ7.js";import"./FamiliehendelseLabel-DiFgNw2j.js";import"./PlanenDeresSteg-Ci7dYPjA.js";import"./OmÅTilpassePlanen-A27FpnHd.js";import"./PersonPregnant-CMx8Hr84.js";import"./PencilWriting-CYimA034.js";import"./UforutsetteEndringer-B1Kuo606.js";import"./ToggleGroup-DOlxfTPM.js";import"./TilpassPlanenSteg-D3BXUvUp.js";import"./HvaErMulig-CYB4XpWH.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
