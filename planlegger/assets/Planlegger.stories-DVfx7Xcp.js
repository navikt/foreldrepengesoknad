import{w as c,j as n,r as k,E as g,l as t}from"./iframe-B6sH9J2m.js";import{M as S,P as u}from"./usePlanleggerNavigator-4F6Bsmqq.js";import{h as r,a as m,H as o}from"./Planlegger-DVkY9OfW.js";import{D as d}from"./satserUtils-FT3VrVyd.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Q6gJs6QP.js";import"./barnetUtils-5bVcH_M6.js";import"./hvemHarRettUtils-BLhZSIks.js";import"./ArbeidssituasjonSteg-BLTHLA2h.js";import"./BlueRadioGroup-CWzVKusQ.js";import"./customErrorFormatter-cXI3JHXX.js";import"./PlanleggerStepPage-CdyBcA8D.js";import"./useScrollBehaviour-C4uxl9yE.js";import"./Spacer-DWqjArKU.js";import"./BarnehageplassSteg-BGZll6z9.js";import"./uttakUtils-Rim0PHMj.js";import"./BabyWrapped-8rvLMHwk.js";import"./Information-TKGDKKs0.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-D6Ih5kVF.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BL4u-ee1.js";import"./HvorLangPeriodeSteg-BQ3sDRxw.js";import"./PersonGroup-BwVKd86w.js";import"./HvorMyeSteg-MQiR4U7Q.js";import"./Wallet-Co7hPtep.js";import"./OmBarnetSteg-Cd002u5X.js";import"./TasklistStart-DKDdvBr4.js";import"./OmPlanleggerenSteg-Ifj2c8aT.js";import"./OppsummeringSteg-C8rn8AUb.js";import"./ShareDataInfobox-n_dNUBMM.js";import"./CalendarLabels-CarY6zzO.js";import"./CalendarIconLabel-izu_Ot8s.js";import"./FamiliehendelseLabel-F6J4t7_Y.js";import"./PlanenDeresSteg-C0vWm88F.js";import"./OmÅTilpassePlanen-BwQZXtW_.js";import"./PersonPregnant-DNrHKTFX.js";import"./PencilWriting-CiACH8cl.js";import"./UforutsetteEndringer-CsYvbYC9.js";import"./ToggleGroup-zV8QhOUw.js";import"./TilpassPlanenSteg-DznDRI0p.js";import"./HvaErMulig-Dw8fIk9H.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
