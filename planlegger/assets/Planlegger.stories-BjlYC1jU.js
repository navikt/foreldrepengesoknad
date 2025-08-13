import{w as c,j as n,r as k,E as g,l as t}from"./iframe-hCHVhrPZ.js";import{M as S,P as u}from"./usePlanleggerNavigator-4oI-ddpm.js";import{h as r,a as m,H as o}from"./Planlegger-BR4FE6f8.js";import{D as d}from"./satserUtils-CWZgftlC.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-1tKXz-7x.js";import"./barnetUtils-Ba1FRw0g.js";import"./hvemHarRettUtils-CnQuB32B.js";import"./ArbeidssituasjonSteg-CpPmYvdp.js";import"./BlueRadioGroup-CBAs9wwk.js";import"./customErrorFormatter-CcD4pMZc.js";import"./PlanleggerStepPage-CFHltph5.js";import"./useScrollBehaviour-j_GpTvuB.js";import"./Spacer-CGnCe6fT.js";import"./BarnehageplassSteg-C4-AbgYE.js";import"./uttakUtils-DH4Hz_yF.js";import"./BabyWrapped-CoGBYrC_.js";import"./Information-DbjQ9iwx.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CgBbZ_LG.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BJbmgMnt.js";import"./HvorLangPeriodeSteg-BF1ySy-Q.js";import"./PersonGroup-D4scOv1V.js";import"./HvorMyeSteg-C8ABwGnB.js";import"./Wallet-DFOJsTNF.js";import"./OmBarnetSteg-Cp3kW_nf.js";import"./TasklistStart-DgzdJTl0.js";import"./OmPlanleggerenSteg-Cy1bstS4.js";import"./OppsummeringSteg-DoOESH9z.js";import"./ShareDataInfobox-TPJlmEA8.js";import"./CalendarLabels-DmYW4eju.js";import"./CalendarIconLabel-K0Kv9BNo.js";import"./FamiliehendelseLabel-DNDMiQbx.js";import"./PlanenDeresSteg-DJeV1-EN.js";import"./OmÅTilpassePlanen-CrYOeslk.js";import"./PersonPregnant-KsejXCzU.js";import"./PencilWriting-DSPquT94.js";import"./UforutsetteEndringer-BJf9FkYC.js";import"./ToggleGroup-CAxkqyMQ.js";import"./TilpassPlanenSteg-BkP6zLbZ.js";import"./HvaErMulig-D8_uC9dP.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
