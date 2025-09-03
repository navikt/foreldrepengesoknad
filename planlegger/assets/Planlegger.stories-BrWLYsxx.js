import{w as c,j as n,r as k,E as g,l as t}from"./iframe-Gt43Wc9l.js";import{M as S,P as u}from"./usePlanleggerNavigator-CfHhXFNy.js";import{h as r,a as m,H as o}from"./Planlegger-C_X1XEYg.js";import{D as d}from"./satserUtils-Dz6rTiFn.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-C51ux6aO.js";import"./barnetUtils-DkaYc6sq.js";import"./hvemHarRettUtils-DIAU7F4-.js";import"./ArbeidssituasjonSteg-CB4SJWVL.js";import"./BlueRadioGroup-DTkVAK8T.js";import"./customErrorFormatter-pQ6SS0uZ.js";import"./PlanleggerStepPage-e3H7ajk-.js";import"./useScrollBehaviour-n5Jl4XQd.js";import"./Spacer-CZkBMkjA.js";import"./BarnehageplassSteg-e4i5-4VZ.js";import"./uttakUtils-DoiTcq0r.js";import"./BabyWrapped-CHykTH6z.js";import"./Information-1vgWzMLx.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CMZi_rFI.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CC7hqLaR.js";import"./HvorLangPeriodeSteg-BvGDTVmH.js";import"./PersonGroup-D2ZL_mRC.js";import"./HvorMyeSteg-CungWwI8.js";import"./Wallet-Cwz5ZIUX.js";import"./OmBarnetSteg-CGgGVusS.js";import"./TasklistStart-D1-jk1W9.js";import"./OmPlanleggerenSteg-D-oohBBD.js";import"./OppsummeringSteg-CjPOM7Jd.js";import"./ShareDataInfobox-CLTuXXqM.js";import"./CalendarLabels-D8GZlbrd.js";import"./CalendarIconLabel-CBYER8En.js";import"./FamiliehendelseLabel-7DpPebUd.js";import"./PlanenDeresSteg-Djh7LoVI.js";import"./OmÅTilpassePlanen-BHmSItzM.js";import"./PersonPregnant-iXgicl_V.js";import"./PencilWriting-BKqMzqBK.js";import"./UforutsetteEndringer-DemxDG0T.js";import"./ToggleGroup-C1qXAYiJ.js";import"./TilpassPlanenSteg-DPR3bCK0.js";import"./HvaErMulig-DKK0Woqd.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
